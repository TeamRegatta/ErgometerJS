import * as ergometer from './../typedefinitions';
export interface IVersion {
    ManufacturerId: number;
    CID: number;
    Model: number;
    HardwareVersion: number;
    FirmwareVersion: number;
}
export interface ICommandGetVersion extends ICommandParamsBase {
    onDataReceived: (version: IVersion) => void;
}
export interface ICommandParamsBase {
    onError?: ergometer.ErrorHandler;
    onDataReceived?: (data: any) => void;
}
export interface IRawCommand {
    waitForResponse: boolean;
    command: number;
    detailCommand?: number;
    data?: number[];
    onDataReceived?: (data: DataView) => void;
    onError?: ergometer.ErrorHandler;
    _timestamp?: number;
}
export interface ICommandStrokeState extends ICommandParamsBase {
    onDataReceived: (state: ergometer.StrokeState) => void;
}
export interface ICommandPowerCurve {
    onDataReceived: (curve: number[]) => void;
    onError?: ergometer.ErrorHandler;
}
export interface ICommandProgramParams extends ICommandParamsBase {
    value: ergometer.Program;
}
export interface ICommandTimeParams extends ICommandParamsBase {
    hour: number;
    minute: number;
    second: number;
}
export interface IBuffer {
    rawCommands: IRawCommand[];
    clear(): IBuffer;
    addRawCommand(info: IRawCommand): any;
    send(success?: () => void, error?: ergometer.ErrorHandler): Promise<void>;
    getPowerCurve(params: ICommandPowerCurve): IBuffer;
    setProgram(params: ICommandProgramParams): IBuffer;
    getStrokeState(params: ICommandStrokeState): IBuffer;
    setTime(params: ICommandTimeParams): IBuffer;
    getVersion(params: ICommandGetVersion): IBuffer;
}
export interface ICommand {
    (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor): void;
}
export declare class CommandManager {
    private _commands;
    register(createCommand: ICommand): void;
    apply(buffer: IBuffer, monitor: ergometer.IPerformanceMonitor): void;
}
export declare let commandManager: CommandManager;
export interface ICommandSetStandardValue extends ICommandParamsBase {
    value: number;
}
export declare function registerStandardSet<T extends ICommandParamsBase>(functionName: string, command: number, setParams: (params: T) => number[]): void;
export declare function registerStandardSetConfig<T extends ICommandParamsBase>(functionName: string, command: number, setParams: (params: T) => number[]): void;
export declare function registerStandardShortGet<T extends ICommandParamsBase, U>(functionName: string, command: number, converter: (data: DataView) => U): void;
