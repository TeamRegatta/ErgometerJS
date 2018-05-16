/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 */
import { IBuffer, ICommandParamsBase } from './command_core';
import * as ergometer from './../typedefinitions';
export interface IDistance {
    value: number;
    unit: ergometer.Unit;
}
export interface ICommandGetDistance extends ICommandParamsBase {
    onDataReceived: (version: IDistance) => void;
}
export interface IBuffer {
    getDistance(params: ICommandParamsBase): IBuffer;
}
