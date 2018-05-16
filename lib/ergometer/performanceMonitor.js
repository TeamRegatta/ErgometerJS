/**
 * Concept 2 ergometer Performance Monitor api for Cordova
 *
 * This will will work with the PM5
 *
 * Created by tijmen on 01-06-15.
 * License:
 *
 * Copyright 2016 Tijmen van Gulik (tijmen@vangulik.org)
 * Copyright 2016 Tijmen van Gulik (tijmen@vangulik.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as pubSub from './pubsub';
import * as recordingDriver from './ble/RecordingDriver';
import * as replayDriver from './ble/ReplayDriver';
import { hasWebBlueTooth, DriverWebBlueTooth } from './ble/DriverWebBlueTooth';
import { DriverBleat } from './ble/DriverBleat';
import { DriverSimpleBLE } from './ble/DriverSimpleBLE';
import { commandManager } from './csafe/command_core';
import * as utils from './utils';
import * as ergometer from './typedefinitions';
import * as ble from './ble/typedefinitions';
import * as csafe from './csafe/typedefinitions';
/**
 *
 * Usage:
 *
 * Create this class to acess the performance data
 *   var performanceMonitor= new ergometer.PerformanceMonitor();
 *
 * after this connect to the events to get data
 *   performanceMonitor.rowingGeneralStatusEvent.sub(this,this.onRowingGeneralStatus);
 * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
 * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
 * the documentation in the properties You must set the multi plex property before connecting
 *   performanceMonitor.multiplex=true;
 *
 * to start the connection first start scanning for a device,
 * you should call when the cordova deviceready event is called (or later)
 *   performanceMonitor.startScan((device : ergometer.DeviceInfo) : boolean => {
 *      //return true when you want to connect to the device
 *       return device.name=='My device name';
 *   });
 *  to connect at at a later time
 *    performanceMonitor.connectToDevice('my device name');
 *  the devices which where found during the scan are collected in
 *    performanceMonitor.devices
 *  when you connect to a device the scan is stopped, when you want to stop the scan earlier you need to call
 *    performanceMonitor.stopScan
 *
 */
