/**
 * Created by tijmen on 19-01-16.
 *
 * Extensible frame work so you can add your own csafe commands to the buffer
 *
 */
import { commandManager, registerStandardSet } from './command_core';
import * as utils from './../utils';
commandManager.register(function (buffer, monitor) {
    buffer.getStrokeState = function (params) {
        buffer.addRawCommand({
            waitForResponse: true,
            command: 26 /* SETUSERCFG1_CMD */,
            detailCommand: 191 /* PM_GET_STROKESTATE */,
            onDataReceived: function (data) {
                if (params.onDataReceived)
                    params.onDataReceived(data.getUint8(0));
            },
            onError: params.onError
        });
        return buffer;
    };
});
commandManager.register(function (buffer, monitor) {
    var receivePowerCurvePart = [];
    var currentPowerCurve = [];
    buffer.getPowerCurve = function (params) {
        buffer.addRawCommand({
            waitForResponse: true,
            command: 26 /* SETUSERCFG1_CMD */,
            detailCommand: 107 /* PM_GET_FORCEPLOTDATA */,
            data: [20],
            onError: params.onError,
            onDataReceived: function (data) {
                if (params.onDataReceived) {
                    var bytesReturned = data.getUint8(0); // first byte
                    monitor.traceInfo("received power curve count " + bytesReturned);
                    if (bytesReturned > 0) {
                        for (var i = 1; i < bytesReturned + 1; i += 2) {
                            var value = data.getUint16(i, true); // in ltile endian format
                            receivePowerCurvePart.push(value);
                        }
                        monitor.traceInfo('received part :' + JSON.stringify(receivePowerCurvePart));
                        // try to get another one till it is empty and there is nothing more
                        buffer
                            .clear()
                            .getPowerCurve({ onDataReceived: params.onDataReceived })
                            .send();
                    }
                    else {
                        if (receivePowerCurvePart.length > 0) {
                            currentPowerCurve = receivePowerCurvePart;
                            receivePowerCurvePart = [];
                            monitor.traceInfo('Curve:' + JSON.stringify(currentPowerCurve));
                            if (params.onDataReceived && currentPowerCurve.length > 0) {
                                params.onDataReceived(currentPowerCurve);
                            }
                        }
                    }
                }
            }
        });
        return buffer;
    };
});
registerStandardSet('setProgram', 36 /* SETPROGRAM_CMD */, function (params) {
    return [utils.getByte(params.value, 0), 0];
});
registerStandardSet('setTime', 17 /* SETTIME_CMD */, function (params) {
    return [params.hour, params.minute, params.second];
});
registerStandardSet('setDate', 18 /* SETDATE_CMD */, function (params) {
    return [utils.getByte(params.year, 0), params.month, params.day];
});
registerStandardSet('setTimeout', 19 /* SETTIMEOUT_CMD */, function (params) {
    return [params.value];
});
registerStandardSet('setWork', 32 /* SETTWORK_CMD */, function (params) {
    return [params.hour, params.minute, params.second];
});
registerStandardSet('setDistance', 33 /* SETHORIZONTAL_CMD */, function (params) {
    return [
        utils.getByte(params.value, 0),
        utils.getByte(params.value, 1),
        params.unit
    ];
});
registerStandardSet('setTotalCalories', 35 /* SETCALORIES_CMD */, function (params) {
    return [utils.getByte(params.value, 0), utils.getByte(params.value, 1)];
});
registerStandardSet('setPower', 52 /* SETPOWER_CMD */, function (params) {
    return [
        utils.getByte(params.value, 0),
        utils.getByte(params.value, 1),
        params.unit
    ];
});
//# sourceMappingURL=long_commands.js.map