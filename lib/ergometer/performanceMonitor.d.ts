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
import * as driver from './ble/Driver';
import * as recordingDriver from './ble/RecordingDriver';
import * as replayDriver from './ble/ReplayDriver';
import { IBuffer } from './csafe/command_core';
import * as ergometer from './typedefinitions';
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
export declare class PerformanceMonitor implements ergometer.IPerformanceMonitor {
    private _driver;
    private _recordingDriver;
    private _replayDriver;
    private _connectionState;
    private _logEvent;
    private _connectionStateChangedEvent;
    private _rowingGeneralStatusEvent;
    private _rowingAdditionalStatus1Event;
    private _rowingAdditionalStatus2Event;
    private _rowingStrokeDataEvent;
    private _rowingAdditionalStrokeDataEvent;
    private _rowingSplitIntervalDataEvent;
    private _rowingAdditionalSplitIntervalDataEvent;
    private _workoutSummaryDataEvent;
    private _additionalWorkoutSummaryDataEvent;
    private _additionalWorkoutSummaryData2Event;
    private _heartRateBeltInformationEvent;
    private _powerCurveEvent;
    private _deviceInfo;
    private _rowingGeneralStatus;
    private _rowingAdditionalStatus1;
    private _rowingAdditionalStatus2;
    private _rowingStrokeData;
    private _rowingAdditionalStrokeData;
    private _rowingSplitIntervalData;
    private _rowingAdditionalSplitIntervalData;
    private _workoutSummaryData;
    private _additionalWorkoutSummaryData;
    private _additionalWorkoutSummaryData2;
    private _heartRateBeltInformation;
    private _powerCurve;
    private _devices;
    private _multiplex;
    private _multiplexSubscribeCount;
    private _sampleRate;
    private _autoReConnect;
    private _logLevel;
    private _csafeBuffer;
    private _waitResponseCommands;
    private _generalStatusEventAttachedByPowerCurve;
    private _recording;
    /**
     * To work with this class you will need to create it.
     */
    constructor(opts?: {
        driver?: driver.IDriver;
    });
    protected readonly recordingDriver: recordingDriver.RecordingDriver;
    recording: boolean;
    readonly replayDriver: replayDriver.ReplayDriver;
    replaying: boolean;
    replay(events: recordingDriver.IRecordingItem[]): void;
    recordingEvents: recordingDriver.IRecordingItem[];
    protected readonly driver: driver.IDriver;
    /**
     * By default it the logEvent will return errors if you want more debug change the log level
     * @returns {LogLevel}
     */
    /**
     * By default it the logEvent will return errors if you want more debug change the log level
     * @param value
     */
    logLevel: ergometer.LogLevel;
    /**
     * when the connection is lost re-connect
     * @returns {boolean}
     */
    /**
     *
     * when the connection is lost re-connect
     * @param value
     */
    autoReConnect: boolean;
    /**
     * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
     * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
     * the documentation in the properties You must set the multi plex property before connecting
     *
     * @returns {boolean}
     */
    /**
     * On some android phones you can connect to a limited number of events. Use the multiplex property to overcome
     * this problem. When the multi plex mode is switched on the data send to the device can be a a bit different, see
     * the documentation in the properties You must set the multi plex property before connecting
     * @param value
     */
    multiplex: boolean;
    /**
     * an array of of performance monitor devices which where found during the scan.
     * the array is sorted by connection quality (best on top)
     *
     * @returns {DeviceInfo[]}
     */
    readonly devices: ergometer.DeviceInfo[];
    /**
     * The values of the last rowingGeneralStatus event
     *
     * @returns {ergometer.RowingGeneralStatus}
     */
    readonly rowingGeneralStatus: ergometer.RowingGeneralStatus;
    /**
     * The values of the last rowingAdditionalStatus1 event
     * @returns {ergometer.RowingAdditionalStatus1}
     */
    readonly rowingAdditionalStatus1: ergometer.RowingAdditionalStatus1;
    /**
     * The values of the last RowingAdditionalStatus2 event
     * @returns {ergometer.RowingAdditionalStatus2}
     */
    readonly rowingAdditionalStatus2: ergometer.RowingAdditionalStatus2;
    /**
     *  The values of the last rowingStrokeData event
     * @returns {ergometer.RowingStrokeData}
     */
    readonly rowingStrokeData: ergometer.RowingStrokeData;
    /**
     * The values of the last rowingAdditionalStrokeData event
     * @returns {ergometer.RowingAdditionalStrokeData}
     */
    readonly rowingAdditionalStrokeData: ergometer.RowingAdditionalStrokeData;
    /**
     * The values of the last rowingSplitIntervalData event
     * @returns {ergometer.RowingSplitIntervalData}
     */
    readonly rowingSplitIntervalData: ergometer.RowingSplitIntervalData;
    /**
     * The values of the last rowingAdditionalSplitIntervalData event
     * @returns {ergometer.RowingAdditionalSplitIntervalData}
     */
    readonly rowingAdditionalSplitIntervalData: ergometer.RowingAdditionalSplitIntervalData;
    /**
     * The values of the last workoutSummaryData event
     * @returns {ergometer.WorkoutSummaryData}
     */
    readonly workoutSummaryData: ergometer.WorkoutSummaryData;
    /**
     * The values of the last additionalWorkoutSummaryData event
     * @returns {ergometer.AdditionalWorkoutSummaryData}
     */
    readonly additionalWorkoutSummaryData: ergometer.AdditionalWorkoutSummaryData;
    /**
     * The values of the last AdditionalWorkoutSummaryData2 event
     * @returns {ergometer.AdditionalWorkoutSummaryData2}
     */
    readonly additionalWorkoutSummaryData2: ergometer.AdditionalWorkoutSummaryData2;
    /**
     * The values of the last heartRateBeltInformation event
     * @returns {ergometer.HeartRateBeltInformation}
     */
    readonly heartRateBeltInformation: ergometer.HeartRateBeltInformation;
    /**
     * read rowingGeneralStatus data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingGeneralStatusEvent>}
     */
    readonly rowingGeneralStatusEvent: pubSub.Event<ergometer.RowingGeneralStatusEvent>;
    /**
     * read rowingGeneralStatus1 data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingAdditionalStatus1Event>}
     */
    readonly rowingAdditionalStatus1Event: pubSub.Event<ergometer.RowingAdditionalStatus1Event>;
    /**
     * read rowingAdditionalStatus2 data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingAdditionalStatus2Event>}
     */
    readonly rowingAdditionalStatus2Event: pubSub.Event<ergometer.RowingAdditionalStatus2Event>;
    /**
     * read rowingStrokeData data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingStrokeDataEvent>}
     */
    readonly rowingStrokeDataEvent: pubSub.Event<ergometer.RowingStrokeDataEvent>;
    /**
     * read rowingAdditionalStrokeData data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingAdditionalStrokeDataEvent>}
     */
    readonly rowingAdditionalStrokeDataEvent: pubSub.Event<ergometer.RowingAdditionalStrokeDataEvent>;
    /**
     * read rowingSplitIntervalDat data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingSplitIntervalDataEvent>}
     */
    readonly rowingSplitIntervalDataEvent: pubSub.Event<ergometer.RowingSplitIntervalDataEvent>;
    /**
     * read rowingAdditionalSplitIntervalData data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.RowingAdditionalSplitIntervalDataEvent>}
     */
    readonly rowingAdditionalSplitIntervalDataEvent: pubSub.Event<ergometer.RowingAdditionalSplitIntervalDataEvent>;
    /**
     * read workoutSummaryData data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.WorkoutSummaryDataEvent>}
     */
    readonly workoutSummaryDataEvent: pubSub.Event<ergometer.WorkoutSummaryDataEvent>;
    /**
     * read additionalWorkoutSummaryData data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryDataEvent>}
     */
    readonly additionalWorkoutSummaryDataEvent: pubSub.Event<ergometer.AdditionalWorkoutSummaryDataEvent>;
    /**
     * read additionalWorkoutSummaryData2 data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.AdditionalWorkoutSummaryData2Event>}
     */
    readonly additionalWorkoutSummaryData2Event: pubSub.Event<ergometer.AdditionalWorkoutSummaryData2Event>;
    /**
     * read heartRateBeltInformation data
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ergometer.HeartRateBeltInformationEvent>}
     */
    readonly heartRateBeltInformationEvent: pubSub.Event<ergometer.HeartRateBeltInformationEvent>;
    readonly powerCurveEvent: pubSub.Event<ergometer.PowerCurveEvent>;
    /**
     * event which is called when the connection state is changed. For example this way you
     * can check if the device is disconnected.
     * connect to the using .sub(this,myFunction)
     * @returns {pubSub.Event<ConnectionStateChangedEvent>}
     */
    readonly connectionStateChangedEvent: pubSub.Event<ergometer.ConnectionStateChangedEvent>;
    /**
     * returns error and other log information. Some errors can only be received using the logEvent
     * @returns {pubSub.Event<LogEvent>}
     */
    readonly logEvent: pubSub.Event<ergometer.LogEvent>;
    readonly powerCurve: number[];
    /**
     * Get device information of the connected device.
     * @returns {DeviceInfo}
     */
    readonly deviceInfo: ergometer.DeviceInfo;
    /**
     * read the performance montitor sample rate. By default this is 500 ms
     * @returns {number}
     */
    /**
     * Change the performance monitor sample rate.
     * @param value
     */
    sampleRate: ergometer.SampleRate;
    /**
     * disconnect the current connected device
     */
    disconnect(): void;
    /**
     * read the current connection state
     * @returns {ergometer.MonitorConnectionState}
     */
    readonly connectionState: ergometer.MonitorConnectionState;
    /**
     * Print debug info to console and application UI.
     * @param info
     */
    traceInfo(info: string): void;
    /**
     *
     * @param info
     */
    debugInfo(info: string): void;
    /**
     *
     * @param info
     */
    showInfo(info: string): void;
    /**
     * call the global error hander and call the optional error handler if given
     * @param error
     */
    handleError(error: string, errorFn?: ergometer.ErrorHandler): void;
    /**
     * Get an error function which adds the errorDescription to the error ,cals the global and an optional local funcion
     * @param errorDescription
     * @param errorFn
     */
    getErrorHandlerFunc(errorDescription: string, errorFn?: ergometer.ErrorHandler): ergometer.ErrorHandler;
    /**
     *
     */
    stopScan(): void;
    /**
     * Scan for device use the deviceFound to connect .
     * @param deviceFound
     */
    startScan(deviceFound: (device: ergometer.DeviceInfo) => boolean, errorFn?: ergometer.ErrorHandler): Promise<void>;
    /**
     * connect to a specific device. This should be a PM5 device which is found by the startScan. You can
     * only call this function after startScan is called. Connection to a device will stop the scan.
     * @param deviceName
     */
    connectToDevice(deviceName: string): Promise<void>;
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
    sendCSafeBuffer(): Promise<void>;
    receivedCSaveCommand(parsed: ergometer.ParsedCSafeCommand): void;
    handleCSafeNotifications(): void;
    readonly csafeBuffer: IBuffer;
    /**
     *
     * @param device
     */
    protected removeDevice(device: ergometer.DeviceInfo): void;
    /**
     *
     * @param device
     */
    protected addDevice(device: ergometer.DeviceInfo): void;
    /**
     *
     * @param value
     */
    protected changeConnectionState(value: ergometer.MonitorConnectionState): void;
    /**
     *
     */
    protected enableMultiplexNotification(): void;
    /**
     *
     */
    protected disableMultiPlexNotification(): void;
    /**
     *
     */
    protected enableDisableNotification(): void;
    protected onPowerCurveRowingGeneralStatus(data: ergometer.RowingGeneralStatus): void;
    /**
     *
     */
    protected initialize(driver: driver.IDriver): void;
    /**
     *
     * @param name
     * @returns {DeviceInfo}
     */
    protected findDevice(name: string): ergometer.DeviceInfo;
    /**
     * the promise is never fail
     * @param serviceUUID
     * @param UUID
     * @param readValue
     */
    protected readStringCharacteristic(serviceUUID: string, UUID: string): Promise<string>;
    /**
     * the promise will never fail
     * @param done
     */
    protected readSampleRate(): Promise<void>;
    /**
     *
     * @param done
     */
    protected readPheripheralInfo(): Promise<void>;
    /**
     *
     * @param data
     */
    protected handleRowingGeneralStatus(data: DataView): void;
    protected calcPace(lowByte: any, highByte: number): number;
    /**
     *
     * @param data
     */
    protected handleRowingAdditionalStatus1(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleRowingAdditionalStatus2(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleRowingStrokeData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleRowingAdditionalStrokeData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleRowingSplitIntervalData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleRowingAdditionalSplitIntervalData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleWorkoutSummaryData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleAdditionalWorkoutSummaryData(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleAdditionalWorkoutSummaryData2(data: DataView): void;
    /**
     *
     * @param data
     */
    protected handleHeartRateBeltInformation(data: DataView): void;
    /**
     *
     * @internal
     */
    protected deviceConnected(): void;
    /**
     *
     * @param data
     */
    protected handleDataCallbackMulti(data: ArrayBuffer): void;
    /**
     *
     * @param data
     * @param func
     */
    protected handleDataCallback(data: ArrayBuffer, func: (data: DataView) => void): void;
    protected removeOldSendCommands(): void;
    protected sendCsafeCommands(byteArray: number[]): Promise<void>;
}
