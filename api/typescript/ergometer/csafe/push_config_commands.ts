/**
 * Created by tijmen on 06-02-16.
 */
import { ICommandParamsBase, registerStandardSetConfig } from './command_core'
import * as csafe from './typedefinitions'
import * as ergometer from './../typedefinitions'
// ----------------------------- workout type ------------------------------------

export interface ICommandSetWorkOutType extends ICommandParamsBase {
  value: ergometer.WorkoutType // program or pre stored work out
}

export interface IBuffer {
  setWorkoutType(params: ICommandSetWorkOutType): IBuffer
}

registerStandardSetConfig<ICommandSetWorkOutType>(
  'setWorkoutType',
  csafe.PM_LONG_PUSH_CFG_CMDS.PM_SET_WORKOUTTYPE,
  params => {
    return [params.value]
  }
)
