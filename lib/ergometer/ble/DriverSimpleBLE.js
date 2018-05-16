var DriverSimpleBLE = /** @class */ (function () {
    function DriverSimpleBLE() {
    }
    DriverSimpleBLE.prototype.connect = function (device, disconnectFn) {
        return new Promise(function (resolve, reject) {
            // simpleBLE.connect("");
        });
    };
    DriverSimpleBLE.prototype.disconnect = function () {
        simpleBLE.disconnect();
    };
    DriverSimpleBLE.prototype.startScan = function (foundFn) {
        return new Promise(function (resolve, reject) {
            // simpleBLE.scan();
        });
    };
    DriverSimpleBLE.prototype.stopScan = function () {
        return new Promise(function (resolve, reject) { return ({}); });
    };
    DriverSimpleBLE.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
        return new Promise(function (resolve, reject) { return ({}); });
    };
    DriverSimpleBLE.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
        return new Promise(function (resolve, reject) { return ({}); });
    };
    DriverSimpleBLE.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
        return new Promise(function (resolve, reject) { return ({}); });
    };
    DriverSimpleBLE.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
        return new Promise(function (resolve, reject) { return ({}); });
    };
    return DriverSimpleBLE;
}());
export { DriverSimpleBLE };
//# sourceMappingURL=DriverSimpleBLE.js.map