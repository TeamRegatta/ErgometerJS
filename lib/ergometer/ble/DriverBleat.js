var DriverBleat = /** @class */ (function () {
    function DriverBleat() {
    }
    DriverBleat.prototype.connect = function (device, disconnectFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var newDevice_1 = device._internalDevice;
                newDevice_1.connect(function () {
                    _this._device = newDevice_1;
                    resolve();
                }, disconnectFn, false, function (e) {
                    reject(e);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.disconnect = function () {
        if (this._device)
            this._device.disconnect();
    };
    DriverBleat.prototype.startScan = function (foundFn) {
        return new Promise(function (resolve, reject) {
            try {
                bleat.startScan(function (device) {
                    foundFn({
                        address: device.address,
                        name: device.name,
                        rssi: device.adData.rssi,
                        _internalDevice: device
                    });
                }, reject);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.stopScan = function () {
        return new Promise(function (resolve, reject) {
            try {
                bleat.stopScan(reject);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var dataView = new DataView(data.buffer);
                _this.getCharacteristic(serviceUIID, characteristicUUID).write(dataView, resolve, reject);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID).read(function (data) {
                    resolve(data.buffer);
                }, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID).enableNotify(function (data) {
                    receive(data.buffer);
                }, resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    DriverBleat.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.getCharacteristic(serviceUIID, characteristicUUID).disableNotify(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // simple wrapper for bleat characteristic functions
    DriverBleat.prototype.getCharacteristic = function (serviceUid, characteristicUid) {
        var service = this._device.services[serviceUid];
        if (service) {
            var found = service.characteristics[characteristicUid];
            if (found)
                return found;
            else {
                throw new Error("characteristics " + characteristicUid + " not found in service " + serviceUid);
            }
        }
        else
            throw new Error("service " + serviceUid + " not found");
    };
    return DriverBleat;
}());
export { DriverBleat };
//# sourceMappingURL=DriverBleat.js.map