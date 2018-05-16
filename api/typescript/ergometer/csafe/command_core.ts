/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 * this is the core, you do not have to change this code.
 *
 */
import * as csafe from './typedefinitions'
import * as ergometer from './../typedefinitions'

export interface IVersion {
  ManufacturerId: number
  CID: number
  Model: number
  HardwareVersion: number
  FirmwareVersion: number
}

export interface ICommandGetVersion extends ICommandParamsBase {
  onDataReceived: (version: IVersion) => void
}

export interface ICommandParamsBase {
  onError?: ergometer.ErrorHandler
  onDataReceived?: (data: any) => void
}

export interface IRawCommand {
  waitForResponse: boolean
  command: number
  detailCommand?: number
  data?: number[] // you can skipp the length for this property, this is auto calculated
  onDataReceived?: (data: DataView) => void
  onError?: ergometer.ErrorHandler
  _timestamp?: number // only for internal use
}

export interface ICommandStrokeState extends ICommandParamsBase {
  onDataReceived: (state: ergometer.StrokeState) => void
}

export interface ICommandPowerCurve {
  onDataReceived: (curve: number[]) => void
  onError?: ergometer.ErrorHandler
}

export interface ICommandProgramParams extends ICommandParamsBase {
  value: ergometer.Program
}

export interface ICommandTimeParams extends ICommandParamsBase {
  hour: number
  minute: number
  second: number
}

export interface IBuffer {
  rawCommands: IRawCommand[]
  clear(): IBuffer
  addRawCommand(info: IRawCommand)
  send(success?: () => void, error?: ergometer.ErrorHandler): Promise<void>
  getPowerCurve(params: ICommandPowerCurve): IBuffer
  setProgram(params: ICommandProgramParams): IBuffer
  getStrokeState(params: ICommandStrokeState): IBuffer
  setTime(params: ICommandTimeParams): IBuffer
  getVersion(params: ICommandGetVersion): IBuffer
}

export interface ICommand {
  (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor): void
}

export class CommandManager {
  private _commands: ICommand[] = []
  public register(createCommand: ICommand) {
    this._commands.push(createCommand)
  }
  public apply(buffer: IBuffer, monitor: ergometer.IPerformanceMonitor) {
    this._commands.forEach((command: ICommand) => {
      command(buffer, monitor)
    })
  }
}

export let commandManager = new CommandManager()

// ----------------  standard value wrapper for shorter syntax----------
export interface ICommandSetStandardValue extends ICommandParamsBase {
  value: number // program or pre stored work out
}

export function registerStandardSet<T extends ICommandParamsBase>(
  functionName: string,
  command: number,
  setParams: (params: T) => number[]
) {
  commandManager.register(
    (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor) => {
      buffer[functionName] = function(params: T): IBuffer {
        buffer.addRawCommand({
          waitForResponse: false,
          command: command,
          data: setParams(params),
          onError: params.onError
        })
        return buffer
      }
    }
  )
}

export function registerStandardSetConfig<T extends ICommandParamsBase>(
  functionName: string,
  command: number,
  setParams: (params: T) => number[]
) {
  commandManager.register(
    (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor) => {
      buffer[functionName] = function(params: T): IBuffer {
        buffer.addRawCommand({
          waitForResponse: false,
          command: csafe.LONG_CFG_CMDS.SETUSERCFG1_CMD,
          detailCommand: command,
          data: setParams(params),
          onError: params.onError
        })
        return buffer
      }
    }
  )
}

export function registerStandardShortGet<T extends ICommandParamsBase, U>(
  functionName: string,
  command: number,
  converter: (data: DataView) => U
) {
  commandManager.register(
    (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor) => {
      buffer[functionName] = function(params: T): IBuffer {
        buffer.addRawCommand({
          waitForResponse: true,
          command: command,
          onDataReceived: (data: DataView) => {
            params.onDataReceived(converter(data) as U)
          },
          onError: params.onError
        })
        return buffer
      }
    }
  )
}
