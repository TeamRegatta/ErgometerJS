import * as ble from './typedefinitions';
import * as ergometer from './../typedefinitions';
import * as utils from './../utils';
export function hasWebBlueTooth() {
    return navigator && typeof navigator.bluetooth !== 'undefined';
}
var DriverWebBlueTooth = /** @class */ (function () {
    function DriverWebBlueTooth(performanceMonitor) {
        this._listenerMap = {};
        // needed to prevent early free of the characteristic
        this._listerCharacteristicMap = {};
        this._performanceMonitor = performanceMonitor;
    }
    DriverWebBlueTooth.prototype.connect = function (device, disconnectFn) {
        var _this = this;
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("connect ");
        }
        return new Promise(function (resolve, reject) {
            try {
                var newDevice_1 = device._internalDevice;
                newDevice_1.gatt
                    .connect()
                    .then(function (server) {
                    _this._device = newDevice_1;
                    _this._server = server;
                    _this._disconnectFn = disconnectFn;
                    newDevice_1.addEventListener('ongattserverdisconnected', _this.onDisconnected.bind(_this));
                    resolve();
                }, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverWebBlueTooth.prototype.disconnect = function () {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("disconnect ");
        }
        if (this._server && this._server.connected)
            this._server.disconnect();
        else
            this.clearConnectionVars();
    };
    DriverWebBlueTooth.prototype.startScan = function (foundFn) {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("startScan ");
        }
        return new Promise(function (resolve, reject) {
            try {
                navigator.bluetooth
                    .requestDevice({
                    filters: [
                        {
                            services: [ble.PMDEVICE]
                        }
                    ],
                    optionalServices: [
                        ble.PMDEVICE_INFO_SERVICE,
                        ble.PMCONTROL_SERVICE,
                        ble.PMROWING_SERVICE
                    ]
                })
                    .then(function (device) {
                    foundFn({
                        address: device.id,
                        name: device.name,
                        rssi: typeof device.adData !== 'undefined' && device.adData.rssi
                            ? device.adData.rssi
                            : 0,
                        _internalDevice: device
                    });
                })
                    .then(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverWebBlueTooth.prototype.stopScan = function () {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("stopScan ");
        }
        if (typeof navigator.bluetooth.cancelRequest !== 'undefined') {
            return navigator.bluetooth.cancelRequest();
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };
    DriverWebBlueTooth.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
        var _this = this;
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("writeCharacteristic " + characteristicUUID + " : " + data + " ");
        }
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID)
                    .then(function (characteristic) {
                    return characteristic.writeValue(data.buffer);
                })
                    .then(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverWebBlueTooth.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
        var _this = this;
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("readCharacteristic " + characteristicUUID + "  ");
        }
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID)
                    .then(function (characteristic) {
                    return characteristic.readValue();
                })
                    .then(function (data) {
                    if (_this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        _this._performanceMonitor.traceInfo("doReadCharacteristic " + characteristicUUID + " : " + utils.typedArrayToHexString(data.buffer) + " ");
                    }
                    resolve(data.buffer);
                }, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverWebBlueTooth.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
        var _this = this;
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("enableNotification " + characteristicUUID + "  ");
        }
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID)
                    .then(function (characteristic) {
                    return characteristic.startNotifications().then(function (_) {
                        _this._listenerMap[characteristicUUID] = receive;
                        // bug fix: this prevents the chracteristic from being free-ed
                        _this._listerCharacteristicMap[characteristicUUID] = characteristic;
                        characteristic.addEventListener('characteristicvaluechanged', _this.onCharacteristicValueChanged.bind(_this));
                        resolve();
                    }, reject);
                })
                    .then(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverWebBlueTooth.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
        var _this = this;
        // only disable when receive is
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("disableNotification " + characteristicUUID + "  ");
        }
        return new Promise(function (resolve, reject) {
            try {
                if (typeof _this._listenerMap[characteristicUUID] !== 'undefined' &&
                    _this._listenerMap[characteristicUUID]) {
                    _this.getCharacteristic(serviceUIID, characteristicUUID).then(function (characteristic) {
                        characteristic.stopNotifications().then(function () {
                            _this._listenerMap[characteristic.uuid] = null;
                            _this._listerCharacteristicMap[characteristic.uuid] = null;
                            characteristic.removeEventListener('characteristicvaluechanged', _this.onCharacteristicValueChanged);
                            resolve();
                        }, reject);
                    });
                }
                else
                    resolve(); // just resolve nothing to do
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // simple wrapper for bleat characteristic functions
    DriverWebBlueTooth.prototype.getCharacteristic = function (serviceUid, characteristicUid) {
        var _this = this;
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("getCharacteristic " + characteristicUid + " ");
        }
        return new Promise(function (resolve, reject) {
            if (!_this._server || !_this._server.connected) {
                reject('server not connected');
            }
            else {
                _this._server
                    .getPrimaryService(serviceUid)
                    .then(function (service) {
                    return service.getCharacteristic(characteristicUid);
                })
                    .then(resolve, reject);
            }
        });
    };
    DriverWebBlueTooth.prototype.onDisconnected = function (event) {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("onDisconnected ");
        }
        if (this._disconnectFn)
            this._disconnectFn();
        this.clearConnectionVars();
    };
    DriverWebBlueTooth.prototype.clearConnectionVars = function () {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("clearConnectionVars ");
        }
        if (this._device) {
            this._device.removeEventListener('ongattserverdisconnected', this.onDisconnected);
        }
        this._device = null;
        this._server = null;
        this._disconnectFn = null;
        this._listenerMap = {};
        this._listerCharacteristicMap = {};
    };
    DriverWebBlueTooth.prototype.onCharacteristicValueChanged = function (event) {
        if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo("onCharacteristicValueChanged " + event.target.uuid + " : " + utils.typedArrayToHexString(event.target.value.buffer) + " ");
        }
        try {
            var func = this._listenerMap[event.target.uuid];
            if (func)
                func(event.target.value.buffer);
        }
        catch (e) {
            if (this._performanceMonitor) {
                this._performanceMonitor.handleError(e.toString());
            }
            else
                throw e;
        }
    };
    return DriverWebBlueTooth;
}());
export { DriverWebBlueTooth };
//# sourceMappingURL=DriverWebBlueTooth.js.map