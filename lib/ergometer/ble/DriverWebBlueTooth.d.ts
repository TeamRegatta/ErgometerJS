/**
 * Created by tijmen on 01-02-16.
 */
import { IDevice, IDriver, IFoundFunc } from './Driver';
import * as ergometer from './../typedefinitions';
export declare function hasWebBlueTooth(): boolean;
export declare class DriverWebBlueTooth implements IDriver {
    private _device;
    private _server;
    private _disconnectFn;
    private _listenerMap;
    private _listerCharacteristicMap;
    private _performanceMonitor;
    constructor(performanceMonitor: ergometer.IPerformanceMonitor);
    connect(device: IDevice, disconnectFn: () => void): Promise<void>;
    disconnect(): void;
    startScan(foundFn?: IFoundFunc): Promise<void>;
    stopScan(): Promise<void>;
    writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
    readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
    enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
    disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    private getCharacteristic(serviceUid, characteristicUid);
    private onDisconnected(event);
    private clearConnectionVars();
    private onCharacteristicValueChanged(event);
}
