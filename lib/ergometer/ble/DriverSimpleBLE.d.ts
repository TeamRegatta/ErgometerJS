/**
 * Created by tijmen on 01-02-16.
 *
 * see simpleBLE.d.ts for the definitions of the simpleBLE
 * It assumes that there simple ble is already imported as a var named simpleBLE
 *
 */
import { IDevice, IDriver, IFoundFunc } from './Driver';
import * as ergometer from './../typedefinitions';
export declare class DriverSimpleBLE implements IDriver {
    performanceMonitor: ergometer.IPerformanceMonitor;
    connect(device: IDevice, disconnectFn: () => void): Promise<void>;
    disconnect(): void;
    startScan(foundFn?: IFoundFunc): Promise<void>;
    stopScan(): Promise<void>;
    writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
    readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
    enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
    disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
}
