/**
 * Created by tijmen on 28-12-15.
 */
import * as pubSub from './pubsub';
import { IDevice } from './ble/Driver';
export declare const enum RowingSampleRate {
    rate1sec = 0,
    rate500ms = 1,
    rate250ms = 2,
    rate100ms = 3,
}
export declare const enum ErgmachineType {
    staticD = 0,
    staticC = 1,
    staticA = 2,
    staticB = 3,
    staticE = 5,
    staticDynamic = 8,
    slidesA = 16,
    slidesB = 17,
    slidesC = 18,
    slidesD = 19,
    slidesE = 20,
    slidesDynamic = 32,
    staticDyno = 64,
    staticSki = 128,
    num = 129,
}
export declare const enum WorkoutType {
    justRowNoSplits = 0,
    justRowSplits = 1,
    fixedDistanceNoAplits = 2,
    fixedDistanceSplits = 3,
    fixedTimeNoAplits = 4,
    fixedTimeAplits = 5,
    fixedTimeInterval = 6,
    fixedDistanceInterval = 7,
    variableInterval = 8,
    variableUndefinedRestInterval = 9,
    fixedCalorie = 10,
    fixedWattMinutes = 11,
}
export declare const enum IntervalType {
    time = 0,
    dist = 1,
    rest = 2,
    timertUndefined = 3,
    distanceRestUndefined = 4,
    restUndefined = 5,
    cal = 6,
    calRestUndefined = 7,
    wattMinute = 8,
    wattMinuteRestUndefined = 9,
    none = 255,
}
export declare const enum WorkoutState {
    waitToBegin = 0,
    workoutRow = 1,
    countDownPause = 2,
    intervalRest = 3,
    intervalWorktime = 4,
    intervalWorkDistance = 5,
    intervalRestEndToWorkTime = 6,
    intervalRestEndToWorkDistance = 7,
    intervalWorktimeTorest = 8,
    intervalWorkDistanceToEest = 9,
    workoutEnd = 10,
    terminate = 11,
    workoutLogged = 12,
    rearm = 13,
}
export declare const enum RowingState {
    inactive = 0,
    active = 1,
}
export declare const enum StrokeState {
    waitingForWheelToReachMinSpeedState = 0,
    waitingForWheelToAccelerateState = 1,
    drivingState = 2,
    dwellingAfterDriveState = 3,
    recoveryState = 4,
}
export declare const enum WorkoutDurationType {
    timeDuration = 0,
    caloriesDuration = 64,
    distanceDuration = 128,
    wattsDuration = 192,
}
export declare const enum SampleRate {
    rate1sec = 0,
    rate500ms = 1,
    rate250ms = 2,
    rate100ms = 3,
}
export declare const enum Program {
    Programmed = 0,
    StandardList1 = 1,
    StandardList2 = 2,
    StandardList3 = 3,
    StandardList4 = 4,
    StandardList5 = 5,
    CustomList1 = 6,
    CustomList2 = 7,
    CustomList3 = 8,
    CustomList4 = 9,
    CustomList5 = 10,
    FavoritesList1 = 11,
    FavoritesList2 = 12,
    FavoritesList3 = 13,
    FavoritesList4 = 14,
    FavoritesList5 = 15,
}
export declare const enum Unit {
    distanceMile = 1,
    distanceMile1 = 2,
    distanceMile2 = 3,
    distanceMile3 = 4,
    distanceFeet = 5,
    distanceInch = 6,
    weightLbs = 7,
    weightLbs1 = 8,
    distanceFeet10 = 10,
    speedMilePerHour = 16,
    speedMilePerHour1 = 17,
    speedMilePerHour2 = 18,
    speedFeetPerMinute = 19,
    distanceKm = 33,
    distanceKm1 = 34,
    distanceKm2 = 35,
    distanceMeter = 36,
    distanceMeter1 = 37,
    distance_cm = 38,
    weightKg = 39,
    weightKg1 = 40,
    speedKmPerHour = 48,
    speedKmPerHour1 = 49,
    speedKmPerHour2 = 50,
    speedMeterPerMinute = 51,
    paceMinutePermile = 55,
    paceMinutePerkm = 56,
    paceSecondsPerkm = 57,
    paceSecondsPermile = 58,
    distanceFloors = 65,
    distanceFloors1 = 66,
    distanceSteps = 67,
    distanceRevs = 68,
    distanceStrides = 69,
    distanceStrokes = 70,
    miscBeats = 71,
    energyCalories = 72,
    gradePercent = 74,
    gradePercent2 = 75,
    gradePercent1 = 76,
    cadenceFloorsPerMinute1 = 79,
    cadenceFloorsPerMinute = 80,
    cadenceStepsPerMinute = 81,
    cadenceRevsPerMinute = 82,
    cadenceStridesPerMinute = 83,
    cadenceStrokesPerMinute = 84,
    miscBeatsPerMinute = 85,
    burnCaloriesPerMinute = 86,
    burnCaloriesPerHour = 87,
    powerWatts = 88,
    energyInchlb = 90,
    energyFootlb = 91,
    energyNm = 92,
}
export interface RowingGeneralStatus {
    elapsedTime: number;
    distance: number;
    workoutType: WorkoutType;
    intervalType: IntervalType;
    workoutState: WorkoutState;
    rowingState: RowingState;
    strokeState: StrokeState;
    totalWorkDistance: number;
    workoutDuration: number;
    workoutDurationType: WorkoutDurationType;
    dragFactor: number;
}
export interface RowingAdditionalStatus1 {
    elapsedTime: number;
    speed: number;
    strokeRate: number;
    heartRate: number;
    currentPace: number;
    averagePace: number;
    restDistance: number;
    restTime: number;
    averagePower: number;
}
export interface RowingAdditionalStatus2 {
    elapsedTime: number;
    intervalCount: number;
    averagePower: number;
    totalCalories: number;
    splitAveragePace: number;
    splitAveragePower: number;
    splitAverageCalories: number;
    lastSplitTime: number;
    lastSplitDistance: number;
}
export interface RowingStrokeData {
    elapsedTime: number;
    distance: number;
    driveLength: number;
    driveTime: number;
    strokeRecoveryTime: number;
    strokeDistance: number;
    peakDriveForce: number;
    averageDriveForce: number;
    workPerStroke: number;
    strokeCount: number;
}
export interface RowingAdditionalStrokeData {
    elapsedTime: number;
    strokePower: number;
    strokeCalories: number;
    strokeCount: number;
    projectedWorkTime: number;
    projectedWorkDistance: number;
    workPerStroke: number;
}
export interface RowingSplitIntervalData {
    elapsedTime: number;
    distance: number;
    intervalTime: number;
    intervalDistance: number;
    intervalRestTime: number;
    intervalRestDistance: number;
    intervalType: IntervalType;
    intervalNumber: number;
}
export interface RowingAdditionalSplitIntervalData {
    elapsedTime: number;
    intervalAverageStrokeRate: number;
    intervalWorkHeartrate: number;
    intervalRestHeartrate: number;
    intervalAveragePace: number;
    intervalTotalCalories: number;
    intervalAverageCalories: number;
    intervalSpeed: number;
    intervalPower: number;
    splitAverageDragFactor: number;
    intervalNumber: number;
}
export interface WorkoutSummaryData {
    logEntryDate: number;
    logEntryTime: number;
    elapsedTime: number;
    distance: number;
    averageStrokeRate: number;
    endingHeartrate: number;
    averageHeartrate: number;
    minHeartrate: number;
    maxHeartrate: number;
    dragFactorAverage: number;
    recoveryHeartRate: number;
    workoutType: WorkoutType;
    averagePace: number;
}
export interface AdditionalWorkoutSummaryData {
    logEntryDate: number;
    logEntryTime: number;
    intervalType: IntervalType;
    intervalSize: number;
    intervalCount: number;
    totalCalories: number;
    watts: number;
    totalRestDistance: number;
    intervalRestTime: number;
    averageCalories: number;
}
export interface AdditionalWorkoutSummaryData2 {
    logEntryDate: number;
    logEntryTime: number;
    averagePace: number;
    gameIdentifier: number;
    gameScore: number;
    ergMachineType: ErgmachineType;
}
export interface HeartRateBeltInformation {
    manufacturerId: number;
    deviceType: number;
    beltId: number;
}
export interface RowingGeneralStatusEvent extends pubSub.ISubscription {
    (data: RowingGeneralStatus): void;
}
export interface RowingAdditionalStatus1Event extends pubSub.ISubscription {
    (data: RowingAdditionalStatus1): void;
}
export interface RowingAdditionalStatus2Event extends pubSub.ISubscription {
    (data: RowingAdditionalStatus2): void;
}
export interface RowingStrokeDataEvent extends pubSub.ISubscription {
    (data: RowingStrokeData): void;
}
export interface RowingAdditionalStrokeDataEvent extends pubSub.ISubscription {
    (data: RowingAdditionalStrokeData): void;
}
export interface RowingSplitIntervalDataEvent extends pubSub.ISubscription {
    (data: RowingSplitIntervalData): void;
}
export interface RowingAdditionalSplitIntervalDataEvent extends pubSub.ISubscription {
    (data: RowingAdditionalSplitIntervalData): void;
}
export interface WorkoutSummaryDataEvent extends pubSub.ISubscription {
    (data: WorkoutSummaryData): void;
}
export interface AdditionalWorkoutSummaryDataEvent extends pubSub.ISubscription {
    (data: AdditionalWorkoutSummaryData): void;
}
export interface AdditionalWorkoutSummaryData2Event extends pubSub.ISubscription {
    (data: AdditionalWorkoutSummaryData2): void;
}
export interface HeartRateBeltInformationEvent extends pubSub.ISubscription {
    (data: HeartRateBeltInformation): void;
}
export interface PowerCurveEvent extends pubSub.ISubscription {
    (data: number[]): void;
}
export declare enum MonitorConnectionState {
    inactive = 0,
    deviceReady = 1,
    scanning = 2,
    connecting = 3,
    connected = 4,
    servicesFound = 5,
    readyForCommunication = 6,
}
export declare enum LogLevel {
    error = 0,
    info = 1,
    debug = 2,
    trace = 3,
}
export interface LogEvent extends pubSub.ISubscription {
    (text: string, logLevel: LogLevel): void;
}
export interface ConnectionStateChangedEvent extends pubSub.ISubscription {
    (oldState: MonitorConnectionState, newState: MonitorConnectionState): void;
}
export interface ErrorHandler {
    (e: any): void;
}
export interface DeviceInfo {
    connected: boolean;
    name: string;
    address: string;
    quality: number;
    serial?: string;
    hardwareRevision?: string;
    firmwareRevision?: string;
    manufacturer?: string;
    /** @internal */
    _internalDevice: IDevice;
}
export interface ParsedCSafeCommand {
    command: number;
    detailCommand: number;
    data: Uint8Array;
}
export interface IPerformanceMonitor {
    [data: string]: any;
}
