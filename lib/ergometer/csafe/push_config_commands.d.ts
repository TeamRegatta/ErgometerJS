/**
 * Created by tijmen on 06-02-16.
 */
import { ICommandParamsBase } from './command_core';
import * as ergometer from './../typedefinitions';
export interface ICommandSetWorkOutType extends ICommandParamsBase {
    value: ergometer.WorkoutType;
}
export interface IBuffer {
    setWorkoutType(params: ICommandSetWorkOutType): IBuffer;
}
