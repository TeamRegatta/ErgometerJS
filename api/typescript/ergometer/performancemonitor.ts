/**
 * Concept 2 ergometer Performance Monitor api for Cordova
 *
 * This will will work with the PM5
 *
 * Created by tijmen on 01-06-15.
 * License:
 *
 * Copyright 2016 Tijmen van Gulik (tijmen@vangulik.org)
 * Copyright 2016 Tijmen van Gulik (tijmen@vangulik.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as pubSub from './pubsub'
import * as driver from './ble/Driver'
import * as recordingDriver from './ble/RecordingDriver'
import * as replayDriver from './ble/ReplayDriver'
import { hasWebBlueTooth, DriverWebBlueTooth } from './ble/DriverWebBlueTooth'
import { DriverBleat } from './ble/DriverBleat'
import { DriverSimpleBLE } from './ble/DriverSimpleBLE'
import { commandManager, IBuffer, IRawCommand } from './csafe/command_core'
import * as utils from './utils'
import * as ergometer from './typedefinitions'
import * as ble from './ble/typedefinitions'
import * as csafe from './csafe/typedefinitions'

/**
 *
 * Usage:
 *
 * Create this class to acess the performance data
 *   var performanceMonitor= new ergometer.PerformanceMonitor();
 *
 * after this connect to the events to get data
 *   performanceMonitor.rowingGeneralStatusEvent.sub(this,this.onRowingGeneralStatus);
 * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
 * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
 * the documentation in the properties You must set the multi plex property before connecting
 *   performanceMonitor.multiplex=true;
 *
 * to start the connection first start scanning for a device,
 * you should call when the cordova deviceready event is called (or later)
 *   performanceMonitor.startScan((device : ergometer.DeviceInfo) : boolean => {
 *      //return true when you want to connect to the device
 *       return device.name=='My device name';
 *   });
 *  to connect at at a later time
 *    performanceMonitor.connectToDevice('my device name');
 *  the devices which where found during the scan are collected in
 *    performanceMonitor.devices
 *  when you connect to a device the scan is stopped, when you want to stop the scan earlier you need to call
 *    performanceMonitor.stopScan
 *
 */
export class PerformanceMonitor implements ergometer.IPerformanceMonitor {
  private _driver: driver.IDriver
  private _recordingDriver: recordingDriver.RecordingDriver
  private _replayDriver: replayDriver.ReplayDriver
  private _connectionState: ergometer.MonitorConnectionState = ergometer.MonitorConnectionState.inactive

  // events
  private _logEvent = new pubSub.Event<ergometer.LogEvent>()
  private _connectionStateChangedEvent = new pubSub.Event<
    ergometer.ConnectionStateChangedEvent
  >()

  // ergomter data events
  private _rowingGeneralStatusEvent: pubSub.Event<ergometer.RowingGeneralStatusEvent>
  private _rowingAdditionalStatus1Event: pubSub.Event<
    ergometer.RowingAdditionalStatus1Event
  >
  private _rowingAdditionalStatus2Event: pubSub.Event<
    ergometer.RowingAdditionalStatus2Event
  >
  private _rowingStrokeDataEvent: pubSub.Event<ergometer.RowingStrokeDataEvent>
  private _rowingAdditionalStrokeDataEvent: pubSub.Event<
    ergometer.RowingAdditionalStrokeDataEvent
  >
  private _rowingSplitIntervalDataEvent: pubSub.Event<
    ergometer.RowingSplitIntervalDataEvent
  >
  private _rowingAdditionalSplitIntervalDataEvent: pubSub.Event<
    ergometer.RowingAdditionalSplitIntervalDataEvent
  >
  private _workoutSummaryDataEvent: pubSub.Event<ergometer.WorkoutSummaryDataEvent>
  private _additionalWorkoutSummaryDataEvent: pubSub.Event<
    ergometer.AdditionalWorkoutSummaryDataEvent
  >
  private _additionalWorkoutSummaryData2Event: pubSub.Event<
    ergometer.AdditionalWorkoutSummaryData2Event
  >
  private _heartRateBeltInformationEvent: pubSub.Event<
    ergometer.HeartRateBeltInformationEvent
  >
  private _powerCurveEvent: pubSub.Event<ergometer.PowerCurveEvent>

  private _deviceInfo: ergometer.DeviceInfo

  private _rowingGeneralStatus: ergometer.RowingGeneralStatus
  private _rowingAdditionalStatus1: ergometer.RowingAdditionalStatus1
  private _rowingAdditionalStatus2: ergometer.RowingAdditionalStatus2
  private _rowingStrokeData: ergometer.RowingStrokeData
  private _rowingAdditionalStrokeData: ergometer.RowingAdditionalStrokeData
  private _rowingSplitIntervalData: ergometer.RowingSplitIntervalData
  private _rowingAdditionalSplitIntervalData: ergometer.RowingAdditionalSplitIntervalData
  private _workoutSummaryData: ergometer.WorkoutSummaryData
  private _additionalWorkoutSummaryData: ergometer.AdditionalWorkoutSummaryData
  private _additionalWorkoutSummaryData2: ergometer.AdditionalWorkoutSummaryData2
  private _heartRateBeltInformation: ergometer.HeartRateBeltInformation
  private _powerCurve: number[]
  private _devices: ergometer.DeviceInfo[] = []
  private _multiplex: boolean = false
  private _multiplexSubscribeCount: number = 0
  private _sampleRate: ergometer.SampleRate = ergometer.SampleRate.rate500ms
  private _autoReConnect: boolean = true
  private _logLevel: ergometer.LogLevel = ergometer.LogLevel.error
  private _csafeBuffer: IBuffer = null
  private _waitResponseCommands: IRawCommand[] = []
  private _generalStatusEventAttachedByPowerCurve = false

  private _recording: boolean = false

  /**
   * To work with this class you will need to create it.
   */
  public constructor(opts: { driver?: driver.IDriver } = {}) {
    this.initialize(opts.driver)
  }

  protected get recordingDriver(): recordingDriver.RecordingDriver {
    if (!this._recordingDriver) {
      this._recordingDriver = new recordingDriver.RecordingDriver(
        this,
        this._driver
      )
    }
    return this._recordingDriver
  }

  public get recording(): boolean {
    return this._recording
  }

  public set recording(value: boolean) {
    this._recording = value
    if (value) this.recordingDriver.startRecording()
  }

  get replayDriver(): replayDriver.ReplayDriver {
    if (!this._replayDriver) {
      this._replayDriver = new replayDriver.ReplayDriver(this, this._driver)
    }

    return this._replayDriver
  }

  get replaying(): boolean {
    return this.replayDriver.playing
  }

  public replay(events: recordingDriver.IRecordingItem[]) {
    this.replayDriver.replay(events)
  }

  set replaying(value: boolean) {
    this.replayDriver.playing = value
  }

  public get recordingEvents(): recordingDriver.IRecordingItem[] {
    return this.recordingDriver.events
  }

  public set recordingEvents(value: recordingDriver.IRecordingItem[]) {
    this.recordingDriver.events = value
  }

  protected get driver(): driver.IDriver {
    if (this.recording) {
      return this.recordingDriver
    } else if (this.replaying) return this.replayDriver
    else return this._driver
  }

  /**
   * By default it the logEvent will return errors if you want more debug change the log level
   * @returns {LogLevel}
   */
  get logLevel(): ergometer.LogLevel {
    return this._logLevel
  }

  /**
   * By default it the logEvent will return errors if you want more debug change the log level
   * @param value
   */
  set logLevel(value: ergometer.LogLevel) {
    this._logLevel = value
  }

  /**
   * when the connection is lost re-connect
   * @returns {boolean}
   */
  get autoReConnect(): boolean {
    return this._autoReConnect
  }

  /**
   *
   * when the connection is lost re-connect
   * @param value
   */
  set autoReConnect(value: boolean) {
    this._autoReConnect = value
  }

  /**
   * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
   * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
   * the documentation in the properties You must set the multi plex property before connecting
   *
   * @returns {boolean}
   */
  public get multiplex(): boolean {
    return this._multiplex
  }

  /**
   * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
   * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
   * the documentation in the properties You must set the multi plex property before connecting
   * @param value
   */
  public set multiplex(value: boolean) {
    if (value !== this._multiplex) {
      if (this.connectionState >= ergometer.MonitorConnectionState.servicesFound) {
        throw new Error(
          'property multiplex can not be changed after the connection is made.'
        )
      }

      this._multiplex = value
    }
  }

