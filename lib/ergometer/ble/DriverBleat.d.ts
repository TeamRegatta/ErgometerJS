/**
 * Created by tijmen on 01-02-16.
 */
import { IDevice, IDriver, IFoundFunc } from './Driver';
import * as ergometer from './../typedefinitions';
export declare class DriverBleat implements IDriver {
    performanceMonitor: ergometer.IPerformanceMonitor;
    private _device;
    connect(device: IDevice, disconnectFn: () => void): Promise<void>;
    disconnect(): void;
    startScan(foundFn?: IFoundFunc): Promise<void>;
    stopScan(): Promise<void>;
    writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
    readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
    enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
    disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    private getCharacteristic(serviceUid, characteristicUid);
}
