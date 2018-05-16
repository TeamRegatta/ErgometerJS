/**
 * Created by tijmen on 16-02-16.
 */
import * as driver from './Driver'
import * as ergometer from './../typedefinitions'
import * as utils from './../utils'

export interface IRecordDevice {
  address: string
  name: string
  rssi: number
}

export interface IRecordCharacteristic {
  serviceUIID: string
  characteristicUUID: string
  data?: string
}

export enum RecordingEventType {
  startScan,
  scanFoundFn,
  stopScan,
  connect,
  disconnectFn,
  disconnect,
  writeCharacteristic,
  readCharacteristic,
  enableNotification,
  notificationReceived,
  disableNotification
}

export interface IRecordingItem {
  timeStamp: number
  eventType: string
  timeStampReturn?: number
  data?: IRecordCharacteristic | IRecordDevice
  error?: any
}

export class RecordingDriver implements driver.IDriver {
  public _performanceMonitor: ergometer.IPerformanceMonitor

  private _realDriver: driver.IDriver
  private _startTime: number
  private _events: IRecordingItem[] = []

  constructor(
    performanceMonitor: ergometer.IPerformanceMonitor,
    realDriver: driver.IDriver
  ) {
    this._performanceMonitor = performanceMonitor
    this._realDriver = realDriver
  }

  public addRecording(
    eventType: RecordingEventType,
    data?: IRecordCharacteristic | IRecordDevice
  ): IRecordingItem {
    let newRec: IRecordingItem = {
      timeStamp: this.getRelativeTime(),
      eventType: RecordingEventType[eventType]
    }
    if (data) {
      newRec.data = data
    }
    this._events.push(newRec)
    return newRec
  }

  public get events(): IRecordingItem[] {
    return this._events
  }

  public set events(value: IRecordingItem[]) {
    this._events = value
  }

  public clear() {
    this._events = []
  }

  public startRecording() {
    this.clear()
    this._startTime = utils.getTime()
  }

  public startScan(foundFn?: driver.IFoundFunc): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.startScan)
      this._realDriver
        .startScan((device: driver.IDevice) => {
          this.addRecording(RecordingEventType.scanFoundFn, {
            address: device.address,
            name: device.name,
            rssi: device.rssi
          })
          foundFn(device)
        })
        .then(
          this.recordResolveFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  public stopScan() {
    this.addRecording(RecordingEventType.stopScan)
    this._realDriver.stopScan()
  }

  public connect(
    device: driver.IDevice,
    disconnectFn: () => void
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.connect)
      this._realDriver
        .connect(device, () => {
          this.addRecording(RecordingEventType.disconnectFn)
          disconnectFn()
        })
        .then(
          this.recordResolveFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  public disconnect() {
    this.addRecording(RecordingEventType.disconnect)
    this._realDriver.disconnect()
  }

  public writeCharacteristic(
    serviceUIID: string,
    characteristicUUID: string,
    data: ArrayBufferView
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.writeCharacteristic, {
        serviceUIID: serviceUIID,
        characteristicUUID: characteristicUUID,
        data: utils.typedArrayToHexString(data.buffer)
      })
      this._realDriver
        .writeCharacteristic(serviceUIID, characteristicUUID, data)
        .then(
          this.recordResolveFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  public readCharacteristic(
    serviceUIID: string,
    characteristicUUID: string
  ): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.readCharacteristic, {
        serviceUIID: serviceUIID,
        characteristicUUID: characteristicUUID
      })
      this._realDriver
        .readCharacteristic(serviceUIID, characteristicUUID)
        .then(
          this.recordResolveBufferFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  public enableNotification(
    serviceUIID: string,
    characteristicUUID: string,
    receive: (data: ArrayBuffer) => void
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.enableNotification, {
        serviceUIID: serviceUIID,
        characteristicUUID: characteristicUUID
      })
      this._realDriver
        .enableNotification(
          serviceUIID,
          characteristicUUID,
          (data: ArrayBuffer) => {
            this.addRecording(RecordingEventType.notificationReceived, {
              serviceUIID: serviceUIID,
              characteristicUUID: characteristicUUID,
              data: utils.typedArrayToHexString(data)
            })
            receive(data)
          }
        )
        .then(
          this.recordResolveFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  public disableNotification(
    serviceUIID: string,
    characteristicUUID: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let rec = this.addRecording(RecordingEventType.disableNotification, {
        serviceUIID: serviceUIID,
        characteristicUUID: characteristicUUID
      })
      this._realDriver
        .disableNotification(serviceUIID, characteristicUUID)
        .then(
          this.recordResolveFunc(resolve, rec),
          this.recordErrorFunc(reject, rec)
        )
    })
  }

  protected getRelativeTime(): number {
    return utils.getTime() - this._startTime
  }

  protected recordResolveFunc(
    resolve: () => void,
    rec: IRecordingItem
  ): () => void {
    return () => {
      rec.timeStampReturn = this.getRelativeTime()
      resolve()
    }
  }

  protected recordResolveBufferFunc(
    resolve: (data: ArrayBuffer) => void,
    rec: IRecordingItem
  ): (data: ArrayBuffer) => void {
    return (data: ArrayBuffer) => {
      rec.timeStampReturn = this.getRelativeTime()
      ;(rec.data as IRecordCharacteristic).data = utils.typedArrayToHexString(
        data
      )
      resolve(data)
    }
  }

  protected recordErrorFunc(
    reject: (e) => void,
    rec: IRecordingItem
  ): (e) => void {
    return e => {
      rec.timeStampReturn = this.getRelativeTime()
      rec.error = e
      reject(e)
    }
  }
}