  /**
   * an array of of performance monitor devices which where found during the scan.
   * the array is sorted by connection quality (best on top)
   *
   * @returns {DeviceInfo[]}
   */
  public get devices(): ergometer.DeviceInfo[] {
    return this._devices
  }

  /**
   * The values of the last rowingGeneralStatus event
   *
   * @returns {ergometer.RowingGeneralStatus}
   */
  public get rowingGeneralStatus(): ergometer.RowingGeneralStatus {
    return this._rowingGeneralStatus
  }

  /**
   * The values of the last rowingAdditionalStatus1 event
   * @returns {ergometer.RowingAdditionalStatus1}
   */
  public get rowingAdditionalStatus1(): ergometer.RowingAdditionalStatus1 {
    return this._rowingAdditionalStatus1
  }

  /**
   * The values of the last RowingAdditionalStatus2 event
   * @returns {ergometer.RowingAdditionalStatus2}
   */
  public get rowingAdditionalStatus2(): ergometer.RowingAdditionalStatus2 {
    return this._rowingAdditionalStatus2
  }

  /**
   *  The values of the last rowingStrokeData event
   * @returns {ergometer.RowingStrokeData}
   */
  public get rowingStrokeData(): ergometer.RowingStrokeData {
    return this._rowingStrokeData
  }

  /**
   * The values of the last rowingAdditionalStrokeData event
   * @returns {ergometer.RowingAdditionalStrokeData}
   */
  public get rowingAdditionalStrokeData(): ergometer.RowingAdditionalStrokeData {
    return this._rowingAdditionalStrokeData
  }

  /**
   * The values of the last rowingSplitIntervalData event
   * @returns {ergometer.RowingSplitIntervalData}
   */
  public get rowingSplitIntervalData(): ergometer.RowingSplitIntervalData {
    return this._rowingSplitIntervalData
  }

  /**
   * The values of the last rowingAdditionalSplitIntervalData event
   * @returns {ergometer.RowingAdditionalSplitIntervalData}
   */
  public get rowingAdditionalSplitIntervalData(): ergometer.RowingAdditionalSplitIntervalData {
    return this._rowingAdditionalSplitIntervalData
  }

  /**
   * The values of the last workoutSummaryData event
   * @returns {ergometer.WorkoutSummaryData}
   */
  public get workoutSummaryData(): ergometer.WorkoutSummaryData {
    return this._workoutSummaryData
  }

  /**
   * The values of the last additionalWorkoutSummaryData event
   * @returns {ergometer.AdditionalWorkoutSummaryData}
   */
  public get additionalWorkoutSummaryData(): ergometer.AdditionalWorkoutSummaryData {
    return this._additionalWorkoutSummaryData
  }

  /**
   * The values of the last AdditionalWorkoutSummaryData2 event
   * @returns {ergometer.AdditionalWorkoutSummaryData2}
   */
  public get additionalWorkoutSummaryData2(): ergometer.AdditionalWorkoutSummaryData2 {
    return this._additionalWorkoutSummaryData2
  }

  /**
   * The values of the last heartRateBeltInformation event
   * @returns {ergometer.HeartRateBeltInformation}
   */
  public get heartRateBeltInformation(): ergometer.HeartRateBeltInformation {
    return this._heartRateBeltInformation
  }

  /**
   * read rowingGeneralStatus data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingGeneralStatusEvent>}
   */
  public get rowingGeneralStatusEvent(): pubSub.Event<
    ergometer.RowingGeneralStatusEvent
  > {
    return this._rowingGeneralStatusEvent
  }

  /**
   * read rowingGeneralStatus1 data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingAdditionalStatus1Event>}
   */
  public get rowingAdditionalStatus1Event(): pubSub.Event<
    ergometer.RowingAdditionalStatus1Event
  > {
    return this._rowingAdditionalStatus1Event
  }

  /**
   * read rowingAdditionalStatus2 data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingAdditionalStatus2Event>}
   */
  public get rowingAdditionalStatus2Event(): pubSub.Event<
    ergometer.RowingAdditionalStatus2Event
  > {
    return this._rowingAdditionalStatus2Event
  }

  /**
   * read rowingStrokeData data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingStrokeDataEvent>}
   */
  public get rowingStrokeDataEvent(): pubSub.Event<ergometer.RowingStrokeDataEvent> {
    return this._rowingStrokeDataEvent
  }

  /**
   * read rowingAdditionalStrokeData data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingAdditionalStrokeDataEvent>}
   */
  public get rowingAdditionalStrokeDataEvent(): pubSub.Event<
    ergometer.RowingAdditionalStrokeDataEvent
  > {
    return this._rowingAdditionalStrokeDataEvent
  }

  /**
   * read rowingSplitIntervalDat data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingSplitIntervalDataEvent>}
   */
  public get rowingSplitIntervalDataEvent(): pubSub.Event<
    ergometer.RowingSplitIntervalDataEvent
  > {
    return this._rowingSplitIntervalDataEvent
  }

  /**
   * read rowingAdditionalSplitIntervalData data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.RowingAdditionalSplitIntervalDataEvent>}
   */
  public get rowingAdditionalSplitIntervalDataEvent(): pubSub.Event<
    ergometer.RowingAdditionalSplitIntervalDataEvent
  > {
    return this._rowingAdditionalSplitIntervalDataEvent
  }

  /**
   * read workoutSummaryData data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.WorkoutSummaryDataEvent>}
   */
  public get workoutSummaryDataEvent(): pubSub.Event<
    ergometer.WorkoutSummaryDataEvent
  > {
    return this._workoutSummaryDataEvent
  }

  /**
   * read additionalWorkoutSummaryData data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryDataEvent>}
   */
  public get additionalWorkoutSummaryDataEvent(): pubSub.Event<
    ergometer.AdditionalWorkoutSummaryDataEvent
  > {
    return this._additionalWorkoutSummaryDataEvent
  }

  /**
   * read additionalWorkoutSummaryData2 data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryData2Event>}
   */
  public get additionalWorkoutSummaryData2Event(): pubSub.Event<
    ergometer.AdditionalWorkoutSummaryData2Event
  > {
    return this._additionalWorkoutSummaryData2Event
  }

  /**
   * read heartRateBeltInformation data
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ergometer.HeartRateBeltInformationEvent>}
   */
  public get heartRateBeltInformationEvent(): pubSub.Event<
    ergometer.HeartRateBeltInformationEvent
  > {
    return this._heartRateBeltInformationEvent
  }

  get powerCurveEvent(): pubSub.Event<ergometer.PowerCurveEvent> {
    return this._powerCurveEvent
  }

  /**
   * event which is called when the connection state is changed. For example this way you
   * can check if the device is disconnected.
   * connect to the using .sub(this,myFunction)
   * @returns {pubSub.Event<ConnectionStateChangedEvent>}
   */
  public get connectionStateChangedEvent(): pubSub.Event<
    ergometer.ConnectionStateChangedEvent
  > {
    return this._connectionStateChangedEvent
  }
  /**
   * returns error and other log information. Some errors can only be received using the logEvent
   * @returns {pubSub.Event<LogEvent>}
   */
  public get logEvent(): pubSub.Event<ergometer.LogEvent> {
    return this._logEvent
  }

  get powerCurve(): number[] {
    return this._powerCurve
  }

  /**
   * Get device information of the connected device.
   * @returns {DeviceInfo}
   */
  public get deviceInfo(): ergometer.DeviceInfo {
    return this._deviceInfo
  }

  /**
   * read the performance montitor sample rate. By default this is 500 ms
   * @returns {number}
   */
  public get sampleRate(): ergometer.SampleRate {
    return this._sampleRate
  }

  /**
   * Change the performance monitor sample rate.
   * @param value
   */
  public set sampleRate(value: ergometer.SampleRate) {
    if (value !== this._sampleRate) {
      const dataView = new DataView(new ArrayBuffer(1))
      dataView.setUint8(0, value)
      this.driver
        .writeCharacteristic(
          ble.PMROWING_SERVICE,
          ble.ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC,
          dataView
        )
        .then(() => {
          this._sampleRate = value
        }, this.getErrorHandlerFunc('Can not set sample rate'))
    }
  }

  /**
   * disconnect the current connected device
   */
  public disconnect() {
    if (this.connectionState >= ergometer.MonitorConnectionState.deviceReady) {
      this.driver.disconnect()
      this._connectionState = ergometer.MonitorConnectionState.deviceReady
    }
  }

