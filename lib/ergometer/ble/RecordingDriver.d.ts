/**
 * Created by tijmen on 16-02-16.
 */
import * as driver from './Driver';
import * as ergometer from './../typedefinitions';
export interface IRecordDevice {
    address: string;
    name: string;
    rssi: number;
}
export interface IRecordCharacteristic {
    serviceUIID: string;
    characteristicUUID: string;
    data?: string;
}
export declare enum RecordingEventType {
    startScan = 0,
    scanFoundFn = 1,
    stopScan = 2,
    connect = 3,
    disconnectFn = 4,
    disconnect = 5,
    writeCharacteristic = 6,
    readCharacteristic = 7,
    enableNotification = 8,
    notificationReceived = 9,
    disableNotification = 10,
}
export interface IRecordingItem {
    timeStamp: number;
    eventType: string;
    timeStampReturn?: number;
    data?: IRecordCharacteristic | IRecordDevice;
    error?: any;
}
export declare class RecordingDriver implements driver.IDriver {
    _performanceMonitor: ergometer.IPerformanceMonitor;
    private _realDriver;
    private _startTime;
    private _events;
    constructor(performanceMonitor: ergometer.IPerformanceMonitor, realDriver: driver.IDriver);
    addRecording(eventType: RecordingEventType, data?: IRecordCharacteristic | IRecordDevice): IRecordingItem;
    events: IRecordingItem[];
    clear(): void;
    startRecording(): void;
    startScan(foundFn?: driver.IFoundFunc): Promise<void>;
    stopScan(): void;
    connect(device: driver.IDevice, disconnectFn: () => void): Promise<void>;
    disconnect(): void;
    writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
    readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
    enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
    disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    protected getRelativeTime(): number;
    protected recordResolveFunc(resolve: () => void, rec: IRecordingItem): () => void;
    protected recordResolveBufferFunc(resolve: (data: ArrayBuffer) => void, rec: IRecordingItem): (data: ArrayBuffer) => void;
    protected recordErrorFunc(reject: (e) => void, rec: IRecordingItem): (e) => void;
}
