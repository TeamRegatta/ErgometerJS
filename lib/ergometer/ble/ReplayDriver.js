import { RecordingEventType } from './RecordingDriver';
import * as ergometer from './../typedefinitions';
import * as utils from './../utils';
var ReplayDriver = /** @class */ (function () {
    function ReplayDriver(performanceMonitor, realDriver) {
        this._events = [];
        this._eventCallBackMethods = [];
        this._eventCallbacks = [];
        this._playing = false;
        this._eventIndex = 0;
        this._checkQueueTimerId = null;
        this._performanceMonitor = performanceMonitor;
        this._realDriver = realDriver;
    }
    Object.defineProperty(ReplayDriver.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    ReplayDriver.prototype.replay = function (events) {
        this._playing = false;
        this._startTime = utils.getTime();
        this._events = events;
        this._eventIndex = 0;
        this.playing = true;
    };
    Object.defineProperty(ReplayDriver.prototype, "playing", {
        get: function () {
            return this._playing;
        },
        set: function (value) {
            if (this._playing !== value) {
                this._playing = value;
                if (!value) {
                    this._eventCallBackMethods = [];
                    this._eventCallbacks = [];
                    this._performanceMonitor.disconnect();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ReplayDriver.prototype.startScan = function (foundFn) {
        var _this = this;
        this.addEvent(RecordingEventType.scanFoundFn, false, foundFn);
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.startScan, true, resolve, reject);
        });
    };
    ReplayDriver.prototype.stopScan = function () {
        this.addEvent(RecordingEventType.stopScan, true);
    };
    ReplayDriver.prototype.connect = function (device, disconnectFn) {
        var _this = this;
        this.addEvent(RecordingEventType.disconnectFn, false, disconnectFn);
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.connect, true, resolve, reject);
        });
    };
    ReplayDriver.prototype.disconnect = function () {
        this.addEvent(RecordingEventType.disconnect, true);
    };
    ReplayDriver.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.writeCharacteristic, true, resolve, reject, serviceUIID, characteristicUUID);
        });
    };
    ReplayDriver.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.readCharacteristic, true, resolve, reject, serviceUIID, characteristicUUID);
        });
    };
    ReplayDriver.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
        var _this = this;
        this.addEvent(RecordingEventType.notificationReceived, false, receive, null, serviceUIID, characteristicUUID);
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.enableNotification, true, resolve, reject, serviceUIID, characteristicUUID);
        });
    };
    ReplayDriver.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.addEvent(RecordingEventType.disableNotification, true, resolve, reject, serviceUIID, characteristicUUID);
        });
    };
    ReplayDriver.prototype.getRelativeTime = function () {
        return utils.getTime() - this._startTime;
    };
    ReplayDriver.prototype.isCallBack = function (eventType) {
        return (eventType === RecordingEventType.scanFoundFn ||
            eventType === RecordingEventType.disconnectFn ||
            eventType === RecordingEventType.notificationReceived);
    };
    ReplayDriver.prototype.isSameEvent = function (event1, event2) {
        var result = event1.eventType === event2.eventType;
        if (result &&
            utils.isDefined(event1.data) &&
            utils.isDefined(event2.data) &&
            event1.data &&
            event2.data) {
            var data1 = event1.data;
            var data2 = event2.data;
            if (result &&
                (utils.isDefined(data1.serviceUIID) ||
                    utils.isDefined(data2.serviceUIID))) {
                result = data1.serviceUIID === data2.serviceUIID;
            }
            if (result &&
                (utils.isDefined(data1.characteristicUUID) ||
                    utils.isDefined(data2.characteristicUUID))) {
                result = data1.characteristicUUID === data2.characteristicUUID;
            }
        }
        return result;
    };
    ReplayDriver.prototype.runEvent = function (event, queuedEvent) {
        if (this._performanceMonitor.logLevel >= ergometer.LogLevel.trace) {
            this._performanceMonitor.traceInfo('run event:' + JSON.stringify(event));
        }
        if (event.error) {
            queuedEvent.reject(event.error);
        }
        else {
            var data = null;
            if (event.data) {
                data = event.data;
                var eventType = RecordingEventType[event.eventType];
                if (eventType === RecordingEventType.readCharacteristic ||
                    eventType === RecordingEventType.notificationReceived) {
                    data = utils.hexStringToTypedArray(data.data).buffer;
                }
            }
            if (queuedEvent.resolve) {
                try {
                    if (data)
                        queuedEvent.resolve(data);
                    else
                        queuedEvent.resolve();
                }
                catch (e) {
                    // do not let it stop on replay errors, just continue and log
                    this._performanceMonitor.handleError('Error: while replaying event' + e);
                }
            }
        }
    };
    ReplayDriver.prototype.runTimedEvent = function (event, queuedEvent) {
        var _this = this;
        setTimeout(function () {
            _this.runEvent(event, queuedEvent);
        }, queuedEvent.timeStamp - event.timeStamp);
    };
    ReplayDriver.prototype.removeEvent = function (i) {
        this._events.splice(i, 1);
    };
    ReplayDriver.prototype.checkQueue = function () {
        var _this = this;
        var keepChecking = true;
        var _loop_1 = function () {
            keepChecking = false; // by default do not keep on checking
            var event_1 = this_1._events[0];
            if (this_1.isCallBack(RecordingEventType[event_1.eventType])) {
                // run call backs directly on the given time
                if (event_1.timeStamp <= this_1.getRelativeTime()) {
                    var found_1 = false;
                    this_1._eventCallbacks.forEach(function (callbackEvent) {
                        if (_this.isSameEvent(event_1, callbackEvent)) {
                            _this.runEvent(event_1, callbackEvent);
                            keepChecking = true;
                            found_1 = true;
                        }
                    });
                    if (found_1)
                        this_1.removeEvent(0);
                }
            }
            else {
                if (this_1._eventCallBackMethods.length > 0) {
                    for (var i = 0; i < this_1._eventCallBackMethods.length; i++) {
                        var eventQueued = this_1._eventCallBackMethods[i];
                        if (this_1.isSameEvent(eventQueued, event_1)) {
                            this_1._eventCallBackMethods.splice(i, 1);
                            this_1.removeEvent(0);
                            keepChecking = true;
                            if (event_1.timeStamp <= eventQueued.timeStamp) {
                                this_1.runEvent(event_1, eventQueued);
                            }
                            else
                                this_1.runTimedEvent(event_1, eventQueued);
                            break;
                        }
                    }
                }
            }
        };
        var this_1 = this;
        while (keepChecking &&
            this._events.length > 0 &&
            this._events[0].timeStamp <= this.getRelativeTime()) {
            _loop_1();
        }
        if (this._events.length > 0) {
            var event_2 = this._events[0];
            this.timeNextCheck(event_2.timeStamp);
        }
        this.checkAllEventsProcessd();
    };
    ReplayDriver.prototype.checkAllEventsProcessd = function () {
        var allDone = this.events.length === 0 && this._eventCallBackMethods.length === 0;
        if (allDone && this.playing) {
            this.playing = false;
        }
        return allDone;
    };
    ReplayDriver.prototype.timeNextCheck = function (timeStamp) {
        var _this = this;
        if (this._checkQueueTimerId) {
            window.clearTimeout(this._checkQueueTimerId);
            this._checkQueueTimerId = null;
        }
        var duration = 0;
        if (timeStamp) {
            duration = this.getRelativeTime() - timeStamp;
            if (duration === 0)
                duration = 100;
        }
        this._checkQueueTimerId = window.setTimeout(function () {
            _this.checkQueue();
        }, duration);
    };
    ReplayDriver.prototype.addEvent = function (eventType, isMethod, resolve, reject, serviceUIID, characteristicUUID) {
        var event = {
            timeStamp: this.getRelativeTime(),
            eventType: RecordingEventType[eventType]
        };
        if (resolve)
            event.resolve = resolve;
        if (reject)
            event.reject = reject;
        if (serviceUIID || characteristicUUID) {
            var data = {
                serviceUIID: serviceUIID,
                characteristicUUID: characteristicUUID
            };
            event.data = data;
        }
        if (isMethod) {
            this._eventCallBackMethods.push(event);
        }
        else {
            this._eventCallbacks.push(event);
            this.timeNextCheck();
        }
    };
    return ReplayDriver;
}());
export { ReplayDriver };
//# sourceMappingURL=ReplayDriver.js.map