  /**
   * read the current connection state
   * @returns {ergometer.MonitorConnectionState}
   */
  public get connectionState(): ergometer.MonitorConnectionState {
    return this._connectionState
  }

  /**
   * Print debug info to console and application UI.
   * @param info
   */
  public traceInfo(info: string) {
    if (this.logLevel >= ergometer.LogLevel.trace) {
      this.logEvent.pub(info, ergometer.LogLevel.trace)
    }
  }

  /**
   *
   * @param info
   */
  public debugInfo(info: string) {
    if (this.logLevel >= ergometer.LogLevel.debug) {
      this.logEvent.pub(info, ergometer.LogLevel.debug)
    }
  }

  /**
   *
   * @param info
   */
  public showInfo(info: string) {
    if (this.logLevel >= ergometer.LogLevel.info) {
      this.logEvent.pub(info, ergometer.LogLevel.info)
    }
  }

  /**
   * call the global error hander and call the optional error handler if given
   * @param error
   */
  public handleError(error: string, errorFn?: ergometer.ErrorHandler) {
    if (this.logLevel >= ergometer.LogLevel.error) {
      this.logEvent.pub(error, ergometer.LogLevel.error)
    }
    if (errorFn) errorFn(error)
  }

  /**
   * Get an error function which adds the errorDescription to the error ,cals the global and an optional local funcion
   * @param errorDescription
   * @param errorFn
   */
  public getErrorHandlerFunc(
    errorDescription: string,
    errorFn?: ergometer.ErrorHandler
  ): ergometer.ErrorHandler {
    return e => {
      this.handleError(errorDescription + ':' + e.toString(), errorFn)
    }
  }

  /**
   *
   */
  public stopScan() {
    if (this.connectionState === ergometer.MonitorConnectionState.scanning) {
      this.driver.stopScan()
    }
  }

  /**
   * Scan for device use the deviceFound to connect .
   * @param deviceFound
   */
  public startScan(
    deviceFound: (device: ergometer.DeviceInfo) => boolean,
    errorFn?: ergometer.ErrorHandler
  ): Promise<void> {
    this._devices = []

    // Call stop before you start, just in case something else is running.
    this.stopScan()
    this.changeConnectionState(ergometer.MonitorConnectionState.scanning)

    return this.driver
      .startScan(device => {
        // Do not show un-named devices.
        if (!device.name) {
          return
        }

        // Print "name : mac address" for every device found.
        this.debugInfo(
          device.name +
            ' : ' +
            device.address
              .toString()
              .split(':')
              .join('')
        )

        // If my device is found connect to it.
        // find any thing starting with PM and then a number a space and a serial number
        if (device.name.match(/PM\d \d*/g)) {
          this.showInfo('Status: ergometer.DeviceInfo found: ' + device.name)
          const deviceInfo: ergometer.DeviceInfo = {
            connected: false,
            _internalDevice: device,
            name: device.name,
            address: device.address,
            quality: 2 * (device.rssi + 100)
          }
          this.addDevice(deviceInfo)
          if (deviceFound(deviceInfo)) {
            this.connectToDevice(deviceInfo.name)
          }
        }
      })
      .then(() => {
        this.showInfo('Status: Scanning...')
      })
      .catch(this.getErrorHandlerFunc('Scan error', errorFn))
  }

  /**
   * connect to a specific device. This should be a PM5 device which is found by the startScan. You can
   * only call this function after startScan is called. Connection to a device will stop the scan.
   * @param deviceName
   */
  public connectToDevice(deviceName: string): Promise<void> {
    this.showInfo('Status: Connecting...')
    this.stopScan()
    this.changeConnectionState(ergometer.MonitorConnectionState.connecting)
    const deviceInfo = this.findDevice(deviceName)
    if (!deviceInfo) throw new Error(`Device ${deviceName} not found`)
    this._deviceInfo = deviceInfo

    return this.driver
      .connect(deviceInfo._internalDevice, () => {
        this.changeConnectionState(ergometer.MonitorConnectionState.deviceReady)
        this.showInfo('Disconnected')
        if (this.autoReConnect) {
          this.startScan((device: ergometer.DeviceInfo) => {
            return device.name === deviceName
          })
        }
      })
      .then(() => {
        this.changeConnectionState(ergometer.MonitorConnectionState.connected)
        this.showInfo('Status: Connected')

        return this.readPheripheralInfo()
      })
      .then(() => {
        // Debug logging of all services, characteristics and descriptors
        // reported by the BLE board.
        this.deviceConnected()
      })
      .catch(errorCode => {
        this.changeConnectionState(ergometer.MonitorConnectionState.deviceReady)
        this.handleError(errorCode)
      })
  }

  /****************************************************************************************
   *                               csafe
   *****************************************************************************************  */

  /**
   *  send everyt thing which is put into the csave buffer
   *
   * @param success
   * @param error
   * @returns {Promise<void>|Promise} use promis instead of success and error function
   */
  public sendCSafeBuffer(): Promise<void> {
    this.removeOldSendCommands()
    // prepare the array to be send
    const rawCommandBuffer = this.csafeBuffer.rawCommands
    let commandArray: number[] = []

    rawCommandBuffer.forEach((command: IRawCommand) => {
      commandArray.push(command.command)
      if (command.command >= csafe.CTRL_CMD_SHORT_MIN) {
        // it is an short command
        if (command.detailCommand || command.data) {
          throw new Error(
            'short commands can not contain data or a detail command'
          )
        }
      } else {
        if (command.detailCommand) {
          let dataLength = 1
          if (command.data && command.data.length > 0) {
            dataLength = dataLength + command.data.length + 1
          }
          commandArray.push(dataLength) // length for the short command
          // the detail command
          commandArray.push(command.detailCommand)
        }
        // the data
        if (command.data && command.data.length > 0) {
          commandArray.push(command.data.length)
          commandArray = commandArray.concat(command.data)
        }
      }
    })
    this.csafeBuffer.clear()
    // send all the csafe commands in one go
    return this.sendCsafeCommands(commandArray).then(
      () => {
        rawCommandBuffer.forEach((command: IRawCommand) => {
          command._timestamp = new Date().getTime()
          if (command.waitForResponse) {
            this._waitResponseCommands.push(command)
          }
        })
      },
      e => {
        rawCommandBuffer.forEach((command: IRawCommand) => {
          if (command.onError) command.onError(e)
        })
      }
    )
  }

  public receivedCSaveCommand(parsed: ergometer.ParsedCSafeCommand) {
    // check on all the commands which where send and
    for (let i = 0; i < this._waitResponseCommands.length; i++) {
      const command = this._waitResponseCommands[i]
      if (
        command.command === parsed.command &&
        (command.detailCommand === parsed.detailCommand ||
          (!command.detailCommand && !parsed.detailCommand))
      ) {
        if (command.onDataReceived) {
          const dataView = new DataView(parsed.data.buffer)
          command.onDataReceived(dataView)
        }
        this._waitResponseCommands.splice(i, 1) // remove the item from the send list
        break
      }
    }
  }

