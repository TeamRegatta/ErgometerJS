import * as utils from './../utils';
export var RecordingEventType;
(function (RecordingEventType) {
    RecordingEventType[RecordingEventType["startScan"] = 0] = "startScan";
    RecordingEventType[RecordingEventType["scanFoundFn"] = 1] = "scanFoundFn";
    RecordingEventType[RecordingEventType["stopScan"] = 2] = "stopScan";
    RecordingEventType[RecordingEventType["connect"] = 3] = "connect";
    RecordingEventType[RecordingEventType["disconnectFn"] = 4] = "disconnectFn";
    RecordingEventType[RecordingEventType["disconnect"] = 5] = "disconnect";
    RecordingEventType[RecordingEventType["writeCharacteristic"] = 6] = "writeCharacteristic";
    RecordingEventType[RecordingEventType["readCharacteristic"] = 7] = "readCharacteristic";
    RecordingEventType[RecordingEventType["enableNotification"] = 8] = "enableNotification";
    RecordingEventType[RecordingEventType["notificationReceived"] = 9] = "notificationReceived";
    RecordingEventType[RecordingEventType["disableNotification"] = 10] = "disableNotification";
})(RecordingEventType || (RecordingEventType = {}));
var RecordingDriver = /** @class */ (function () {
    function RecordingDriver(performanceMonitor, realDriver) {
        this._events = [];
        this._performanceMonitor = performanceMonitor;
        this._realDriver = realDriver;
    }
    RecordingDriver.prototype.addRecording = function (eventType, data) {
        var newRec = {
            timeStamp: this.getRelativeTime(),
            eventType: RecordingEventType[eventType]
        };
        if (data) {
            newRec.data = data;
        }
        this._events.push(newRec);
        return newRec;
    };
    Object.defineProperty(RecordingDriver.prototype, "events", {
        get: function () {
            return this._events;
        },
        set: function (value) {
            this._events = value;
        },
        enumerable: true,
        configurable: true
    });
    RecordingDriver.prototype.clear = function () {
        this._events = [];
    };
    RecordingDriver.prototype.startRecording = function () {
        this.clear();
        this._startTime = utils.getTime();
    };
    RecordingDriver.prototype.startScan = function (foundFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.startScan);
            _this._realDriver
                .startScan(function (device) {
                _this.addRecording(RecordingEventType.scanFoundFn, {
                    address: device.address,
                    name: device.name,
                    rssi: device.rssi
                });
                foundFn(device);
            })
                .then(_this.recordResolveFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.stopScan = function () {
        this.addRecording(RecordingEventType.stopScan);
        this._realDriver.stopScan();
    };
    RecordingDriver.prototype.connect = function (device, disconnectFn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.connect);
            _this._realDriver
                .connect(device, function () {
                _this.addRecording(RecordingEventType.disconnectFn);
                disconnectFn();
            })
                .then(_this.recordResolveFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.disconnect = function () {
        this.addRecording(RecordingEventType.disconnect);
        this._realDriver.disconnect();
    };
    RecordingDriver.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.writeCharacteristic, {
                serviceUIID: serviceUIID,
                characteristicUUID: characteristicUUID,
                data: utils.typedArrayToHexString(data.buffer)
            });
            _this._realDriver
                .writeCharacteristic(serviceUIID, characteristicUUID, data)
                .then(_this.recordResolveFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.readCharacteristic, {
                serviceUIID: serviceUIID,
                characteristicUUID: characteristicUUID
            });
            _this._realDriver
                .readCharacteristic(serviceUIID, characteristicUUID)
                .then(_this.recordResolveBufferFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.enableNotification, {
                serviceUIID: serviceUIID,
                characteristicUUID: characteristicUUID
            });
            _this._realDriver
                .enableNotification(serviceUIID, characteristicUUID, function (data) {
                _this.addRecording(RecordingEventType.notificationReceived, {
                    serviceUIID: serviceUIID,
                    characteristicUUID: characteristicUUID,
                    data: utils.typedArrayToHexString(data)
                });
                receive(data);
            })
                .then(_this.recordResolveFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rec = _this.addRecording(RecordingEventType.disableNotification, {
                serviceUIID: serviceUIID,
                characteristicUUID: characteristicUUID
            });
            _this._realDriver
                .disableNotification(serviceUIID, characteristicUUID)
                .then(_this.recordResolveFunc(resolve, rec), _this.recordErrorFunc(reject, rec));
        });
    };
    RecordingDriver.prototype.getRelativeTime = function () {
        return utils.getTime() - this._startTime;
    };
    RecordingDriver.prototype.recordResolveFunc = function (resolve, rec) {
        var _this = this;
        return function () {
            rec.timeStampReturn = _this.getRelativeTime();
            resolve();
        };
    };
    RecordingDriver.prototype.recordResolveBufferFunc = function (resolve, rec) {
        var _this = this;
        return function (data) {
            rec.timeStampReturn = _this.getRelativeTime();
            rec.data.data = utils.typedArrayToHexString(data);
            resolve(data);
        };
    };
    RecordingDriver.prototype.recordErrorFunc = function (reject, rec) {
        var _this = this;
        return function (e) {
            rec.timeStampReturn = _this.getRelativeTime();
            rec.error = e;
            reject(e);
        };
    };
    return RecordingDriver;
}());
export { RecordingDriver };
//# sourceMappingURL=RecordingDriver.js.map