/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 */
import {
  commandManager,
  IBuffer,
  ICommandGetVersion,
  ICommandParamsBase,
  registerStandardShortGet
} from './command_core'
import * as csafe from './typedefinitions'
import * as ergometer from './../typedefinitions'

// ----------------------------- get the version info ------------------------------------
commandManager.register(
  (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor) => {
    buffer.getVersion = function(params: ICommandGetVersion): IBuffer {
      buffer.addRawCommand({
        waitForResponse: true,
        command: csafe.SHORT_STATUS_CMDS.GETVERSION_CMD,
        onDataReceived: (data: DataView) => {
          if (params.onDataReceived) {
            params.onDataReceived({
              ManufacturerId: data.getUint8(0),
              CID: data.getUint8(1),
              Model: data.getUint8(2),
              HardwareVersion: data.getUint16(3, true),
              FirmwareVersion: data.getUint16(5, true)
            })
          }
        },
        onError: params.onError
      })
      return buffer
    }
  }
)

// ----------------------------- set horizontal distance ------------------------------------
export interface IDistance {
  value: number
  unit: ergometer.Unit
}

export interface ICommandGetDistance extends ICommandParamsBase {
  onDataReceived: (version: IDistance) => void
}
export interface IBuffer {
  getDistance(params: ICommandParamsBase): IBuffer
}

registerStandardShortGet<ICommandGetDistance, IDistance>(
  'getDistance',
  csafe.SHORT_DATA_CMDS.GETHORIZONTAL_CMD,
  (data: DataView) => {
    return { value: data.getUint16(0, true), unit: data.getUint8(2) }
  }
)