  public handleCSafeNotifications() {
    let commandData: Uint8Array
    let commandDataIndex = 0
    let frameState = FrameState.initial
    let nextDataLength = 0
    let detailCommand = 0
    let calcCheck = 0
    let command = 0
    let skippByte = 0
    const enum FrameState {
      initial,
      skippByte,
      parseCommand,
      parseCommandLength,
      parseDetailCommand,
      parseDetailCommandLength,
      parseCommandData
    }
    this.traceInfo('enable notifications csafe')
    this.driver
      .enableNotification(
        ble.PMCONTROL_SERVICE,
        ble.RECEIVE_FROM_PM_CHARACTERISIC,
        (data: ArrayBuffer) => {
          const dataView = new DataView(data)
          // skipp empty 0 ble blocks
          if (dataView.byteLength !== 1 || dataView.getUint8(0) !== 0) {
            if (frameState === FrameState.initial) {
              commandData = null
              commandDataIndex = 0
              frameState = FrameState.initial
              nextDataLength = 0
              detailCommand = 0
              calcCheck = 0
            }
            this.traceInfo(
              'continious receive csafe: ' + utils.typedArrayToHexString(data)
            )
            let i = 0
            let stop = false

            while (i < dataView.byteLength && !stop) {
              const currentByte = dataView.getUint8(i)
              if (frameState !== FrameState.initial) {
                calcCheck = calcCheck ^ currentByte // xor for a simple crc check
              }

              switch (frameState) {
                case FrameState.initial: {
                  // expect a start frame
                  if (currentByte !== csafe.FRAME_START_BYTE) {
                    stop = true
                    if (this.logLevel === ergometer.LogLevel.trace) {
                      this.traceInfo(
                        'stop byte ' + utils.toHexString(currentByte, 1)
                      )
                    }
                  } else frameState = FrameState.skippByte
                  calcCheck = 0

                  break
                }
                case FrameState.skippByte: {
                  // skipp this one
                  frameState = FrameState.parseCommand
                  skippByte = currentByte
                  break
                }

                case FrameState.parseCommand: {
                  command = currentByte
                  frameState = FrameState.parseCommandLength

                  break
                }
                case FrameState.parseCommandLength: {
                  // first work arround strange results where the skipp byte is the same
                  // as the the command and the frame directly ends, What is the meaning of
                  // this? some kind of status??
                  if (
                    skippByte === command &&
                    currentByte === csafe.FRAME_END_BYTE
                  ) {
                    command = 0 // do not check checksum
                    frameState = FrameState.initial // start again from te beginning
                  } else if (
                    i === dataView.byteLength - 1 &&
                    currentByte === csafe.FRAME_END_BYTE
                  ) {
                    const checksum = command
                    // remove the last 2 bytes from the checksum which was added too much
                    calcCheck = calcCheck ^ currentByte
                    calcCheck = calcCheck ^ command
                    // check the calculated with the message checksum
                    if (checksum !== calcCheck) {
                      this.handleError(
                        `Wrong checksum ${utils.toHexString(
                          checksum,
                          1
                        )} expected ${utils.toHexString(calcCheck, 1)} `
                      )
                    }
                    command = 0 // do not check checksum
                    frameState = FrameState.initial // start again from te beginning
                  } else if (i < dataView.byteLength) {
                    nextDataLength = currentByte
                    if (command >= csafe.CTRL_CMD_SHORT_MIN) {
                      frameState = FrameState.parseCommandData
                    } else frameState = FrameState.parseDetailCommand
                  }
                  break
                }
                case FrameState.parseDetailCommand: {
                  detailCommand = currentByte
                  frameState = FrameState.parseDetailCommandLength

                  break
                }
                case FrameState.parseDetailCommandLength: {
                  nextDataLength = currentByte
                  frameState = FrameState.parseCommandData
                  break
                }
                case FrameState.parseCommandData: {
                  if (!commandData) {
                    commandDataIndex = 0
                    commandData = new Uint8Array(nextDataLength)
                  }
                  commandData[commandDataIndex] = currentByte
                  nextDataLength--
                  commandDataIndex++
                  if (nextDataLength === 0) {
                    frameState = FrameState.parseCommand
                    try {
                      this.receivedCSaveCommand({
                        command: command,
                        detailCommand: detailCommand,
                        data: commandData
                      })
                    } catch (e) {
                      this.handleError(e) // never const the receive crash the main loop
                    }

                    commandData = null
                    detailCommand = 0
                  }
                  break
                }
              }
              if (this.logLevel === ergometer.LogLevel.trace) {
                this.traceInfo(
                  `parse: ${i}: ${utils.toHexString(
                    currentByte,
                    1
                  )} state: ${frameState} checksum:${utils.toHexString(
                    calcCheck,
                    1
                  )} `
                )
              }
              i++
            }
            // when something went wrong, the bluetooth block is endend but the frame not
            if (
              dataView.byteLength !== ble.PACKET_SIZE &&
              frameState !== FrameState.initial
            ) {
              frameState = FrameState.initial
              this.handleError('wrong csafe frame ending.')
            }
          }
        }
      )
      .catch(this.getErrorHandlerFunc(''))
  }

  get csafeBuffer(): IBuffer {
    // init the buffer when needed
    if (!this._csafeBuffer) {
      this._csafeBuffer = {
        commands: [],
        clear: (): IBuffer => {
          this.csafeBuffer.rawCommands = []
          return this.csafeBuffer
        },
        send: (sucess?: () => void, error?: ergometer.ErrorHandler): Promise<void> => {
          return this.sendCSafeBuffer().then(sucess, error)
        },
        addRawCommand: (info: IRawCommand): IBuffer => {
          this.csafeBuffer.rawCommands.push(info)
          return this.csafeBuffer
        }
      } as any
      commandManager.apply(this.csafeBuffer, this)
    }
    return this._csafeBuffer
  }

  /**
   *
   * @param device
   */
  protected removeDevice(device: ergometer.DeviceInfo) {
    this._devices = this._devices.splice(this._devices.indexOf(device), 1)
  }

  /**
   *
   * @param device
   */
  protected addDevice(device: ergometer.DeviceInfo) {
    const existing = this.findDevice(device.name)
    if (existing) this.removeDevice(existing)

    this._devices.push(device)
    // sort on hightest quality above
    this._devices.sort((device1, device2: ergometer.DeviceInfo): number => {
      return device2.quality - device1.quality
    })
  }

  /**
   *
   * @param value
   */
  protected changeConnectionState(value: ergometer.MonitorConnectionState) {
    if (this._connectionState !== value) {
      const oldValue = this._connectionState
      this._connectionState = value
      this.connectionStateChangedEvent.pub(oldValue, value)
    }
  }

  /**
   *
   */
  protected enableMultiplexNotification() {
    if (this._multiplexSubscribeCount === 0) {
      this.driver
        .enableNotification(
          ble.PMROWING_SERVICE,
          ble.MULTIPLEXED_INFO_CHARACTERISIC,
          (data: ArrayBuffer) => {
            this.handleDataCallbackMulti(data)
          }
        )
        .catch(this.getErrorHandlerFunc('Can not enable multiplex'))
    }
    this._multiplexSubscribeCount++
  }

  /**
   *
   */
  protected disableMultiPlexNotification() {
    this._multiplexSubscribeCount--
    if (this._multiplexSubscribeCount === 0) {
      this.driver
        .disableNotification(
          ble.PMROWING_SERVICE,
          ble.MULTIPLEXED_INFO_CHARACTERISIC
        )
        .catch(this.getErrorHandlerFunc('can not disable multiplex'))
    }
  }

