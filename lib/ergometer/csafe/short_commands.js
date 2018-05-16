/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 */
import { commandManager, registerStandardShortGet } from './command_core';
// ----------------------------- get the version info ------------------------------------
commandManager.register(function (buffer, monitor) {
    buffer.getVersion = function (params) {
        buffer.addRawCommand({
            waitForResponse: true,
            command: 145 /* GETVERSION_CMD */,
            onDataReceived: function (data) {
                if (params.onDataReceived) {
                    params.onDataReceived({
                        ManufacturerId: data.getUint8(0),
                        CID: data.getUint8(1),
                        Model: data.getUint8(2),
                        HardwareVersion: data.getUint16(3, true),
                        FirmwareVersion: data.getUint16(5, true)
                    });
                }
            },
            onError: params.onError
        });
        return buffer;
    };
});
registerStandardShortGet('getDistance', 161 /* GETHORIZONTAL_CMD */, function (data) {
    return { value: data.getUint16(0, true), unit: data.getUint8(2) };
});
//# sourceMappingURL=short_commands.js.map