var PerformanceMonitor = /** @class */ (function () {
    /**
     * To work with this class you will need to create it.
     */
    function PerformanceMonitor(opts) {
        if (opts === void 0) { opts = {}; }
        this._connectionState = ergometer.MonitorConnectionState.inactive;
        // events
        this._logEvent = new pubSub.Event();
        this._connectionStateChangedEvent = new pubSub.Event();
        this._devices = [];
        this._multiplex = false;
        this._multiplexSubscribeCount = 0;
        this._sampleRate = 1 /* rate500ms */;
        this._autoReConnect = true;
        this._logLevel = ergometer.LogLevel.error;
        this._csafeBuffer = null;
        this._waitResponseCommands = [];
        this._generalStatusEventAttachedByPowerCurve = false;
        this._recording = false;
        this.initialize(opts.driver);
    }
    Object.defineProperty(PerformanceMonitor.prototype, "recordingDriver", {
        get: function () {
            if (!this._recordingDriver) {
                this._recordingDriver = new recordingDriver.RecordingDriver(this, this._driver);
            }
            return this._recordingDriver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "recording", {
        get: function () {
            return this._recording;
        },
        set: function (value) {
            this._recording = value;
            if (value)
                this.recordingDriver.startRecording();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "replayDriver", {
        get: function () {
            if (!this._replayDriver) {
                this._replayDriver = new replayDriver.ReplayDriver(this, this._driver);
            }
            return this._replayDriver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "replaying", {
        get: function () {
            return this.replayDriver.playing;
        },
        set: function (value) {
            this.replayDriver.playing = value;
        },
        enumerable: true,
        configurable: true
    });
    PerformanceMonitor.prototype.replay = function (events) {
        this.replayDriver.replay(events);
    };
    Object.defineProperty(PerformanceMonitor.prototype, "recordingEvents", {
        get: function () {
            return this.recordingDriver.events;
        },
        set: function (value) {
            this.recordingDriver.events = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "driver", {
        get: function () {
            if (this.recording) {
                return this.recordingDriver;
            }
            else if (this.replaying)
                return this.replayDriver;
            else
                return this._driver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "logLevel", {
        /**
         * By default it the logEvent will return errors if you want more debug change the log level
         * @returns {LogLevel}
         */
        get: function () {
            return this._logLevel;
        },
        /**
         * By default it the logEvent will return errors if you want more debug change the log level
         * @param value
         */
        set: function (value) {
            this._logLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "autoReConnect", {
        /**
         * when the connection is lost re-connect
         * @returns {boolean}
         */
        get: function () {
            return this._autoReConnect;
        },
        /**
         *
         * when the connection is lost re-connect
         * @param value
         */
        set: function (value) {
            this._autoReConnect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "multiplex", {
        /**
         * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
         * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
         * the documentation in the properties You must set the multi plex property before connecting
         *
         * @returns {boolean}
         */
        get: function () {
            return this._multiplex;
        },
        /**
         * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
         * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
         * the documentation in the properties You must set the multi plex property before connecting
         * @param value
         */
        set: function (value) {
            if (value !== this._multiplex) {
                if (this.connectionState >= ergometer.MonitorConnectionState.servicesFound) {
                    throw new Error('property multiplex can not be changed after the connection is made.');
                }
                this._multiplex = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "devices", {
        /**
         * an array of of performance monitor devices which where found during the scan.
         * the array is sorted by connection quality (best on top)
         *
         * @returns {DeviceInfo[]}
         */
        get: function () {
            return this._devices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingGeneralStatus", {
        /**
         * The values of the last rowingGeneralStatus event
         *
         * @returns {ergometer.RowingGeneralStatus}
         */
        get: function () {
            return this._rowingGeneralStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStatus1", {
        /**
         * The values of the last rowingAdditionalStatus1 event
         * @returns {ergometer.RowingAdditionalStatus1}
         */
        get: function () {
            return this._rowingAdditionalStatus1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStatus2", {
        /**
         * The values of the last RowingAdditionalStatus2 event
         * @returns {ergometer.RowingAdditionalStatus2}
         */
        get: function () {
            return this._rowingAdditionalStatus2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingStrokeData", {
        /**
         *  The values of the last rowingStrokeData event
         * @returns {ergometer.RowingStrokeData}
         */
        get: function () {
            return this._rowingStrokeData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStrokeData", {
        /**
         * The values of the last rowingAdditionalStrokeData event
         * @returns {ergometer.RowingAdditionalStrokeData}
         */
        get: function () {
            return this._rowingAdditionalStrokeData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingSplitIntervalData", {
        /**
         * The values of the last rowingSplitIntervalData event
         * @returns {ergometer.RowingSplitIntervalData}
         */
        get: function () {
            return this._rowingSplitIntervalData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalSplitIntervalData", {
        /**
         * The values of the last rowingAdditionalSplitIntervalData event
         * @returns {ergometer.RowingAdditionalSplitIntervalData}
         */
        get: function () {
            return this._rowingAdditionalSplitIntervalData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "workoutSummaryData", {
        /**
         * The values of the last workoutSummaryData event
         * @returns {ergometer.WorkoutSummaryData}
         */
        get: function () {
            return this._workoutSummaryData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "additionalWorkoutSummaryData", {
        /**
         * The values of the last additionalWorkoutSummaryData event
         * @returns {ergometer.AdditionalWorkoutSummaryData}
         */
        get: function () {
            return this._additionalWorkoutSummaryData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "additionalWorkoutSummaryData2", {
        /**
         * The values of the last AdditionalWorkoutSummaryData2 event
         * @returns {ergometer.AdditionalWorkoutSummaryData2}
         */
        get: function () {
            return this._additionalWorkoutSummaryData2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "heartRateBeltInformation", {
        /**
         * The values of the last heartRateBeltInformation event
         * @returns {ergometer.HeartRateBeltInformation}
         */
        get: function () {
            return this._heartRateBeltInformation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingGeneralStatusEvent", {
        /**
         * read rowingGeneralStatus data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingGeneralStatusEvent>}
         */
        get: function () {
            return this._rowingGeneralStatusEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStatus1Event", {
        /**
         * read rowingGeneralStatus1 data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingAdditionalStatus1Event>}
         */
        get: function () {
            return this._rowingAdditionalStatus1Event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStatus2Event", {
        /**
         * read rowingAdditionalStatus2 data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingAdditionalStatus2Event>}
         */
        get: function () {
            return this._rowingAdditionalStatus2Event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingStrokeDataEvent", {
        /**
         * read rowingStrokeData data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingStrokeDataEvent>}
         */
        get: function () {
            return this._rowingStrokeDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalStrokeDataEvent", {
        /**
         * read rowingAdditionalStrokeData data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingAdditionalStrokeDataEvent>}
         */
        get: function () {
            return this._rowingAdditionalStrokeDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingSplitIntervalDataEvent", {
        /**
         * read rowingSplitIntervalDat data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingSplitIntervalDataEvent>}
         */
        get: function () {
            return this._rowingSplitIntervalDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "rowingAdditionalSplitIntervalDataEvent", {
        /**
         * read rowingAdditionalSplitIntervalData data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.RowingAdditionalSplitIntervalDataEvent>}
         */
        get: function () {
            return this._rowingAdditionalSplitIntervalDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "workoutSummaryDataEvent", {
        /**
         * read workoutSummaryData data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.WorkoutSummaryDataEvent>}
         */
        get: function () {
            return this._workoutSummaryDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "additionalWorkoutSummaryDataEvent", {
        /**
         * read additionalWorkoutSummaryData data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryDataEvent>}
         */
        get: function () {
            return this._additionalWorkoutSummaryDataEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "additionalWorkoutSummaryData2Event", {
        /**
         * read additionalWorkoutSummaryData2 data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryData2Event>}
         */
        get: function () {
            return this._additionalWorkoutSummaryData2Event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "heartRateBeltInformationEvent", {
        /**
         * read heartRateBeltInformation data
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ergometer.HeartRateBeltInformationEvent>}
         */
        get: function () {
            return this._heartRateBeltInformationEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "powerCurveEvent", {
        get: function () {
            return this._powerCurveEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "connectionStateChangedEvent", {
        /**
         * event which is called when the connection state is changed. For example this way you
         * can check if the device is disconnected.
         * connect to the using .sub(this,myFunction)
         * @returns {pubSub.Event<ConnectionStateChangedEvent>}
         */
        get: function () {
            return this._connectionStateChangedEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "logEvent", {
        /**
         * returns error and other log information. Some errors can only be received using the logEvent
         * @returns {pubSub.Event<LogEvent>}
         */
        get: function () {
            return this._logEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "powerCurve", {
        get: function () {
            return this._powerCurve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "deviceInfo", {
        /**
         * Get device information of the connected device.
         * @returns {DeviceInfo}
         */
        get: function () {
            return this._deviceInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceMonitor.prototype, "sampleRate", {
        /**
         * read the performance montitor sample rate. By default this is 500 ms
         * @returns {number}
         */
        get: function () {
            return this._sampleRate;
        },
        /**
         * Change the performance monitor sample rate.
         * @param value
         */
        set: function (value) {
            var _this = this;
            if (value !== this._sampleRate) {
                var dataView = new DataView(new ArrayBuffer(1));
                dataView.setUint8(0, value);
                this.driver
                    .writeCharacteristic(ble.PMROWING_SERVICE, ble.ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC, dataView)
                    .then(function () {
                    _this._sampleRate = value;
                }, this.getErrorHandlerFunc('Can not set sample rate'));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * disconnect the current connected device
     */
    PerformanceMonitor.prototype.disconnect = function () {
        if (this.connectionState >= ergometer.MonitorConnectionState.deviceReady) {
            this.driver.disconnect();
            this._connectionState = ergometer.MonitorConnectionState.deviceReady;
        }
    };
    Object.defineProperty(PerformanceMonitor.prototype, "connectionState", {
        /**
         * read the current connection state
         * @returns {ergometer.MonitorConnectionState}
         */
        get: function () {
            return this._connectionState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Print debug info to console and application UI.
     * @param info
     */
    PerformanceMonitor.prototype.traceInfo = function (info) {
        if (this.logLevel >= ergometer.LogLevel.trace) {
            this.logEvent.pub(info, ergometer.LogLevel.trace);
        }
    };
    /**
     *
     * @param info
     */
    PerformanceMonitor.prototype.debugInfo = function (info) {
        if (this.logLevel >= ergometer.LogLevel.debug) {
            this.logEvent.pub(info, ergometer.LogLevel.debug);
        }
    };
    /**
     *
     * @param info
     */
    PerformanceMonitor.prototype.showInfo = function (info) {
        if (this.logLevel >= ergometer.LogLevel.info) {
            this.logEvent.pub(info, ergometer.LogLevel.info);
        }
    };
    /**
     * call the global error hander and call the optional error handler if given
     * @param error
     */
    PerformanceMonitor.prototype.handleError = function (error, errorFn) {
        if (this.logLevel >= ergometer.LogLevel.error) {
            this.logEvent.pub(error, ergometer.LogLevel.error);
        }
        if (errorFn)
            errorFn(error);
    };
    /**
     * Get an error function which adds the errorDescription to the error ,cals the global and an optional local funcion
     * @param errorDescription
     * @param errorFn
     */
    PerformanceMonitor.prototype.getErrorHandlerFunc = function (errorDescription, errorFn) {
        var _this = this;
        return function (e) {
            _this.handleError(errorDescription + ':' + e.toString(), errorFn);
        };
    };
    /**
     *
     */
    PerformanceMonitor.prototype.stopScan = function () {
        if (this.connectionState === ergometer.MonitorConnectionState.scanning) {
            this.driver.stopScan();
        }
    };
    /**
     * Scan for device use the deviceFound to connect .
     * @param deviceFound
     */
    PerformanceMonitor.prototype.startScan = function (deviceFound, errorFn) {
        var _this = this;
        this._devices = [];
        // Call stop before you start, just in case something else is running.
        this.stopScan();
        this.changeConnectionState(ergometer.MonitorConnectionState.scanning);
        return this.driver
            .startScan(function (device) {
            // Do not show un-named devices.
            if (!device.name) {
                return;
            }
            // Print "name : mac address" for every device found.
            _this.debugInfo(device.name +
                ' : ' +
                device.address
                    .toString()
                    .split(':')
                    .join(''));
            // If my device is found connect to it.
            // find any thing starting with PM and then a number a space and a serial number
            if (device.name.match(/PM\d \d*/g)) {
                _this.showInfo('Status: ergometer.DeviceInfo found: ' + device.name);
                var deviceInfo = {
                    connected: false,
                    _internalDevice: device,
                    name: device.name,
                    address: device.address,
                    quality: 2 * (device.rssi + 100)
                };
                _this.addDevice(deviceInfo);
                if (deviceFound(deviceInfo)) {
                    _this.connectToDevice(deviceInfo.name);
                }
            }
        })
            .then(function () {
            _this.showInfo('Status: Scanning...');
        })
            .catch(this.getErrorHandlerFunc('Scan error', errorFn));
    };
    /**
     * connect to a specific device. This should be a PM5 device which is found by the startScan. You can
     * only call this function after startScan is called. Connection to a device will stop the scan.
     * @param deviceName
     */
    PerformanceMonitor.prototype.connectToDevice = function (deviceName) {
        var _this = this;
        this.showInfo('Status: Connecting...');
        this.stopScan();
        this.changeConnectionState(ergometer.MonitorConnectionState.connecting);
        var deviceInfo = this.findDevice(deviceName);
        if (!deviceInfo)
            throw new Error("Device " + deviceName + " not found");
        this._deviceInfo = deviceInfo;
        return this.driver
            .connect(deviceInfo._internalDevice, function () {
            _this.changeConnectionState(ergometer.MonitorConnectionState.deviceReady);
            _this.showInfo('Disconnected');
            if (_this.autoReConnect) {
                _this.startScan(function (device) {
                    return device.name === deviceName;
                });
            }
        })
            .then(function () {
            _this.changeConnectionState(ergometer.MonitorConnectionState.connected);
            _this.showInfo('Status: Connected');
            return _this.readPheripheralInfo();
        })
            .then(function () {
            // Debug logging of all services, characteristics and descriptors
            // reported by the BLE board.
            _this.deviceConnected();
        })
            .catch(function (errorCode) {
            _this.changeConnectionState(ergometer.MonitorConnectionState.deviceReady);
            _this.handleError(errorCode);
        });
    };
    /****************************************************************************************
     *                               csafe
     *****************************************************************************************  */
    /**
     *  send everyt thing which is put into the csave buffer
     *
     * @param success
     * @param error
     * @returns {Promise<void>|Promise} use promis instead of success and error function
     */
    PerformanceMonitor.prototype.sendCSafeBuffer = function () {
        var _this = this;
        this.removeOldSendCommands();
        // prepare the array to be send
        var rawCommandBuffer = this.csafeBuffer.rawCommands;
        var commandArray = [];
        rawCommandBuffer.forEach(function (command) {
            commandArray.push(command.command);
            if (command.command >= csafe.CTRL_CMD_SHORT_MIN) {
                // it is an short command
                if (command.detailCommand || command.data) {
                    throw new Error('short commands can not contain data or a detail command');
                }
            }
            else {
                if (command.detailCommand) {
                    var dataLength = 1;
                    if (command.data && command.data.length > 0) {
                        dataLength = dataLength + command.data.length + 1;
                    }
                    commandArray.push(dataLength); // length for the short command
                    // the detail command
                    commandArray.push(command.detailCommand);
                }
                // the data
                if (command.data && command.data.length > 0) {
                    commandArray.push(command.data.length);
                    commandArray = commandArray.concat(command.data);
                }
            }
        });
        this.csafeBuffer.clear();
        // send all the csafe commands in one go
        return this.sendCsafeCommands(commandArray).then(function () {
            rawCommandBuffer.forEach(function (command) {
                command._timestamp = new Date().getTime();
                if (command.waitForResponse) {
                    _this._waitResponseCommands.push(command);
                }
            });
        }, function (e) {
            rawCommandBuffer.forEach(function (command) {
                if (command.onError)
                    command.onError(e);
            });
        });
    };
    PerformanceMonitor.prototype.receivedCSaveCommand = function (parsed) {
        // check on all the commands which where send and
        for (var i = 0; i < this._waitResponseCommands.length; i++) {
            var command = this._waitResponseCommands[i];
            if (command.command === parsed.command &&
                (command.detailCommand === parsed.detailCommand ||
                    (!command.detailCommand && !parsed.detailCommand))) {
                if (command.onDataReceived) {
                    var dataView = new DataView(parsed.data.buffer);
                    command.onDataReceived(dataView);
                }
                this._waitResponseCommands.splice(i, 1); // remove the item from the send list
                break;
            }
        }
    };
    PerformanceMonitor.prototype.handleCSafeNotifications = function () {
        var _this = this;
        var commandData;
        var commandDataIndex = 0;
        var frameState = 0 /* initial */;
        var nextDataLength = 0;
        var detailCommand = 0;
        var calcCheck = 0;
        var command = 0;
        var skippByte = 0;
        this.traceInfo('enable notifications csafe');
        this.driver
            .enableNotification(ble.PMCONTROL_SERVICE, ble.RECEIVE_FROM_PM_CHARACTERISIC, function (data) {
            var dataView = new DataView(data);
            // skipp empty 0 ble blocks
            if (dataView.byteLength !== 1 || dataView.getUint8(0) !== 0) {
                if (frameState === 0 /* initial */) {
                    commandData = null;
                    commandDataIndex = 0;
                    frameState = 0 /* initial */;
                    nextDataLength = 0;
                    detailCommand = 0;
                    calcCheck = 0;
                }
                _this.traceInfo('continious receive csafe: ' + utils.typedArrayToHexString(data));
                var i = 0;
                var stop_1 = false;
                while (i < dataView.byteLength && !stop_1) {
                    var currentByte = dataView.getUint8(i);
                    if (frameState !== 0 /* initial */) {
                        calcCheck = calcCheck ^ currentByte; // xor for a simple crc check
                    }
                    switch (frameState) {
                        case 0 /* initial */: {
                            // expect a start frame
                            if (currentByte !== csafe.FRAME_START_BYTE) {
                                stop_1 = true;
                                if (_this.logLevel === ergometer.LogLevel.trace) {
                                    _this.traceInfo('stop byte ' + utils.toHexString(currentByte, 1));
                                }
                            }
                            else
                                frameState = 1 /* skippByte */;
                            calcCheck = 0;
                            break;
                        }
                        case 1 /* skippByte */: {
                            // skipp this one
                            frameState = 2 /* parseCommand */;
                            skippByte = currentByte;
                            break;
                        }
                        case 2 /* parseCommand */: {
                            command = currentByte;
                            frameState = 3 /* parseCommandLength */;
                            break;
                        }
                        case 3 /* parseCommandLength */: {
                            // first work arround strange results where the skipp byte is the same
                            // as the the command and the frame directly ends, What is the meaning of
                            // this? some kind of status??
                            if (skippByte === command &&
                                currentByte === csafe.FRAME_END_BYTE) {
                                command = 0; // do not check checksum
                                frameState = 0 /* initial */; // start again from te beginning
                            }
                            else if (i === dataView.byteLength - 1 &&
                                currentByte === csafe.FRAME_END_BYTE) {
                                var checksum = command;
                                // remove the last 2 bytes from the checksum which was added too much
                                calcCheck = calcCheck ^ currentByte;
                                calcCheck = calcCheck ^ command;
                                // check the calculated with the message checksum
                                if (checksum !== calcCheck) {
                                    _this.handleError("Wrong checksum " + utils.toHexString(checksum, 1) + " expected " + utils.toHexString(calcCheck, 1) + " ");
                                }
                                command = 0; // do not check checksum
                                frameState = 0 /* initial */; // start again from te beginning
                            }
                            else if (i < dataView.byteLength) {
                                nextDataLength = currentByte;
                                if (command >= csafe.CTRL_CMD_SHORT_MIN) {
                                    frameState = 6 /* parseCommandData */;
                                }
                                else
                                    frameState = 4 /* parseDetailCommand */;
                            }
                            break;
                        }
                        case 4 /* parseDetailCommand */: {
                            detailCommand = currentByte;
                            frameState = 5 /* parseDetailCommandLength */;
                            break;
                        }
                        case 5 /* parseDetailCommandLength */: {
                            nextDataLength = currentByte;
                            frameState = 6 /* parseCommandData */;
                            break;
                        }
                        case 6 /* parseCommandData */: {
                            if (!commandData) {
                                commandDataIndex = 0;
                                commandData = new Uint8Array(nextDataLength);
                            }
                            commandData[commandDataIndex] = currentByte;
                            nextDataLength--;
                            commandDataIndex++;
                            if (nextDataLength === 0) {
                                frameState = 2 /* parseCommand */;
                                try {
                                    _this.receivedCSaveCommand({
                                        command: command,
                                        detailCommand: detailCommand,
                                        data: commandData
                                    });
                                }
                                catch (e) {
                                    _this.handleError(e); // never const the receive crash the main loop
                                }
                                commandData = null;
                                detailCommand = 0;
                            }
                            break;
                        }
                    }
                    if (_this.logLevel === ergometer.LogLevel.trace) {
                        _this.traceInfo("parse: " + i + ": " + utils.toHexString(currentByte, 1) + " state: " + frameState + " checksum:" + utils.toHexString(calcCheck, 1) + " ");
                    }
                    i++;
                }
                // when something went wrong, the bluetooth block is endend but the frame not
                if (dataView.byteLength !== ble.PACKET_SIZE &&
                    frameState !== 0 /* initial */) {
                    frameState = 0 /* initial */;
                    _this.handleError('wrong csafe frame ending.');
                }
            }
        })
            .catch(this.getErrorHandlerFunc(''));
    };
    Object.defineProperty(PerformanceMonitor.prototype, "csafeBuffer", {
        get: function () {
            var _this = this;
            // init the buffer when needed
            if (!this._csafeBuffer) {
                this._csafeBuffer = {
                    commands: [],
                    clear: function () {
                        _this.csafeBuffer.rawCommands = [];
                        return _this.csafeBuffer;
                    },
                    send: function (sucess, error) {
                        return _this.sendCSafeBuffer().then(sucess, error);
                    },
                    addRawCommand: function (info) {
                        _this.csafeBuffer.rawCommands.push(info);
                        return _this.csafeBuffer;
                    }
                };
                commandManager.apply(this.csafeBuffer, this);
            }
            return this._csafeBuffer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param device
     */
    PerformanceMonitor.prototype.removeDevice = function (device) {
        this._devices = this._devices.splice(this._devices.indexOf(device), 1);
    };
    /**
     *
     * @param device
     */
    PerformanceMonitor.prototype.addDevice = function (device) {
        var existing = this.findDevice(device.name);
        if (existing)
            this.removeDevice(existing);
        this._devices.push(device);
        // sort on hightest quality above
        this._devices.sort(function (device1, device2) {
            return device2.quality - device1.quality;
        });
    };
    /**
     *
     * @param value
     */
    PerformanceMonitor.prototype.changeConnectionState = function (value) {
        if (this._connectionState !== value) {
            var oldValue = this._connectionState;
            this._connectionState = value;
            this.connectionStateChangedEvent.pub(oldValue, value);
        }
    };
    /**
     *
     */
    PerformanceMonitor.prototype.enableMultiplexNotification = function () {
        var _this = this;
        if (this._multiplexSubscribeCount === 0) {
            this.driver
                .enableNotification(ble.PMROWING_SERVICE, ble.MULTIPLEXED_INFO_CHARACTERISIC, function (data) {
                _this.handleDataCallbackMulti(data);
            })
                .catch(this.getErrorHandlerFunc('Can not enable multiplex'));
        }
        this._multiplexSubscribeCount++;
    };
    /**
     *
     */
    PerformanceMonitor.prototype.disableMultiPlexNotification = function () {
        this._multiplexSubscribeCount--;
        if (this._multiplexSubscribeCount === 0) {
            this.driver
                .disableNotification(ble.PMROWING_SERVICE, ble.MULTIPLEXED_INFO_CHARACTERISIC)
                .catch(this.getErrorHandlerFunc('can not disable multiplex'));
        }
    };
    /**
     *
     */
    PerformanceMonitor.prototype.enableDisableNotification = function () {
        var _this = this;
        if (this.connectionState >= ergometer.MonitorConnectionState.servicesFound) {
            if (this.rowingGeneralStatusEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.ROWING_STATUS_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingGeneralStatus);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.ROWING_STATUS_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingAdditionalStatus1Event.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STATUS1_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingAdditionalStatus1);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STATUS1_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingAdditionalStatus2Event.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STATUS2_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingAdditionalStatus2);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STATUS2_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingStrokeDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.STROKE_DATA_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingStrokeData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.STROKE_DATA_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingAdditionalStrokeDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STROKE_DATA_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingAdditionalStrokeData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.EXTRA_STROKE_DATA_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingSplitIntervalDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.SPLIT_INTERVAL_DATA_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingSplitIntervalData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.SPLIT_INTERVAL_DATA_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.rowingAdditionalSplitIntervalDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleRowingAdditionalSplitIntervalData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.workoutSummaryDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.ROWING_SUMMARY_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleWorkoutSummaryData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.ROWING_SUMMARY_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.additionalWorkoutSummaryDataEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.EXTRA_ROWING_SUMMARY_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleAdditionalWorkoutSummaryData);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.EXTRA_ROWING_SUMMARY_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.additionalWorkoutSummaryData2Event.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                // this data is only available for multi ples
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
            }
            if (this.heartRateBeltInformationEvent.count > 0) {
                if (this.multiplex) {
                    this.enableMultiplexNotification();
                }
                else {
                    this.driver
                        .enableNotification(ble.PMROWING_SERVICE, ble.HEART_RATE_BELT_INFO_CHARACTERISIC, function (data) {
                        _this.handleDataCallback(data, _this.handleHeartRateBeltInformation);
                    })
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            else {
                if (this.multiplex)
                    this.disableMultiPlexNotification();
                else {
                    this.driver
                        .disableNotification(ble.PMROWING_SERVICE, ble.HEART_RATE_BELT_INFO_CHARACTERISIC)
                        .catch(this.getErrorHandlerFunc(''));
                }
            }
            if (this.powerCurveEvent.count > 0) {
                // when the status changes collect the power info
                if (!this._generalStatusEventAttachedByPowerCurve) {
                    this._generalStatusEventAttachedByPowerCurve = true;
                    this.rowingGeneralStatusEvent.sub(this, this.onPowerCurveRowingGeneralStatus);
                }
            }
            else {
                if (this._generalStatusEventAttachedByPowerCurve) {
                    this._generalStatusEventAttachedByPowerCurve = false;
                    this.rowingGeneralStatusEvent.unsub(this.onPowerCurveRowingGeneralStatus);
                }
            }
        }
    };
    PerformanceMonitor.prototype.onPowerCurveRowingGeneralStatus = function (data) {
        var _this = this;
        this.traceInfo('RowingGeneralStatus:' + JSON.stringify(data));
        // test to receive the power curve
        if (this.rowingGeneralStatus &&
            this.rowingGeneralStatus.strokeState !== data.strokeState) {
            if (data.strokeState === 4 /* recoveryState */) {
                // send a power curve request
                this.csafeBuffer
                    .clear()
                    .getPowerCurve({
                    onDataReceived: function (curve) {
                        _this.powerCurveEvent.pub(curve);
                        _this._powerCurve = curve;
                    }
                })
                    .send();
            }
        }
    };
    /**
     *
     */
    PerformanceMonitor.prototype.initialize = function (driver) {
        var _this = this;
        if (driver)
            this._driver = driver;
        else if (typeof bleat !== 'undefined' && bleat) {
            this._driver = new DriverBleat();
        }
        else if (typeof simpleBLE !== 'undefined' && simpleBLE) {
            this._driver = new DriverSimpleBLE();
        }
        else if (hasWebBlueTooth()) {
            this._driver = new DriverWebBlueTooth(this);
        }
        else {
            this.handleError('No suitable blue tooth driver found to connect to the ergometer. You need to load bleat on native platforms and a browser with web blue tooth capability.');
        }
        var enableDisableFunc = function () {
            _this.enableDisableNotification();
        };
        this._rowingGeneralStatusEvent = new pubSub.Event();
        this.rowingGeneralStatusEvent.registerChangedEvent(enableDisableFunc);
        this._rowingAdditionalStatus1Event = new pubSub.Event();
        this.rowingAdditionalStatus1Event.registerChangedEvent(enableDisableFunc);
        this._rowingAdditionalStatus2Event = new pubSub.Event();
        this.rowingAdditionalStatus2Event.registerChangedEvent(enableDisableFunc);
        this._rowingStrokeDataEvent = new pubSub.Event();
        this.rowingStrokeDataEvent.registerChangedEvent(enableDisableFunc);
        this._rowingAdditionalStrokeDataEvent = new pubSub.Event();
        this.rowingAdditionalStrokeDataEvent.registerChangedEvent(enableDisableFunc);
        this._rowingSplitIntervalDataEvent = new pubSub.Event();
        this.rowingSplitIntervalDataEvent.registerChangedEvent(enableDisableFunc);
        this._rowingAdditionalSplitIntervalDataEvent = new pubSub.Event();
        this.rowingAdditionalSplitIntervalDataEvent.registerChangedEvent(enableDisableFunc);
        this._workoutSummaryDataEvent = new pubSub.Event();
        this.workoutSummaryDataEvent.registerChangedEvent(enableDisableFunc);
        this._additionalWorkoutSummaryDataEvent = new pubSub.Event();
        this.additionalWorkoutSummaryDataEvent.registerChangedEvent(enableDisableFunc);
        this._additionalWorkoutSummaryData2Event = new pubSub.Event();
        this.additionalWorkoutSummaryData2Event.registerChangedEvent(enableDisableFunc);
        this._heartRateBeltInformationEvent = new pubSub.Event();
        this.heartRateBeltInformationEvent.registerChangedEvent(enableDisableFunc);
        this._powerCurveEvent = new pubSub.Event();
        this._powerCurveEvent.registerChangedEvent(enableDisableFunc);
    };
    /**
     *
     * @param name
     * @returns {DeviceInfo}
     */
    PerformanceMonitor.prototype.findDevice = function (name) {
        var result = null;
        this._devices.forEach(function (device) {
            if (device.name === name)
                result = device;
        });
        return result;
    };
    /**
     * the promise is never fail
     * @param serviceUUID
     * @param UUID
     * @param readValue
     */
    PerformanceMonitor.prototype.readStringCharacteristic = function (serviceUUID, UUID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driver
                .readCharacteristic(serviceUUID, UUID)
                .then(function (data) {
                resolve(utils.bufferToString(data));
            }, reject);
        });
    };
    /**
     * the promise will never fail
     * @param done
     */
    PerformanceMonitor.prototype.readSampleRate = function () {
        var _this = this;
        return this.driver
            .readCharacteristic(ble.PMROWING_SERVICE, ble.ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC)
            .then(function (data) {
            var view = new DataView(data);
            _this._sampleRate = view.getUint8(0);
        });
    };
    /**
     *
     * @param done
     */
    PerformanceMonitor.prototype.readPheripheralInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                _this.readStringCharacteristic(ble.PMDEVICE_INFO_SERVICE, ble.SERIALNUMBER_CHARACTERISTIC).then(function (value) {
                    _this._deviceInfo.serial = value;
                }),
                _this.readStringCharacteristic(ble.PMDEVICE_INFO_SERVICE, ble.HWREVISION_CHARACTERISIC).then(function (value) {
                    _this._deviceInfo.hardwareRevision = value;
                }),
                _this.readStringCharacteristic(ble.PMDEVICE_INFO_SERVICE, ble.FWREVISION_CHARACTERISIC).then(function (value) {
                    _this._deviceInfo.firmwareRevision = value;
                }),
                _this.readStringCharacteristic(ble.PMDEVICE_INFO_SERVICE, ble.MANUFNAME_CHARACTERISIC).then(function (value) {
                    _this._deviceInfo.manufacturer = value;
                    _this._deviceInfo.connected = true;
                }),
                _this.readSampleRate()
            ]).then(function () {
                resolve();
            }, function (e) {
                _this.handleError(e);
                resolve(e);
            }); // log erro const not get this into the way of connecting
        });
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingGeneralStatus = function (data) {
        var parsed = {
            elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
            distance: utils.getUint24(data, 3 /* DISTANCE_LO */) /
                10,
            workoutType: data.getUint8(6 /* WORKOUT_TYPE */),
            intervalType: data.getUint8(7 /* INTERVAL_TYPE */),
            workoutState: data.getUint8(8 /* WORKOUT_STATE */),
            rowingState: data.getUint8(9 /* ROWING_STATE */),
            strokeState: data.getUint8(10 /* STROKE_STATE */),
            totalWorkDistance: utils.getUint24(data, 11 /* TOTAL_WORK_DISTANCE_LO */),
            workoutDuration: utils.getUint24(data, 14 /* WORKOUT_DURATION_LO */),
            workoutDurationType: data.getUint8(17 /* WORKOUT_DURATION_TYPE */),
            dragFactor: data.getUint8(18 /* DRAG_FACTOR */)
        };
        if (parsed.workoutDurationType === 0 /* timeDuration */) {
            parsed.workoutDuration = parsed.workoutDuration * 10;
        } // in mili seconds
        if (JSON.stringify(this.rowingGeneralStatus) !== JSON.stringify(parsed)) {
            this.rowingGeneralStatusEvent.pub(parsed);
            this._rowingGeneralStatus = parsed;
        }
    };
    PerformanceMonitor.prototype.calcPace = function (lowByte, highByte) {
        return (lowByte + highByte * 256) * 10;
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingAdditionalStatus1 = function (data) {
        var parsed = {
            elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
            speed: data.getUint16(3 /* SPEED_LO */) / 1000,
            strokeRate: data.getUint8(5 /* STROKE_RATE */),
            heartRate: utils.valueToNullValue(data.getUint8(6 /* HEARTRATE */), 255),
            currentPace: this.calcPace(data.getUint8(7 /* CURRENT_PACE_LO */), data.getUint8(8 /* CURRENT_PACE_HI */)),
            averagePace: this.calcPace(data.getUint8(9 /* AVG_PACE_LO */), data.getUint8(10 /* AVG_PACE_HI */)),
            restDistance: data.getUint16(11 /* REST_DISTANCE_LO */),
            restTime: utils.getUint24(data, 13 /* REST_TIME_LO */) *
                10,
            averagePower: null
        };
        if (data.byteLength === 18 /* BLE_PAYLOAD_SIZE */) {
            parsed.averagePower = data.getUint16(16 /* AVG_POWER_LO */);
        }
        if (JSON.stringify(this.rowingAdditionalStatus1) !== JSON.stringify(parsed)) {
            this.rowingAdditionalStatus1Event.pub(parsed);
            this._rowingAdditionalStatus1 = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingAdditionalStatus2 = function (data) {
        var parsed;
        if (data.byteLength === 20 /* BLE_PAYLOAD_SIZE */) {
            parsed = {
                elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
                intervalCount: data.getUint8(3 /* INTERVAL_COUNT */),
                averagePower: data.getUint16(4 /* AVG_POWER_LO */),
                totalCalories: data.getUint16(6 /* TOTAL_CALORIES_LO */),
                splitAveragePace: this.calcPace(data.getUint8(8 /* SPLIT_INTERVAL_AVG_PACE_LO */), data.getUint8(9 /* SPLIT_INTERVAL_AVG_PACE_HI */)),
                splitAveragePower: data.getUint16(10 /* SPLIT_INTERVAL_AVG_POWER_LO */),
                splitAverageCalories: data.getUint16(12 /* SPLIT_INTERVAL_AVG_CALORIES_LO */),
                lastSplitTime: data.getUint16(14 /* LAST_SPLIT_TIME_LO */) *
                    100,
                lastSplitDistance: utils.getUint24(data, 17 /* LAST_SPLIT_DISTANCE_LO */)
            };
        }
        else {
            parsed = {
                elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
                intervalCount: data.getUint8(3 /* INTERVAL_COUNT */),
                averagePower: null,
                totalCalories: data.getUint16(4 /* TOTAL_CALORIES_LO */),
                splitAveragePace: this.calcPace(data.getUint8(6 /* SPLIT_INTERVAL_AVG_PACE_LO */), data.getUint8(7 /* SPLIT_INTERVAL_AVG_PACE_HI */)),
                splitAveragePower: data.getUint16(8 /* SPLIT_INTERVAL_AVG_POWER_LO */),
                splitAverageCalories: data.getUint16(10 /* SPLIT_INTERVAL_AVG_CALORIES_LO */),
                lastSplitTime: data.getUint16(12 /* LAST_SPLIT_TIME_LO */) * 100,
                lastSplitDistance: utils.getUint24(data, 15 /* LAST_SPLIT_DISTANCE_LO */)
            };
        }
        if (JSON.stringify(this.rowingAdditionalStatus2) !== JSON.stringify(parsed)) {
            this.rowingAdditionalStatus2Event.pub(parsed);
            this._rowingAdditionalStatus2 = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingStrokeData = function (data) {
        var parsed;
        if (data.byteLength === 20 /* BLE_PAYLOAD_SIZE */) {
            parsed = {
                elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
                distance: utils.getUint24(data, 3 /* DISTANCE_LO */) /
                    10,
                driveLength: data.getUint8(6 /* DRIVE_LENGTH */) / 100,
                driveTime: data.getUint8(7 /* DRIVE_TIME */) * 10,
                strokeRecoveryTime: data.getUint16(8 /* STROKE_RECOVERY_TIME_LO */) * 10,
                strokeDistance: data.getUint16(10 /* STROKE_DISTANCE_LO */) /
                    100,
                peakDriveForce: data.getUint16(12 /* PEAK_DRIVE_FORCE_LO */) /
                    10,
                averageDriveForce: data.getUint16(14 /* AVG_DRIVE_FORCE_LO */) /
                    10,
                workPerStroke: data.getUint16(16 /* WORK_PER_STROKE_LO */) /
                    10,
                strokeCount: data.getUint16(18 /* STROKE_COUNT_LO */)
            };
        }
        else {
            parsed = {
                elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
                distance: utils.getUint24(data, 3 /* DISTANCE_LO */) / 10,
                driveLength: data.getUint8(6 /* DRIVE_LENGTH */) / 100,
                driveTime: data.getUint8(7 /* DRIVE_TIME */) * 10,
                strokeRecoveryTime: data.getUint16(8 /* STROKE_RECOVERY_TIME_LO */) * 10,
                strokeDistance: data.getUint16(10 /* STROKE_DISTANCE_LO */) / 100,
                peakDriveForce: data.getUint16(12 /* PEAK_DRIVE_FORCE_LO */) / 10,
                averageDriveForce: data.getUint16(14 /* AVG_DRIVE_FORCE_LO */) / 10,
                workPerStroke: null,
                strokeCount: data.getUint16(16 /* STROKE_COUNT_LO */)
            };
        }
        if (JSON.stringify(this.rowingStrokeData) !== JSON.stringify(parsed)) {
            this.rowingStrokeDataEvent.pub(parsed);
            this._rowingStrokeData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingAdditionalStrokeData = function (data) {
        var parsed = {
            elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
            strokePower: data.getUint16(3 /* STROKE_POWER_LO */),
            strokeCalories: data.getUint16(5 /* STROKE_CALORIES_LO */),
            strokeCount: data.getUint16(7 /* STROKE_COUNT_LO */),
            projectedWorkTime: utils.getUint24(data, 9 /* PROJ_WORK_TIME_LO */) * 1000,
            projectedWorkDistance: utils.getUint24(data, 12 /* PROJ_WORK_DIST_LO */),
            workPerStroke: null // filled when multiplexed is true
        };
        if (data.byteLength ===
            17 /* BLE_PAYLOAD_SIZE */) {
            parsed.workPerStroke = data.getUint16(15 /* WORK_PER_STROKE_LO */);
        }
        if (JSON.stringify(this.rowingAdditionalStrokeData) !== JSON.stringify(parsed)) {
            this.rowingAdditionalStrokeDataEvent.pub(parsed);
            this._rowingAdditionalStrokeData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingSplitIntervalData = function (data) {
        var parsed = {
            elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
            distance: utils.getUint24(data, 3 /* DISTANCE_LO */) / 10,
            intervalTime: utils.getUint24(data, 6 /* SPLIT_TIME_LO */) * 100,
            intervalDistance: utils.getUint24(data, 9 /* SPLIT_DISTANCE_LO */),
            intervalRestTime: data.getUint16(12 /* REST_TIME_LO */) *
                1000,
            intervalRestDistance: data.getUint16(14 /* REST_DISTANCE_LO */),
            intervalType: data.getUint8(16 /* TYPE */),
            intervalNumber: data.getUint8(17 /* INT_NUMBER */)
        };
        if (JSON.stringify(this.rowingSplitIntervalData) !== JSON.stringify(parsed)) {
            this.rowingSplitIntervalDataEvent.pub(parsed);
            this._rowingSplitIntervalData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleRowingAdditionalSplitIntervalData = function (data) {
        var parsed = {
            elapsedTime: utils.getUint24(data, 0 /* ELAPSED_TIME_LO */) * 10,
            intervalAverageStrokeRate: data.getUint8(3 /* STROKE_RATE */),
            intervalWorkHeartrate: data.getUint8(4 /* WORK_HR */),
            intervalRestHeartrate: data.getUint8(5 /* REST_HR */),
            intervalAveragePace: data.getUint16(6 /* AVG_PACE_LO */) * 10,
            intervalTotalCalories: data.getUint16(8 /* CALORIES_LO */),
            intervalAverageCalories: data.getUint16(10 /* AVG_CALORIES_LO */),
            intervalSpeed: data.getUint16(12 /* SPEED_LO */) /
                1000,
            intervalPower: data.getUint16(14 /* POWER_LO */),
            splitAverageDragFactor: data.getUint8(16 /* AVG_DRAG_FACTOR */),
            intervalNumber: data.getUint8(17 /* INT_NUMBER */)
        };
        if (JSON.stringify(this.rowingAdditionalSplitIntervalData) !==
            JSON.stringify(parsed)) {
            this.rowingAdditionalSplitIntervalDataEvent.pub(parsed);
            this._rowingAdditionalSplitIntervalData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleWorkoutSummaryData = function (data) {
        var parsed = {
            logEntryDate: data.getUint16(0 /* LOG_DATE_LO */),
            logEntryTime: data.getUint16(2 /* LOG_TIME_LO */),
            elapsedTime: utils.getUint24(data, 4 /* ELAPSED_TIME_LO */) * 10,
            distance: utils.getUint24(data, 7 /* DISTANCE_LO */) / 10,
            averageStrokeRate: data.getUint8(10 /* AVG_SPM */),
            endingHeartrate: data.getUint8(11 /* END_HR */),
            averageHeartrate: data.getUint8(12 /* AVG_HR */),
            minHeartrate: data.getUint8(13 /* MIN_HR */),
            maxHeartrate: data.getUint8(14 /* MAX_HR */),
            dragFactorAverage: data.getUint8(15 /* AVG_DRAG_FACTOR */),
            recoveryHeartRate: data.getUint8(16 /* RECOVERY_HR */),
            workoutType: data.getUint8(17 /* WORKOUT_TYPE */),
            averagePace: null
        };
        if (data.byteLength ===
            20 /* BLE_PAYLOAD_SIZE */) {
            parsed.averagePace = data.getUint16(18 /* AVG_PACE_LO */);
        }
        if (JSON.stringify(this.workoutSummaryData) !== JSON.stringify(parsed)) {
            this.workoutSummaryDataEvent.pub(parsed);
            this._workoutSummaryData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleAdditionalWorkoutSummaryData = function (data) {
        var parsed;
        if (data.byteLength ===
            19 /* DATA_BLE_PAYLOAD_SIZE */) {
            parsed = {
                logEntryDate: data.getUint16(0 /* LOG_DATE_LO */),
                logEntryTime: data.getUint16(1 /* LOG_DATE_HI */),
                intervalType: data.getUint8(4 /* SPLIT_INT_TYPE */),
                intervalSize: data.getUint16(5 /* SPLIT_INT_SIZE_LO */),
                intervalCount: data.getUint8(7 /* SPLIT_INT_COUNT */),
                totalCalories: data.getUint16(8 /* WORK_CALORIES_LO */),
                watts: data.getUint16(10 /* WATTS_LO */),
                totalRestDistance: utils.getUint24(data, 12 /* TOTAL_REST_DISTANCE_LO */),
                intervalRestTime: data.getUint16(15 /* INTERVAL_REST_TIME_LO */),
                averageCalories: data.getUint16(17 /* AVG_CALORIES_LO */)
            };
        }
        else {
            parsed = {
                logEntryDate: data.getUint16(0 /* LOG_DATE_LO */),
                logEntryTime: data.getUint16(2 /* LOG_TIME_LO */),
                intervalType: null,
                intervalSize: data.getUint16(4 /* SPLIT_INT_SIZE_LO */),
                intervalCount: data.getUint8(6 /* SPLIT_INT_COUNT */),
                totalCalories: data.getUint16(7 /* WORK_CALORIES_LO */),
                watts: data.getUint16(9 /* WATTS_LO */),
                totalRestDistance: utils.getUint24(data, 11 /* TOTAL_REST_DISTANCE_LO */),
                intervalRestTime: data.getUint16(14 /* INTERVAL_REST_TIME_LO */),
                averageCalories: data.getUint16(16 /* AVG_CALORIES_LO */)
            };
        }
        if (JSON.stringify(this.additionalWorkoutSummaryData) !==
            JSON.stringify(parsed)) {
            this.additionalWorkoutSummaryDataEvent.pub(parsed);
            this._additionalWorkoutSummaryData = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleAdditionalWorkoutSummaryData2 = function (data) {
        var parsed = {
            logEntryDate: data.getUint16(0 /* LOG_DATE_LO */),
            logEntryTime: data.getUint16(1 /* LOG_DATE_HI */),
            averagePace: data.getUint16(4 /* AVG_PACE_LO */),
            gameIdentifier: data.getUint8(6 /* GAME_ID */),
            gameScore: data.getUint16(7 /* GAME_SCORE_LO */),
            ergMachineType: data.getUint8(9 /* MACHINE_TYPE */)
        };
        if (JSON.stringify(this.additionalWorkoutSummaryData2) !==
            JSON.stringify(parsed)) {
            this.additionalWorkoutSummaryData2Event.pub(parsed);
            this._additionalWorkoutSummaryData2 = parsed;
        }
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleHeartRateBeltInformation = function (data) {
        var parsed = {
            manufacturerId: data.getUint8(0 /* MANUFACTURER_ID */),
            deviceType: data.getUint8(1 /* DEVICE_TYPE */),
            beltId: data.getUint32(2 /* BELT_ID_LO */)
        };
        if (JSON.stringify(this.heartRateBeltInformation) !== JSON.stringify(parsed)) {
            this.heartRateBeltInformationEvent.pub(parsed);
            this._heartRateBeltInformation = parsed;
        }
    };
    /**
     *
     * @internal
     */
    PerformanceMonitor.prototype.deviceConnected = function () {
        this.debugInfo('readServices success');
        this.debugInfo('Status: notifications are activated');
        // handle to the notification
        this.changeConnectionState(ergometer.MonitorConnectionState.servicesFound);
        this.enableDisableNotification();
        // allways connect to csafe
        this.handleCSafeNotifications();
        this.changeConnectionState(ergometer.MonitorConnectionState.readyForCommunication);
    };
    /**
     *
     * @param data
     */
    PerformanceMonitor.prototype.handleDataCallbackMulti = function (data) {
        var ar = new DataView(data);
        var dataType = ar.getUint8(0);
        ar = new DataView(data, 1);
        switch (dataType) {
            case 49 /* ROWING_GENERAL_STATUS */: {
                if (this.rowingGeneralStatusEvent.count > 0) {
                    this.handleRowingGeneralStatus(ar);
                }
                break;
            }
            case 50 /* ROWING_ADDITIONAL_STATUS1 */: {
                if (this.rowingAdditionalStatus1Event.count > 0) {
                    this.handleRowingAdditionalStatus1(ar);
                }
                break;
            }
            case 51 /* ROWING_ADDITIONAL_STATUS2 */: {
                if (this.rowingAdditionalStatus2Event.count > 0) {
                    this.handleRowingAdditionalStatus2(ar);
                }
                break;
            }
            case 53 /* STROKE_DATA_STATUS */: {
                if (this.rowingStrokeDataEvent.count > 0) {
                    this.handleRowingStrokeData(ar);
                }
                break;
            }
            case 54 /* EXTRA_STROKE_DATA_STATUS */: {
                if (this.rowingAdditionalStrokeDataEvent.count > 0) {
                    this.handleRowingAdditionalStrokeData(ar);
                }
                break;
            }
            case 55 /* SPLIT_INTERVAL_STATUS */: {
                if (this.rowingSplitIntervalDataEvent.count > 0) {
                    this.handleRowingSplitIntervalData(ar);
                }
                break;
            }
            case 56 /* EXTRA_SPLIT_INTERVAL_STATUS */: {
                if (this.rowingAdditionalSplitIntervalDataEvent.count > 0) {
                    this.handleRowingAdditionalSplitIntervalData(ar);
                }
                break;
            }
            case 57 /* WORKOUT_SUMMARY_STATUS */: {
                if (this.workoutSummaryDataEvent.count > 0) {
                    this.handleWorkoutSummaryData(ar);
                }
                break;
            }
            case 58 /* EXTRA_WORKOUT_SUMMARY_STATUS1 */: {
                if (this.additionalWorkoutSummaryDataEvent.count > 0) {
                    this.handleAdditionalWorkoutSummaryData(ar);
                }
                break;
            }
            case 59 /* HEART_RATE_BELT_INFO_STATUS */: {
                if (this.heartRateBeltInformationEvent.count > 0) {
                    this.handleHeartRateBeltInformation(ar);
                }
                break;
            }
            case 60 /* EXTRA_WORKOUT_SUMMARY_STATUS2 */: {
                if (this.additionalWorkoutSummaryData2Event.count > 0) {
                    this.handleAdditionalWorkoutSummaryData2(ar);
                }
                break;
            }
        }
    };
    /**
     *
     * @param data
     * @param func
     */
    PerformanceMonitor.prototype.handleDataCallback = function (data, func) {
        // this.debugInfo("data received: " + evothings.util.typedArrayToHexString(data));
        var ar = new DataView(data);
        // call the function within the scope of the object
        func.apply(this, [ar]);
    };
    PerformanceMonitor.prototype.removeOldSendCommands = function () {
        for (var i = this._waitResponseCommands.length - 1; i >= 0; i--) {
            var command = this._waitResponseCommands[i];
            var currentTime = utils.getTime();
            // more than 20 seconds in the buffer
            if (currentTime - command._timestamp > 20000) {
                if (command.onError) {
                    command.onError('Nothing returned in 20 seconds');
                    this.handleError("Nothing returned in 20 seconds from command " + command.command + " " + command.detailCommand);
                }
                this._waitResponseCommands.splice(i, 1);
            }
        }
    };
    PerformanceMonitor.prototype.sendCsafeCommands = function (byteArray) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // is there anything to send?
            if (byteArray && byteArray.length > 0) {
                // calc the checksum of the data to be send
                var checksum = 0;
                for (var i = 0; i < byteArray.length; i++) {
                    checksum = checksum ^ byteArray[i];
                }
                // prepare all the data to be send in one array
                // begin with a start byte ad end with a checksum and an end byte
                var bytesToSend_1 = [csafe.FRAME_START_BYTE]
                    .concat(byteArray)
                    .concat([checksum, csafe.FRAME_END_BYTE]);
                // send in packages of max 20 bytes (ble.PACKET_SIZE)
                var sendBytesIndex_1 = 0;
                // continue while not all bytes are send
                while (sendBytesIndex_1 < bytesToSend_1.length) {
                    // prepare a buffer with the data which can be send in one packet
                    var bufferLength = Math.min(ble.PACKET_SIZE, bytesToSend_1.length - sendBytesIndex_1);
                    var buffer = new ArrayBuffer(bufferLength); // start and end and
                    var dataView = new DataView(buffer);
                    var bufferIndex = 0;
                    while (bufferIndex < bufferLength) {
                        dataView.setUint8(bufferIndex, bytesToSend_1[sendBytesIndex_1]);
                        sendBytesIndex_1++;
                        bufferIndex++;
                    }
                    _this.traceInfo('send csafe: ' + utils.typedArrayToHexString(buffer));
                    _this.driver
                        .writeCharacteristic(ble.PMCONTROL_SERVICE, ble.TRANSMIT_TO_PM_CHARACTERISIC, dataView)
                        .then(function () {
                        _this.traceInfo('csafe command send');
                        if (sendBytesIndex_1 >= bytesToSend_1.length)
                            resolve();
                    })
                        .catch(function (e) {
                        reject(e);
                    });
                }
            }
            else
                resolve();
        });
    };
    return PerformanceMonitor;
}());
export { PerformanceMonitor };
//# sourceMappingURL=performanceMonitor.js.map