  /**
   *
   */
  protected enableDisableNotification() {
    if (this.connectionState >= ergometer.MonitorConnectionState.servicesFound) {
      if (this.rowingGeneralStatusEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.ROWING_STATUS_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(data, this.handleRowingGeneralStatus)
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.ROWING_STATUS_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingAdditionalStatus1Event.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STATUS1_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleRowingAdditionalStatus1
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STATUS1_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingAdditionalStatus2Event.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STATUS2_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleRowingAdditionalStatus2
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STATUS2_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingStrokeDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.STROKE_DATA_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(data, this.handleRowingStrokeData)
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.STROKE_DATA_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingAdditionalStrokeDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STROKE_DATA_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleRowingAdditionalStrokeData
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_STROKE_DATA_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingSplitIntervalDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.SPLIT_INTERVAL_DATA_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleRowingSplitIntervalData
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.SPLIT_INTERVAL_DATA_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.rowingAdditionalSplitIntervalDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleRowingAdditionalSplitIntervalData
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.workoutSummaryDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.ROWING_SUMMARY_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(data, this.handleWorkoutSummaryData)
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.ROWING_SUMMARY_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }

      if (this.additionalWorkoutSummaryDataEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_ROWING_SUMMARY_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleAdditionalWorkoutSummaryData
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.EXTRA_ROWING_SUMMARY_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }
      if (this.additionalWorkoutSummaryData2Event.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        }
        // this data is only available for multi ples
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
      }

      if (this.heartRateBeltInformationEvent.count > 0) {
        if (this.multiplex) {
          this.enableMultiplexNotification()
        } else {
          this.driver
            .enableNotification(
              ble.PMROWING_SERVICE,
              ble.HEART_RATE_BELT_INFO_CHARACTERISIC,
              (data: ArrayBuffer) => {
                this.handleDataCallback(
                  data,
                  this.handleHeartRateBeltInformation
                )
              }
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      } else {
        if (this.multiplex) this.disableMultiPlexNotification()
        else {
          this.driver
            .disableNotification(
              ble.PMROWING_SERVICE,
              ble.HEART_RATE_BELT_INFO_CHARACTERISIC
            )
            .catch(this.getErrorHandlerFunc(''))
        }
      }
      if (this.powerCurveEvent.count > 0) {
        // when the status changes collect the power info
        if (!this._generalStatusEventAttachedByPowerCurve) {
          this._generalStatusEventAttachedByPowerCurve = true
          this.rowingGeneralStatusEvent.sub(
            this,
            this.onPowerCurveRowingGeneralStatus
          )
        }
      } else {
        if (this._generalStatusEventAttachedByPowerCurve) {
          this._generalStatusEventAttachedByPowerCurve = false
          this.rowingGeneralStatusEvent.unsub(
            this.onPowerCurveRowingGeneralStatus
          )
        }
      }
    }
  }

  protected onPowerCurveRowingGeneralStatus(data: ergometer.RowingGeneralStatus) {
    this.traceInfo('RowingGeneralStatus:' + JSON.stringify(data))

    // test to receive the power curve
    if (
      this.rowingGeneralStatus &&
      this.rowingGeneralStatus.strokeState !== data.strokeState
    ) {
      if (data.strokeState === ergometer.StrokeState.recoveryState) {
        // send a power curve request
        this.csafeBuffer
          .clear()
          .getPowerCurve({
            onDataReceived: (curve: number[]) => {
              this.powerCurveEvent.pub(curve)
              this._powerCurve = curve
            }
          })
          .send()
      }
    }
  }

  /**
   *
   */
  protected initialize(driver: driver.IDriver) {
    if (driver) this._driver = driver
    else if (typeof bleat !== 'undefined' && bleat) {
      this._driver = new DriverBleat()
    } else if (typeof simpleBLE !== 'undefined' && simpleBLE) {
      this._driver = new DriverSimpleBLE()
    } else if (hasWebBlueTooth()) {
      this._driver = new DriverWebBlueTooth(this)
    } else {
      this.handleError(
        'No suitable blue tooth driver found to connect to the ergometer. You need to load bleat on native platforms and a browser with web blue tooth capability.'
      )
    }

    const enableDisableFunc = () => {
      this.enableDisableNotification()
    }
    this._rowingGeneralStatusEvent = new pubSub.Event<
      ergometer.RowingGeneralStatusEvent
    >()
    this.rowingGeneralStatusEvent.registerChangedEvent(enableDisableFunc)

    this._rowingAdditionalStatus1Event = new pubSub.Event<
      ergometer.RowingAdditionalStatus1Event
    >()
    this.rowingAdditionalStatus1Event.registerChangedEvent(enableDisableFunc)

    this._rowingAdditionalStatus2Event = new pubSub.Event<
      ergometer.RowingAdditionalStatus2Event
    >()
    this.rowingAdditionalStatus2Event.registerChangedEvent(enableDisableFunc)

    this._rowingStrokeDataEvent = new pubSub.Event<ergometer.RowingStrokeDataEvent>()
    this.rowingStrokeDataEvent.registerChangedEvent(enableDisableFunc)

    this._rowingAdditionalStrokeDataEvent = new pubSub.Event<
      ergometer.RowingAdditionalStrokeDataEvent
    >()
    this.rowingAdditionalStrokeDataEvent.registerChangedEvent(enableDisableFunc)

    this._rowingSplitIntervalDataEvent = new pubSub.Event<
      ergometer.RowingSplitIntervalDataEvent
    >()
    this.rowingSplitIntervalDataEvent.registerChangedEvent(enableDisableFunc)

    this._rowingAdditionalSplitIntervalDataEvent = new pubSub.Event<
      ergometer.RowingAdditionalSplitIntervalDataEvent
    >()
    this.rowingAdditionalSplitIntervalDataEvent.registerChangedEvent(
      enableDisableFunc
    )

    this._workoutSummaryDataEvent = new pubSub.Event<
      ergometer.WorkoutSummaryDataEvent
    >()
    this.workoutSummaryDataEvent.registerChangedEvent(enableDisableFunc)

    this._additionalWorkoutSummaryDataEvent = new pubSub.Event<
      ergometer.AdditionalWorkoutSummaryDataEvent
    >()
    this.additionalWorkoutSummaryDataEvent.registerChangedEvent(
      enableDisableFunc
    )

    this._additionalWorkoutSummaryData2Event = new pubSub.Event<
      ergometer.AdditionalWorkoutSummaryData2Event
    >()
    this.additionalWorkoutSummaryData2Event.registerChangedEvent(
      enableDisableFunc
    )

    this._heartRateBeltInformationEvent = new pubSub.Event<
      ergometer.HeartRateBeltInformationEvent
    >()
    this.heartRateBeltInformationEvent.registerChangedEvent(enableDisableFunc)

    this._powerCurveEvent = new pubSub.Event<ergometer.PowerCurveEvent>()
    this._powerCurveEvent.registerChangedEvent(enableDisableFunc)
  }

  /**
   *
   * @param name
   * @returns {DeviceInfo}
   */
  protected findDevice(name: string): ergometer.DeviceInfo {
    let result: ergometer.DeviceInfo = null
    this._devices.forEach(device => {
      if (device.name === name) result = device
    })
    return result
  }

  /**
   * the promise is never fail
   * @param serviceUUID
   * @param UUID
   * @param readValue
   */
  protected readStringCharacteristic(
    serviceUUID: string,
    UUID: string
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.driver
        .readCharacteristic(serviceUUID, UUID)
        .then((data: ArrayBuffer) => {
          resolve(utils.bufferToString(data))
        }, reject)
    })
  }

  /**
   * the promise will never fail
   * @param done
   */
  protected readSampleRate(): Promise<void> {
    return this.driver
      .readCharacteristic(
        ble.PMROWING_SERVICE,
        ble.ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC
      )
      .then((data: ArrayBuffer) => {
        const view = new DataView(data)
        this._sampleRate = view.getUint8(0)
      })
  }

  /**
   *
   * @param done
   */
  protected readPheripheralInfo(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Promise.all([
        this.readStringCharacteristic(
          ble.PMDEVICE_INFO_SERVICE,
          ble.SERIALNUMBER_CHARACTERISTIC
        ).then((value: string) => {
          this._deviceInfo.serial = value
        }),
        this.readStringCharacteristic(
          ble.PMDEVICE_INFO_SERVICE,
          ble.HWREVISION_CHARACTERISIC
        ).then((value: string) => {
          this._deviceInfo.hardwareRevision = value
        }),
        this.readStringCharacteristic(
          ble.PMDEVICE_INFO_SERVICE,
          ble.FWREVISION_CHARACTERISIC
        ).then((value: string) => {
          this._deviceInfo.firmwareRevision = value
        }),
        this.readStringCharacteristic(
          ble.PMDEVICE_INFO_SERVICE,
          ble.MANUFNAME_CHARACTERISIC
        ).then((value: string) => {
          this._deviceInfo.manufacturer = value
          this._deviceInfo.connected = true
        }),
        this.readSampleRate()
      ]).then(
        () => {
          resolve()
        },
        e => {
          this.handleError(e)
          resolve(e)
        }
      ) // log erro const not get this into the way of connecting
    })
  }

  /**
   *
   * @param data
   */
  protected handleRowingGeneralStatus(data: DataView) {
    const parsed: ergometer.RowingGeneralStatus = {
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Rowing_Status_BLE_Payload.ELAPSED_TIME_LO
        ) * 10, // in mili seconds
      distance:
        utils.getUint24(data, ble.PM_Rowing_Status_BLE_Payload.DISTANCE_LO) /
        10,
      workoutType: data.getUint8(ble.PM_Rowing_Status_BLE_Payload.WORKOUT_TYPE),
      intervalType: data.getUint8(
        ble.PM_Rowing_Status_BLE_Payload.INTERVAL_TYPE
      ),
      workoutState: data.getUint8(
        ble.PM_Rowing_Status_BLE_Payload.WORKOUT_STATE
      ),
      rowingState: data.getUint8(ble.PM_Rowing_Status_BLE_Payload.ROWING_STATE),
      strokeState: data.getUint8(ble.PM_Rowing_Status_BLE_Payload.STROKE_STATE),
      totalWorkDistance: utils.getUint24(
        data,
        ble.PM_Rowing_Status_BLE_Payload.TOTAL_WORK_DISTANCE_LO
      ),
      workoutDuration: utils.getUint24(
        data,
        ble.PM_Rowing_Status_BLE_Payload.WORKOUT_DURATION_LO
      ),
      workoutDurationType: data.getUint8(
        ble.PM_Rowing_Status_BLE_Payload.WORKOUT_DURATION_TYPE
      ),
      dragFactor: data.getUint8(ble.PM_Rowing_Status_BLE_Payload.DRAG_FACTOR)
    }
    if (parsed.workoutDurationType === ergometer.WorkoutDurationType.timeDuration) {
      parsed.workoutDuration = parsed.workoutDuration * 10
    } // in mili seconds
    if (JSON.stringify(this.rowingGeneralStatus) !== JSON.stringify(parsed)) {
      this.rowingGeneralStatusEvent.pub(parsed)
      this._rowingGeneralStatus = parsed
    }
  }

  protected calcPace(lowByte, highByte: number) {
    return (lowByte + highByte * 256) * 10
  }
  /**
   *
   * @param data
   */
  protected handleRowingAdditionalStatus1(data: DataView) {
    const parsed: ergometer.RowingAdditionalStatus1 = {
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Extra_Status1_BLE_Payload.ELAPSED_TIME_LO
        ) * 10, // in mili seconds
      speed: data.getUint16(ble.PM_Extra_Status1_BLE_Payload.SPEED_LO) / 1000, // m/s
      strokeRate: data.getUint8(ble.PM_Extra_Status1_BLE_Payload.STROKE_RATE),
      heartRate: utils.valueToNullValue(
        data.getUint8(ble.PM_Extra_Status1_BLE_Payload.HEARTRATE),
        255
      ),
      currentPace: this.calcPace(
        data.getUint8(ble.PM_Extra_Status1_BLE_Payload.CURRENT_PACE_LO),
        data.getUint8(ble.PM_Extra_Status1_BLE_Payload.CURRENT_PACE_HI)
      ),
      averagePace: this.calcPace(
        data.getUint8(ble.PM_Extra_Status1_BLE_Payload.AVG_PACE_LO),
        data.getUint8(ble.PM_Extra_Status1_BLE_Payload.AVG_PACE_HI)
      ),
      restDistance: data.getUint16(
        ble.PM_Extra_Status1_BLE_Payload.REST_DISTANCE_LO
      ),
      restTime:
        utils.getUint24(data, ble.PM_Extra_Status1_BLE_Payload.REST_TIME_LO) *
        10, // mili seconds
      averagePower: null
    }
    if (
      data.byteLength === ble.PM_Mux_Extra_Status1_BLE_Payload.BLE_PAYLOAD_SIZE
    ) {
      parsed.averagePower = data.getUint16(
        ble.PM_Mux_Extra_Status1_BLE_Payload.AVG_POWER_LO
      )
    }

    if (
      JSON.stringify(this.rowingAdditionalStatus1) !== JSON.stringify(parsed)
    ) {
      this.rowingAdditionalStatus1Event.pub(parsed)
      this._rowingAdditionalStatus1 = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleRowingAdditionalStatus2(data: DataView) {
    let parsed: ergometer.RowingAdditionalStatus2
    if (data.byteLength === ble.PM_Extra_Status2_BLE_Payload.BLE_PAYLOAD_SIZE) {
      parsed = {
        elapsedTime:
          utils.getUint24(
            data,
            ble.PM_Extra_Status2_BLE_Payload.ELAPSED_TIME_LO
          ) * 10, // in mili seconds
        intervalCount: data.getUint8(
          ble.PM_Extra_Status2_BLE_Payload.INTERVAL_COUNT
        ),
        averagePower: data.getUint16(
          ble.PM_Extra_Status2_BLE_Payload.AVG_POWER_LO
        ),
        totalCalories: data.getUint16(
          ble.PM_Extra_Status2_BLE_Payload.TOTAL_CALORIES_LO
        ),
        splitAveragePace: this.calcPace(
          data.getUint8(
            ble.PM_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_PACE_LO
          ),
          data.getUint8(
            ble.PM_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_PACE_HI
          )
        ), // ms,
        splitAveragePower: data.getUint16(
          ble.PM_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_POWER_LO
        ), // watt
        splitAverageCalories: data.getUint16(
          ble.PM_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_CALORIES_LO
        ), // cal/hour
        lastSplitTime:
          data.getUint16(ble.PM_Extra_Status2_BLE_Payload.LAST_SPLIT_TIME_LO) *
          100, // the doc 0.1 factor is this right?
        lastSplitDistance: utils.getUint24(
          data,
          ble.PM_Extra_Status2_BLE_Payload.LAST_SPLIT_DISTANCE_LO
        )
      }
    } else {
      parsed = {
        elapsedTime:
          utils.getUint24(
            data,
            ble.PM_Mux_Extra_Status2_BLE_Payload.ELAPSED_TIME_LO
          ) * 10, // in mili seconds
        intervalCount: data.getUint8(
          ble.PM_Mux_Extra_Status2_BLE_Payload.INTERVAL_COUNT
        ),
        averagePower: null,
        totalCalories: data.getUint16(
          ble.PM_Mux_Extra_Status2_BLE_Payload.TOTAL_CALORIES_LO
        ),
        splitAveragePace: this.calcPace(
          data.getUint8(
            ble.PM_Mux_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_PACE_LO
          ),
          data.getUint8(
            ble.PM_Mux_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_PACE_HI
          )
        ), // ms,
        splitAveragePower: data.getUint16(
          ble.PM_Mux_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_POWER_LO
        ), // watt
        splitAverageCalories: data.getUint16(
          ble.PM_Mux_Extra_Status2_BLE_Payload.SPLIT_INTERVAL_AVG_CALORIES_LO
        ), // cal/hour
        lastSplitTime:
          data.getUint16(
            ble.PM_Mux_Extra_Status2_BLE_Payload.LAST_SPLIT_TIME_LO
          ) * 100, // the doc 0.1 factor is this right?
        lastSplitDistance: utils.getUint24(
          data,
          ble.PM_Mux_Extra_Status2_BLE_Payload.LAST_SPLIT_DISTANCE_LO
        )
      }
    }
    if (
      JSON.stringify(this.rowingAdditionalStatus2) !== JSON.stringify(parsed)
    ) {
      this.rowingAdditionalStatus2Event.pub(parsed)
      this._rowingAdditionalStatus2 = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleRowingStrokeData(data: DataView) {
    let parsed: ergometer.RowingStrokeData
    if (data.byteLength === ble.PM_Stroke_Data_BLE_Payload.BLE_PAYLOAD_SIZE) {
      parsed = {
        elapsedTime:
          utils.getUint24(
            data,
            ble.PM_Stroke_Data_BLE_Payload.ELAPSED_TIME_LO
          ) * 10, // in mili seconds
        distance:
          utils.getUint24(data, ble.PM_Stroke_Data_BLE_Payload.DISTANCE_LO) /
          10, // meter
        driveLength:
          data.getUint8(ble.PM_Stroke_Data_BLE_Payload.DRIVE_LENGTH) / 100, // meters
        driveTime:
          data.getUint8(ble.PM_Stroke_Data_BLE_Payload.DRIVE_TIME) * 10, // ms
        strokeRecoveryTime:
          data.getUint16(
            ble.PM_Stroke_Data_BLE_Payload.STROKE_RECOVERY_TIME_LO
          ) * 10, // ms
        strokeDistance:
          data.getUint16(ble.PM_Stroke_Data_BLE_Payload.STROKE_DISTANCE_LO) /
          100, // meter
        peakDriveForce:
          data.getUint16(ble.PM_Stroke_Data_BLE_Payload.PEAK_DRIVE_FORCE_LO) /
          10, // lbs
        averageDriveForce:
          data.getUint16(ble.PM_Stroke_Data_BLE_Payload.AVG_DRIVE_FORCE_LO) /
          10, // lbs
        workPerStroke:
          data.getUint16(ble.PM_Stroke_Data_BLE_Payload.WORK_PER_STROKE_LO) /
          10, // jouls
        strokeCount: data.getUint16(
          ble.PM_Stroke_Data_BLE_Payload.STROKE_COUNT_LO
        )
      }
    } else {
      parsed = {
        elapsedTime:
          utils.getUint24(
            data,
            ble.PM_Mux_Stroke_Data_BLE_Payload.ELAPSED_TIME_LO
          ) * 10, // in mili seconds
        distance:
          utils.getUint24(
            data,
            ble.PM_Mux_Stroke_Data_BLE_Payload.DISTANCE_LO
          ) / 10, // meter
        driveLength:
          data.getUint8(ble.PM_Mux_Stroke_Data_BLE_Payload.DRIVE_LENGTH) / 100, // meters
        driveTime:
          data.getUint8(ble.PM_Mux_Stroke_Data_BLE_Payload.DRIVE_TIME) * 10, // ms
        strokeRecoveryTime:
          data.getUint16(
            ble.PM_Mux_Stroke_Data_BLE_Payload.STROKE_RECOVERY_TIME_LO
          ) * 10, // ms
        strokeDistance:
          data.getUint16(
            ble.PM_Mux_Stroke_Data_BLE_Payload.STROKE_DISTANCE_LO
          ) / 100, // meter
        peakDriveForce:
          data.getUint16(
            ble.PM_Mux_Stroke_Data_BLE_Payload.PEAK_DRIVE_FORCE_LO
          ) / 10, // lbs
        averageDriveForce:
          data.getUint16(
            ble.PM_Mux_Stroke_Data_BLE_Payload.AVG_DRIVE_FORCE_LO
          ) / 10, // lbs
        workPerStroke: null,
        strokeCount: data.getUint16(
          ble.PM_Mux_Stroke_Data_BLE_Payload.STROKE_COUNT_LO
        )
      }
    }

    if (JSON.stringify(this.rowingStrokeData) !== JSON.stringify(parsed)) {
      this.rowingStrokeDataEvent.pub(parsed)
      this._rowingStrokeData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleRowingAdditionalStrokeData(data: DataView) {
    const parsed: ergometer.RowingAdditionalStrokeData = {
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Extra_Stroke_Data_BLE_Payload.ELAPSED_TIME_LO
        ) * 10, // in mili seconds
      strokePower: data.getUint16(
        ble.PM_Extra_Stroke_Data_BLE_Payload.STROKE_POWER_LO
      ), // watts
      strokeCalories: data.getUint16(
        ble.PM_Extra_Stroke_Data_BLE_Payload.STROKE_CALORIES_LO
      ), // cal/hr
      strokeCount: data.getUint16(
        ble.PM_Extra_Stroke_Data_BLE_Payload.STROKE_COUNT_LO
      ),
      projectedWorkTime:
        utils.getUint24(
          data,
          ble.PM_Extra_Stroke_Data_BLE_Payload.PROJ_WORK_TIME_LO
        ) * 1000, // ms
      projectedWorkDistance: utils.getUint24(
        data,
        ble.PM_Extra_Stroke_Data_BLE_Payload.PROJ_WORK_DIST_LO
      ), // meter
      workPerStroke: null // filled when multiplexed is true
    }
    if (
      data.byteLength ===
      ble.PM_Mux_Extra_Stroke_Data_BLE_Payload.BLE_PAYLOAD_SIZE
    ) {
      parsed.workPerStroke = data.getUint16(
        ble.PM_Mux_Extra_Stroke_Data_BLE_Payload.WORK_PER_STROKE_LO
      )
    }
    if (
      JSON.stringify(this.rowingAdditionalStrokeData) !== JSON.stringify(parsed)
    ) {
      this.rowingAdditionalStrokeDataEvent.pub(parsed)
      this._rowingAdditionalStrokeData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleRowingSplitIntervalData(data: DataView) {
    const parsed: ergometer.RowingSplitIntervalData = {
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Split_Interval_Data_BLE_Payload.ELAPSED_TIME_LO
        ) * 10, // in mili seconds
      distance:
        utils.getUint24(
          data,
          ble.PM_Split_Interval_Data_BLE_Payload.DISTANCE_LO
        ) / 10, // meters
      intervalTime:
        utils.getUint24(
          data,
          ble.PM_Split_Interval_Data_BLE_Payload.SPLIT_TIME_LO
        ) * 100,
      intervalDistance: utils.getUint24(
        data,
        ble.PM_Split_Interval_Data_BLE_Payload.SPLIT_DISTANCE_LO
      ),
      intervalRestTime:
        data.getUint16(ble.PM_Split_Interval_Data_BLE_Payload.REST_TIME_LO) *
        1000,
      intervalRestDistance: data.getUint16(
        ble.PM_Split_Interval_Data_BLE_Payload.REST_DISTANCE_LO
      ), // meter
      intervalType: data.getUint8(ble.PM_Split_Interval_Data_BLE_Payload.TYPE),
      intervalNumber: data.getUint8(
        ble.PM_Split_Interval_Data_BLE_Payload.INT_NUMBER
      )
    }

    if (
      JSON.stringify(this.rowingSplitIntervalData) !== JSON.stringify(parsed)
    ) {
      this.rowingSplitIntervalDataEvent.pub(parsed)
      this._rowingSplitIntervalData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleRowingAdditionalSplitIntervalData(data: DataView) {
    const parsed: ergometer.RowingAdditionalSplitIntervalData = {
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Extra_Split_Interval_Data_BLE_Payload.ELAPSED_TIME_LO
        ) * 10, // in mili seconds
      intervalAverageStrokeRate: data.getUint8(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.STROKE_RATE
      ),
      intervalWorkHeartrate: data.getUint8(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.WORK_HR
      ),
      intervalRestHeartrate: data.getUint8(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.REST_HR
      ),
      intervalAveragePace:
        data.getUint16(
          ble.PM_Extra_Split_Interval_Data_BLE_Payload.AVG_PACE_LO
        ) * 10, // ms lbs
      intervalTotalCalories: data.getUint16(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.CALORIES_LO
      ),
      intervalAverageCalories: data.getUint16(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.AVG_CALORIES_LO
      ),
      intervalSpeed:
        data.getUint16(ble.PM_Extra_Split_Interval_Data_BLE_Payload.SPEED_LO) /
        1000, // m/s
      intervalPower: data.getUint16(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.POWER_LO
      ),
      splitAverageDragFactor: data.getUint8(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.AVG_DRAG_FACTOR
      ),
      intervalNumber: data.getUint8(
        ble.PM_Extra_Split_Interval_Data_BLE_Payload.INT_NUMBER
      )
    }

    if (
      JSON.stringify(this.rowingAdditionalSplitIntervalData) !==
      JSON.stringify(parsed)
    ) {
      this.rowingAdditionalSplitIntervalDataEvent.pub(parsed)
      this._rowingAdditionalSplitIntervalData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleWorkoutSummaryData(data: DataView) {
    const parsed: ergometer.WorkoutSummaryData = {
      logEntryDate: data.getUint16(
        ble.PM_Workout_Summary_Data_BLE_Payload.LOG_DATE_LO
      ),
      logEntryTime: data.getUint16(
        ble.PM_Workout_Summary_Data_BLE_Payload.LOG_TIME_LO
      ),
      elapsedTime:
        utils.getUint24(
          data,
          ble.PM_Workout_Summary_Data_BLE_Payload.ELAPSED_TIME_LO
        ) * 10,
      distance:
        utils.getUint24(
          data,
          ble.PM_Workout_Summary_Data_BLE_Payload.DISTANCE_LO
        ) / 10,
      averageStrokeRate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.AVG_SPM
      ),
      endingHeartrate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.END_HR
      ),
      averageHeartrate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.AVG_HR
      ),
      minHeartrate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.MIN_HR
      ),
      maxHeartrate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.MAX_HR
      ),
      dragFactorAverage: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.AVG_DRAG_FACTOR
      ),
      recoveryHeartRate: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.RECOVERY_HR
      ),
      workoutType: data.getUint8(
        ble.PM_Workout_Summary_Data_BLE_Payload.WORKOUT_TYPE
      ),
      averagePace: null
    }

    if (
      data.byteLength ===
      ble.PM_Workout_Summary_Data_BLE_Payload.BLE_PAYLOAD_SIZE
    ) {
      parsed.averagePace = data.getUint16(
        ble.PM_Workout_Summary_Data_BLE_Payload.AVG_PACE_LO
      )
    }
    if (JSON.stringify(this.workoutSummaryData) !== JSON.stringify(parsed)) {
      this.workoutSummaryDataEvent.pub(parsed)
      this._workoutSummaryData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleAdditionalWorkoutSummaryData(data: DataView) {
    let parsed: ergometer.AdditionalWorkoutSummaryData
    if (
      data.byteLength ===
      ble.PM_Extra_Workout_Summary_Data_BLE_Payload.DATA_BLE_PAYLOAD_SIZE
    ) {
      parsed = {
        logEntryDate: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.LOG_DATE_LO
        ),
        logEntryTime: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.LOG_DATE_HI
        ),
        intervalType: data.getUint8(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.SPLIT_INT_TYPE
        ),
        intervalSize: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.SPLIT_INT_SIZE_LO
        ), // meters or seconds
        intervalCount: data.getUint8(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.SPLIT_INT_COUNT
        ),
        totalCalories: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.WORK_CALORIES_LO
        ),
        watts: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.WATTS_LO
        ),
        totalRestDistance: utils.getUint24(
          data,
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.TOTAL_REST_DISTANCE_LO
        ),
        intervalRestTime: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.INTERVAL_REST_TIME_LO
        ),
        averageCalories: data.getUint16(
          ble.PM_Extra_Workout_Summary_Data_BLE_Payload.AVG_CALORIES_LO
        )
      }
    } else {
      parsed = {
        logEntryDate: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.LOG_DATE_LO
        ),
        logEntryTime: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.LOG_TIME_LO
        ),
        intervalType: null,
        intervalSize: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.SPLIT_INT_SIZE_LO
        ), // meters or seconds
        intervalCount: data.getUint8(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.SPLIT_INT_COUNT
        ),
        totalCalories: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.WORK_CALORIES_LO
        ),
        watts: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.WATTS_LO
        ),
        totalRestDistance: utils.getUint24(
          data,
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload
            .TOTAL_REST_DISTANCE_LO
        ),
        intervalRestTime: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload
            .INTERVAL_REST_TIME_LO
        ),
        averageCalories: data.getUint16(
          ble.PM_Mux_Extra_Workout_Summary_Data_BLE_Payload.AVG_CALORIES_LO
        )
      }
    }

    if (
      JSON.stringify(this.additionalWorkoutSummaryData) !==
      JSON.stringify(parsed)
    ) {
      this.additionalWorkoutSummaryDataEvent.pub(parsed)
      this._additionalWorkoutSummaryData = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleAdditionalWorkoutSummaryData2(data: DataView) {
    const parsed: ergometer.AdditionalWorkoutSummaryData2 = {
      logEntryDate: data.getUint16(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.LOG_DATE_LO
      ),
      logEntryTime: data.getUint16(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.LOG_DATE_HI
      ),
      averagePace: data.getUint16(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.AVG_PACE_LO
      ),
      gameIdentifier: data.getUint8(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.GAME_ID
      ),
      gameScore: data.getUint16(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.GAME_SCORE_LO
      ),
      ergMachineType: data.getUint8(
        ble.PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload.MACHINE_TYPE
      )
    }

    if (
      JSON.stringify(this.additionalWorkoutSummaryData2) !==
      JSON.stringify(parsed)
    ) {
      this.additionalWorkoutSummaryData2Event.pub(parsed)
      this._additionalWorkoutSummaryData2 = parsed
    }
  }

  /**
   *
   * @param data
   */
  protected handleHeartRateBeltInformation(data: DataView) {
    const parsed: ergometer.HeartRateBeltInformation = {
      manufacturerId: data.getUint8(
        ble.PM_Heart_Rate_Belt_Info_BLE_Payload.MANUFACTURER_ID
      ),
      deviceType: data.getUint8(
        ble.PM_Heart_Rate_Belt_Info_BLE_Payload.DEVICE_TYPE
      ),
      beltId: data.getUint32(ble.PM_Heart_Rate_Belt_Info_BLE_Payload.BELT_ID_LO)
    }

    if (
      JSON.stringify(this.heartRateBeltInformation) !== JSON.stringify(parsed)
    ) {
      this.heartRateBeltInformationEvent.pub(parsed)
      this._heartRateBeltInformation = parsed
    }
  }

  /**
   *
   * @internal
   */
  protected deviceConnected() {
    this.debugInfo('readServices success')

    this.debugInfo('Status: notifications are activated')
    // handle to the notification

    this.changeConnectionState(ergometer.MonitorConnectionState.servicesFound)
    this.enableDisableNotification()

    // allways connect to csafe
    this.handleCSafeNotifications()
    this.changeConnectionState(ergometer.MonitorConnectionState.readyForCommunication)
  }

  /**
   *
   * @param data
   */
  protected handleDataCallbackMulti(data: ArrayBuffer) {
    let ar = new DataView(data)
    const dataType: ble.PM_Multiplexed_Info_Type_ID = ar.getUint8(0)
    ar = new DataView(data, 1)
    switch (dataType) {
      case ble.PM_Multiplexed_Info_Type_ID.ROWING_GENERAL_STATUS: {
        if (this.rowingGeneralStatusEvent.count > 0) {
          this.handleRowingGeneralStatus(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.ROWING_ADDITIONAL_STATUS1: {
        if (this.rowingAdditionalStatus1Event.count > 0) {
          this.handleRowingAdditionalStatus1(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.ROWING_ADDITIONAL_STATUS2: {
        if (this.rowingAdditionalStatus2Event.count > 0) {
          this.handleRowingAdditionalStatus2(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.STROKE_DATA_STATUS: {
        if (this.rowingStrokeDataEvent.count > 0) {
          this.handleRowingStrokeData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.EXTRA_STROKE_DATA_STATUS: {
        if (this.rowingAdditionalStrokeDataEvent.count > 0) {
          this.handleRowingAdditionalStrokeData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.SPLIT_INTERVAL_STATUS: {
        if (this.rowingSplitIntervalDataEvent.count > 0) {
          this.handleRowingSplitIntervalData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.EXTRA_SPLIT_INTERVAL_STATUS: {
        if (this.rowingAdditionalSplitIntervalDataEvent.count > 0) {
          this.handleRowingAdditionalSplitIntervalData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.WORKOUT_SUMMARY_STATUS: {
        if (this.workoutSummaryDataEvent.count > 0) {
          this.handleWorkoutSummaryData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.EXTRA_WORKOUT_SUMMARY_STATUS1: {
        if (this.additionalWorkoutSummaryDataEvent.count > 0) {
          this.handleAdditionalWorkoutSummaryData(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.HEART_RATE_BELT_INFO_STATUS: {
        if (this.heartRateBeltInformationEvent.count > 0) {
          this.handleHeartRateBeltInformation(ar)
        }
        break
      }
      case ble.PM_Multiplexed_Info_Type_ID.EXTRA_WORKOUT_SUMMARY_STATUS2: {
        if (this.additionalWorkoutSummaryData2Event.count > 0) {
          this.handleAdditionalWorkoutSummaryData2(ar)
        }
        break
      }
    }
  }

  /**
   *
   * @param data
   * @param func
   */
  protected handleDataCallback(
    data: ArrayBuffer,
    func: (data: DataView) => void
  ) {
    // this.debugInfo("data received: " + evothings.util.typedArrayToHexString(data));

    const ar = new DataView(data)
    // call the function within the scope of the object
    func.apply(this, [ar])
  }

  protected removeOldSendCommands() {
    for (let i = this._waitResponseCommands.length - 1; i >= 0; i--) {
      const command: IRawCommand = this._waitResponseCommands[i]
      const currentTime = utils.getTime()
      // more than 20 seconds in the buffer
      if (currentTime - command._timestamp > 20000) {
        if (command.onError) {
          command.onError('Nothing returned in 20 seconds')
          this.handleError(
            `Nothing returned in 20 seconds from command ${command.command} ${
              command.detailCommand
            }`
          )
        }
        this._waitResponseCommands.splice(i, 1)
      }
    }
  }

  protected sendCsafeCommands(byteArray: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // is there anything to send?
      if (byteArray && byteArray.length > 0) {
        // calc the checksum of the data to be send
        let checksum = 0
        for (let i = 0; i < byteArray.length; i++) {
          checksum = checksum ^ byteArray[i]
        }
        // prepare all the data to be send in one array
        // begin with a start byte ad end with a checksum and an end byte
        const bytesToSend: number[] = [csafe.FRAME_START_BYTE]
          .concat(byteArray)
          .concat([checksum, csafe.FRAME_END_BYTE])

        // send in packages of max 20 bytes (ble.PACKET_SIZE)
        let sendBytesIndex = 0
        // continue while not all bytes are send
        while (sendBytesIndex < bytesToSend.length) {
          // prepare a buffer with the data which can be send in one packet
          const bufferLength = Math.min(
            ble.PACKET_SIZE,
            bytesToSend.length - sendBytesIndex
          )
          const buffer = new ArrayBuffer(bufferLength) // start and end and
          const dataView = new DataView(buffer)

          let bufferIndex = 0
          while (bufferIndex < bufferLength) {
            dataView.setUint8(bufferIndex, bytesToSend[sendBytesIndex])
            sendBytesIndex++
            bufferIndex++
          }
          this.traceInfo('send csafe: ' + utils.typedArrayToHexString(buffer))
          this.driver
            .writeCharacteristic(
              ble.PMCONTROL_SERVICE,
              ble.TRANSMIT_TO_PM_CHARACTERISIC,
              dataView
            )
            .then(() => {
              this.traceInfo('csafe command send')
              if (sendBytesIndex >= bytesToSend.length) resolve()
            })
            .catch(e => {
              reject(e)
            })
        }
      } else resolve()
    })
  }
}
