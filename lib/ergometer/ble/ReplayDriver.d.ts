/**
 * Created by tijmen on 18-02-16.
 */
import { IDevice, IDriver, IFoundFunc } from './Driver';
import { IRecordingItem, RecordingEventType } from './RecordingDriver';
import * as ergometer from './../typedefinitions';
export interface CallBackEvent extends IRecordingItem {
    resolve?: (e?: any) => void;
    reject?: (e: any) => void;
}
export declare class ReplayDriver implements IDriver {
    private _realDriver;
    private _events;
    private _eventCallBackMethods;
    private _eventCallbacks;
    private _playing;
    private _eventIndex;
    private _startTime;
    private _checkQueueTimerId;
    private _performanceMonitor;
    constructor(performanceMonitor: ergometer.IPerformanceMonitor, realDriver: IDriver);
    readonly events: IRecordingItem[];
    replay(events: IRecordingItem[]): void;
    playing: boolean;
    startScan(foundFn?: IFoundFunc): Promise<void>;
    stopScan(): void;
    connect(device: IDevice, disconnectFn: () => void): Promise<void>;
    disconnect(): void;
    writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
    readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
    enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
    disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    protected getRelativeTime(): number;
    protected isCallBack(eventType: RecordingEventType): boolean;
    protected isSameEvent(event1: IRecordingItem, event2: IRecordingItem): boolean;
    protected runEvent(event: IRecordingItem, queuedEvent: CallBackEvent): void;
    protected runTimedEvent(event: IRecordingItem, queuedEvent: CallBackEvent): void;
    protected removeEvent(i: number): void;
    protected checkQueue(): void;
    protected checkAllEventsProcessd(): boolean;
    protected timeNextCheck(timeStamp?: number): void;
    protected addEvent(eventType: RecordingEventType, isMethod: boolean, resolve?: (e?: any) => void, reject?: (e: any) => void, serviceUIID?: string, characteristicUUID?: string): void;
}
