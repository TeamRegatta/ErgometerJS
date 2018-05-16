/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 */
import { IBuffer, ICommandParamsBase, ICommandSetStandardValue } from './command_core';
import * as ergometer from './../typedefinitions';
export interface ICommandStrokeState extends ICommandParamsBase {
    onDataReceived: (state: ergometer.StrokeState) => void;
}
export interface IBuffer {
    getStrokeState(params: ICommandStrokeState): IBuffer;
}
export interface ICommandPowerCurve {
    onDataReceived: (curve: number[]) => void;
    onError?: ergometer.ErrorHandler;
}
export interface IBuffer {
    getPowerCurve(params: ICommandPowerCurve): IBuffer;
}
export interface ICommandProgramParams extends ICommandParamsBase {
    value: ergometer.Program;
}
export interface IBuffer {
    setProgram(params: ICommandProgramParams): IBuffer;
}
export interface ICommandTimeParams extends ICommandParamsBase {
    hour: number;
    minute: number;
    second: number;
}
export interface IBuffer {
    setTime(params: ICommandTimeParams): IBuffer;
}
export interface ICommandDateParams extends ICommandParamsBase {
    year: number;
    month: number;
    day: number;
}
export interface IBuffer {
    setDate(params: ICommandDateParams): IBuffer;
}
export interface IBuffer {
    setTimeout(params: ICommandSetStandardValue): IBuffer;
}
export interface IBuffer {
    setWork(params: ICommandTimeParams): IBuffer;
}
export interface ICommandDistanceParams extends ICommandSetStandardValue {
    unit: ergometer.Unit;
}
export interface IBuffer {
    setDistance(params: ICommandDistanceParams): IBuffer;
}
export interface IBuffer {
    setTotalCalories(params: ICommandSetStandardValue): IBuffer;
}
export interface ICommandPowerParams extends ICommandSetStandardValue {
    unit: ergometer.Unit;
}
export interface IBuffer {
    setPower(params: ICommandPowerParams): IBuffer;
}
