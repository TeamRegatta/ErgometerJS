declare module "ergometer/csafe/typedefinitions" {
    /**
     * Created by tijmen on 16-01-16.
     *
     * translation of concept 2 csafe.h to typescript version  9/16/08 10:51a
     */
    export const EXT_FRAME_START_BYTE = 240;
    export const FRAME_START_BYTE = 241;
    export const FRAME_END_BYTE = 242;
    export const FRAME_STUFF_BYTE = 243;
    export const FRAME_MAX_STUFF_OFFSET_BYTE = 3;
    export const FRAME_FLG_LEN = 2;
    export const EXT_FRAME_ADDR_LEN = 2;
    export const FRAME_CHKSUM_LEN = 1;
    export const SHORT_CMD_TYPE_MSK = 128;
    export const LONG_CMD_HDR_LENGTH = 2;
    export const LONG_CMD_BYTE_CNT_OFFSET = 1;
    export const RSP_HDR_LENGTH = 2;
    export const FRAME_STD_TYPE = 0;
    export const FRAME_EXT_TYPE = 1;
    export const DESTINATION_ADDR_HOST = 0;
    export const DESTINATION_ADDR_ERG_MASTER = 1;
    export const DESTINATION_ADDR_BROADCAST = 255;
    export const DESTINATION_ADDR_ERG_DEFAULT = 253;
    export const FRAME_MAXSIZE = 96;
    export const INTERFRAMEGAP_MIN = 50;
    export const CMDUPLIST_MAXSIZE = 10;
    export const MEMORY_BLOCKSIZE = 64;
    export const FORCEPLOT_BLOCKSIZE = 32;
    export const HEARTBEAT_BLOCKSIZE = 32;
    export const MANUFACTURE_ID = 22;
    export const CLASS_ID = 2;
    export const MODEL_NUM = 5;
    export const UNITS_TYPE = 0;
    export const SERIALNUM_DIGITS = 9;
    export const HMS_FORMAT_CNT = 3;
    export const YMD_FORMAT_CNT = 3;
    export const ERRORCODE_FORMAT_CNT = 3;
    export const CTRL_CMD_LONG_MIN = 1;
    export const CFG_CMD_LONG_MIN = 16;
    export const DATA_CMD_LONG_MIN = 32;
    export const AUDIO_CMD_LONG_MIN = 64;
    export const TEXTCFG_CMD_LONG_MIN = 96;
    export const TEXTSTATUS_CMD_LONG_MIN = 101;
    export const CAP_CMD_LONG_MIN = 112;
    export const PMPROPRIETARY_CMD_LONG_MIN = 118;
    export const CTRL_CMD_SHORT_MIN = 128;
    export const STATUS_CMD_SHORT_MIN = 145;
    export const DATA_CMD_SHORT_MIN = 160;
    export const AUDIO_CMD_SHORT_MIN = 192;
    export const TEXTCFG_CMD_SHORT_MIN = 224;
    export const TEXTSTATUS_CMD_SHORT_MIN = 229;
    export const enum SHORT_CTRL_CMDS {
        GETSTATUS_CMD = 128,
        RESET_CMD = 129,
        GOIDLE_CMD = 130,
        GOHAVEID_CMD = 131,
        GOINUSE_CMD = 133,
        GOFINISHED_CMD = 134,
        GOREADY_CMD = 135,
        BADID_CMD = 136,
        CTRL_CMD_SHORT_MAX = 137,
    }
    export const enum SHORT_STATUS_CMDS {
        GETVERSION_CMD = 145,
        GETID_CMD = 146,
        GETUNITS_CMD = 147,
        GETSERIAL_CMD = 148,
        GETLIST_CMD = 152,
        GETUTILIZATION_CMD = 153,
        GETMOTORCURRENT_CMD = 154,
        GETODOMETER_CMD = 155,
        GETERRORCODE_CMD = 156,
        GETSERVICECODE_CMD = 157,
        GETUSERCFG1_CMD = 158,
        GETUSERCFG2_CMD = 159,
        STATUS_CMD_SHORT_MAX = 160,
    }
    export const enum SHORT_DATA_CMDS {
        GETTWORK_CMD = 160,
        GETHORIZONTAL_CMD = 161,
        GETVERTICAL_CMD = 162,
        GETCALORIES_CMD = 163,
        GETPROGRAM_CMD = 164,
        GETSPEED_CMD = 165,
        GETPACE_CMD = 166,
        GETCADENCE_CMD = 167,
        GETGRADE_CMD = 168,
        GETGEAR_CMD = 169,
        GETUPLIST_CMD = 170,
        GETUSERINFO_CMD = 171,
        GETTORQUE_CMD = 172,
        GETHRCUR_CMD = 176,
        GETHRTZONE_CMD = 178,
        GETMETS_CMD = 179,
        GETPOWER_CMD = 180,
        GETHRAVG_CMD = 181,
        GETHRMAX_CMD = 182,
        GETUSERDATA1_CMD = 190,
        GETUSERDATA2_CMD = 191,
        DATA_CMD_SHORT_MAX = 192,
    }
    export const enum SHORT_AUDIO_CMDS {
        GETAUDIOCHANNEL_CMD = 192,
        GETAUDIOVOLUME_CMD = 193,
        GETAUDIOMUTE_CMD = 194,
        AUDIO_CMD_SHORT_MAX = 195,
    }
    export const enum SHORT_TEXTCFG_CMDS {
        ENDTEXT_CMD = 224,
        DISPLAYPOPUP_CMD = 225,
        TEXTCFG_CMD_SHORT_MAX = 226,
    }
    export const enum SHORT_TEXTSTATUS_CMDS {
        GETPOPUPSTATUS_CMD = 229,
        TEXTSTATUS_CMD_SHORT_MAX = 230,
    }
    export const enum LONG_CTRL_CMDS {
        AUTOUPLOAD_CMD = 1,
        UPLIST_CMD = 2,
        UPSTATUSSEC_CMD = 4,
        UPLISTSEC_CMD = 5,
        CTRL_CMD_LONG_MAX = 6,
    }
    export const enum LONG_CFG_CMDS {
        IDDIGITS_CMD = 16,
        SETTIME_CMD = 17,
        SETDATE_CMD = 18,
        SETTIMEOUT_CMD = 19,
        SETUSERCFG1_CMD = 26,
        SETUSERCFG2_CMD = 27,
        CFG_CMD_LONG_MAX = 28,
    }
    export const enum LONG_DATA_CMDS {
        SETTWORK_CMD = 32,
        SETHORIZONTAL_CMD = 33,
        SETVERTICAL_CMD = 34,
        SETCALORIES_CMD = 35,
        SETPROGRAM_CMD = 36,
        SETSPEED_CMD = 37,
        SETGRADE_CMD = 40,
        SETGEAR_CMD = 41,
        SETUSERINFO_CMD = 43,
        SETTORQUE_CMD = 44,
        SETLEVEL_CMD = 45,
        SETTARGETHR_CMD = 48,
        SETGOAL_CMD = 50,
        SETMETS_CMD = 51,
        SETPOWER_CMD = 52,
        SETHRZONE_CMD = 53,
        SETHRMAX_CMD = 54,
        DATA_CMD_LONG_MAX = 55,
    }
    export const enum LONG_AUDIO_CMDS {
        SETCHANNELRANGE_CMD = 64,
        SETVOLUMERANGE_CMD = 65,
        SETAUDIOMUTE_CMD = 66,
        SETAUDIOCHANNEL_CMD = 67,
        SETAUDIOVOLUME_CMD = 68,
        AUDIO_CMD_LONG_MAX = 69,
    }
    export const enum LONG_TEXTCFG_CMDS {
        STARTTEXT_CMD = 96,
        APPENDTEXT_CMD = 97,
        TEXTCFG_CMD_LONG_MAX = 98,
    }
    export const enum LONG_TEXTSTATUS_CMDS {
        GETTEXTSTATUS_CMD = 101,
        TEXTSTATUS_CMD_LONG_MAX = 102,
    }
    export const enum LONG_CAP_CMDS {
        GETCAPS_CMD = 112,
        GETUSERCAPS1_CMD = 126,
        GETUSERCAPS2_CMD = 127,
        CAP_CMD_LONG_MAX = 128,
    }
    export const enum LONG_PMPROPRIETARY_CMDS {
        SETPMCFG_CMD = 118,
        SETPMDATA_CMD = 119,
        GETPMCFG_CMD = 126,
        GETPMDATA_CMD = 127,
        PMPROPRIETARY_CMD_LONG_MAX = 128,
    }
    export const GETPMCFG_CMD_SHORT_MIN = 128;
    export const GETPMCFG_CMD_LONG_MIN = 80;
    export const SETPMCFG_CMD_SHORT_MIN = 224;
    export const SETPMCFG_CMD_LONG_MIN = 0;
    export const GETPMDATA_CMD_SHORT_MIN = 160;
    export const GETPMDATA_CMD_LONG_MIN = 104;
    export const SETPMDATA_CMD_SHORT_MIN = 208;
    export const SETPMDATA_CMD_LONG_MIN = 48;
    export const enum PM_SHORT_PULL_CFG_CMDS {
        PM_GET_FW_VERSION = 128,
        PM_GET_HW_VERSION = 129,
        PM_GET_HW_ADDRESS = 130,
        PM_GET_TICK_TIMEBASE = 131,
        PM_GET_HRM = 132,
        PM_GET_SCREENSTATESTATUS = 134,
        PM_GET_RACE_LANE_REQUEST = 135,
        PM_GET_ERG_LOGICALADDR_REQUEST = 136,
        PM_GET_WORKOUTTYPE = 137,
        PM_GET_DISPLAYTYPE = 138,
        PM_GET_DISPLAYUNITS = 139,
        PM_GET_LANGUAGETYPE = 140,
        PM_GET_WORKOUTSTATE = 141,
        PM_GET_INTERVALTYPE = 142,
        PM_GET_OPERATIONALSTATE = 143,
        PM_GET_LOGCARDSTATE = 144,
        PM_GET_LOGCARDSTATUS = 145,
        PM_GET_POWERUPSTATE = 146,
        PM_GET_ROWINGSTATE = 147,
        PM_GET_SCREENCONTENT_VERSION = 148,
        PM_GET_COMMUNICATIONSTATE = 149,
        PM_GET_RACEPARTICIPANTCOUNT = 150,
        PM_GET_BATTERYLEVELPERCENT = 151,
        PM_GET_RACEMODESTATUS = 152,
        PM_GET_INTERNALLOGPARAMS = 153,
        PM_GET_PRODUCTCONFIGURATION = 154,
        PM_GET_ERGSLAVEDISCOVERREQUESTSTATUS = 155,
        PM_GET_WIFICONFIG = 156,
        PM_GET_CPUTICKRATE = 157,
        PM_GET_LOGCARDCENSUS = 158,
        PM_GET_WORKOUTINTERVALCOUNT = 159,
        GETPMCFG_CMD_SHORT_MAX = 160,
    }
    export const enum PM_SHORT_PULL_DATA_CMDS {
        PM_GET_WORKTIME = 160,
        PM_GET_PROJECTED_WORKTIME = 161,
        PM_GET_TOTAL_RESTTIME = 162,
        PM_GET_WORKDISTANCE = 163,
        PM_GET_TOTAL_WORKDISTANCE = 164,
        PM_GET_PROJECTED_WORKDISTANCE = 165,
        PM_GET_RESTDISTANCE = 166,
        PM_GET_TOTAL_RESTDISTANCE = 167,
        PM_GET_STROKE_500MPACE = 168,
        PM_GET_STROKE_POWER = 169,
        PM_GET_STROKE_CALORICBURNRATE = 170,
        PM_GET_SPLIT_AVG_500MPACE = 171,
        PM_GET_SPLIT_AVG_POWER = 172,
        PM_GET_SPLIT_AVG_CALORICBURNRATE = 173,
        PM_GET_SPLIT_AVG_CALORIES = 174,
        PM_GET_TOTAL_AVG_500MPACE = 175,
        PM_GET_TOTAL_AVG_POWER = 176,
        PM_GET_TOTAL_AVG_CALORICBURNRATE = 177,
        PM_GET_TOTAL_AVG_CALORIES = 178,
        PM_GET_STROKERATE = 179,
        PM_GET_SPLIT_AVG_STROKERATE = 180,
        PM_GET_TOTAL_AVG_STROKERATE = 181,
        PM_GET_AVG_HEARTRATE = 182,
        PM_GET_ENDING_AVG_HEARTRATE = 183,
        PM_GET_REST_AVG_HEARTRATE = 184,
        PM_GET_SPLITTIME = 185,
        PM_GET_LASTSPLITTIME = 186,
        PM_GET_SPLITDISTANCE = 187,
        PM_GET_LASTSPLITDISTANCE = 188,
        PM_GET_LASTRESTDISTANCE = 189,
        PM_GET_TARGETPACETIME = 190,
        PM_GET_STROKESTATE = 191,
        PM_GET_STROKERATESTATE = 192,
        PM_GET_DRAGFACTOR = 193,
        PM_GET_ENCODERPERIOD = 194,
        PM_GET_HEARTRATESTATE = 195,
        PM_GET_SYNCDATA = 196,
        PM_GET_SYNCDATAALL = 197,
        PM_GET_RACEDATA = 198,
        PM_GET_TICKTIME = 199,
        PM_GET_ERRORTYPE = 200,
        PM_GET_ERRORVALUE = 201,
        PM_GET_STATUSTYPE = 202,
        PM_GET_STATUSVALUE = 203,
        PM_GET_EPMSTATUS = 204,
        PM_GET_DISPLAYUPDATETIME = 205,
        PM_GET_SYNCFRACTIONALTIME = 206,
        PM_GET_RESTTIME = 207,
        GETPMDATA_CMD_SHORT_MAX = 208,
    }
    export const enum PM_SHORT_PUSH_DATA_CMDS {
        PM_SET_SYNC_DISTANCE = 208,
        PM_SET_SYNC_STROKEPACE = 209,
        PM_SET_SYNC_AVG_HEARTRATE = 210,
        PM_SET_SYNC_TIME = 211,
        PM_SET_SYNC_SPLIT_DATA = 212,
        PM_SET_SYNC_ENCODER_PERIOD = 213,
        PM_SET_SYNC_VERSION_INFO = 214,
        PM_SET_SYNC_RACETICKTIME = 215,
        PM_SET_SYNC_DATAALL = 216,
        SETPMDATA_CMD_SHORT_MAX = 217,
    }
    export const enum PM_SHORT_PUSH_CFG_CMDS {
        PM_SET_RESET_ALL = 224,
        PM_SET_RESET_ERGNUMBER = 225,
        SETPMCFG_CMD_SHORT_MAX = 226,
    }
    export const enum PM_LONG_PUSH_CFG_CMDS {
        PM_SET_BAUDRATE = 0,
        PM_SET_WORKOUTTYPE = 1,
        PM_SET_STARTTYPE = 2,
        PM_SET_WORKOUTDURATION = 3,
        PM_SET_RESTDURATION = 4,
        PM_SET_SPLITDURATION = 5,
        PM_SET_TARGETPACETIME = 6,
        PM_SET_INTERVALIDENTIFIER = 7,
        PM_SET_OPERATIONALSTATE = 8,
        PM_SET_RACETYPE = 9,
        PM_SET_WARMUPDURATION = 10,
        PM_SET_RACELANESETUP = 11,
        PM_SET_RACELANEVERIFY = 12,
        PM_SET_RACESTARTPARAMS = 13,
        PM_SET_ERGSLAVEDISCOVERYREQUEST = 14,
        PM_SET_BOATNUMBER = 15,
        PM_SET_ERGNUMBER = 16,
        PM_SET_COMMUNICATIONSTATE = 17,
        PM_SET_CMDUPLIST = 18,
        PM_SET_SCREENSTATE = 19,
        PM_CONFIGURE_WORKOUT = 20,
        PM_SET_TARGETAVGWATTS = 21,
        PM_SET_TARGETCALSPERHR = 22,
        PM_SET_INTERVALTYPE = 23,
        PM_SET_WORKOUTINTERVALCOUNT = 24,
        PM_SET_DISPLAYUPDATERATE = 25,
        PM_SET_AUTHENPASSWORD = 26,
        PM_SET_TICKTIME = 27,
        PM_SET_TICKTIMEOFFSET = 28,
        PM_SET_RACEDATASAMPLETICKS = 29,
        PM_SET_RACEOPERATIONTYPE = 30,
        PM_SET_RACESTATUSDISPLAYTICKS = 31,
        PM_SET_RACESTATUSWARNINGTICKS = 32,
        PM_SET_RACEIDLEMODEPARAMS = 33,
        PM_SET_DATETIME = 34,
        PM_SET_LANGUAGETYPE = 35,
        PM_SET_WIFICONFIG = 36,
        PM_SET_CPUTICKRATE = 37,
        PM_SET_LOGCARDUSER = 38,
        PM_SET_SCREENERRORMODE = 39,
        PM_SET_CABLETEST = 40,
        PM_SET_USER_ID = 41,
        PM_SET_USER_PROFILE = 42,
        PM_SET_HRM = 43,
        PM_SET_SENSOR_CHANNEL = 47,
        SETPMCFG_CMD_LONG_MAX = 48,
    }
    export const enum PM_LONG_PUSH_DATA_CMDS {
        PM_SET_TEAM_DISTANCE = 48,
        PM_SET_TEAM_FINISH_TIME = 49,
        PM_SET_RACEPARTICIPANT = 50,
        PM_SET_RACESTATUS = 51,
        PM_SET_LOGCARDMEMORY = 52,
        PM_SET_DISPLAYSTRING = 53,
        PM_SET_DISPLAYBITMAP = 54,
        PM_SET_LOCALRACEPARTICIPANT = 55,
        PM_SET_ANTRFMODE = 78,
        PM_SET_MEMORY = 79,
        SETPMDATA_CMD_LONG_MAX = 80,
    }
    export const enum PM_LONG_PULL_CFG_CMDS {
        PM_GET_ERGNUMBER = 80,
        PM_GET_ERGNUMBERREQUEST = 81,
        PM_GET_USERIDSTRING = 82,
        PM_GET_LOCALRACEPARTICIPANT = 83,
        PM_GET_USER_ID = 84,
        PM_GET_USER_PROFILE = 85,
        GETPMCFG_CMD_LONG_MAX = 86,
    }
    export const enum PM_LONG_PULL_DATA_CMDS {
        PM_GET_MEMORY = 104,
        PM_GET_LOGCARDMEMORY = 105,
        PM_GET_INTERNALLOGMEMORY = 106,
        PM_GET_FORCEPLOTDATA = 107,
        PM_GET_HEARTBEATDATA = 108,
        PM_GET_UI_EVENTS = 109,
        GETPMDATA_CMD_LONG_MAX = 110,
    }
    export const PREVOK_FLG = 0;
    export const PREVREJECT_FLG = 16;
    export const PREVBAD_FLG = 32;
    export const PREVNOTRDY_FLG = 48;
    export const PREVFRAMESTATUS_MSK = 48;
    export const SLAVESTATE_ERR_FLG = 0;
    export const SLAVESTATE_RDY_FLG = 1;
    export const SLAVESTATE_IDLE_FLG = 2;
    export const SLAVESTATE_HAVEID_FLG = 3;
    export const SLAVESTATE_INUSE_FLG = 5;
    export const SLAVESTATE_PAUSE_FLG = 6;
    export const SLAVESTATE_FINISH_FLG = 7;
    export const SLAVESTATE_MANUAL_FLG = 8;
    export const SLAVESTATE_OFFLINE_FLG = 9;
    export const FRAMECNT_FLG = 128;
    export const SLAVESTATE_MSK = 15;
    export const AUTOSTATUS_FLG = 1;
    export const UPSTATUS_FLG = 2;
    export const UPLIST_FLG = 4;
    export const ACK_FLG = 16;
    export const EXTERNCONTROL_FLG = 64;
    export const CAPCODE_PROTOCOL = 0;
    export const CAPCODE_POWER = 1;
    export const CAPCODE_TEXT = 2;
    export const DISTANCE_MILE_0_0 = 1;
    export const DISTANCE_MILE_0_1 = 2;
    export const DISTANCE_MILE_0_2 = 3;
    export const DISTANCE_MILE_0_3 = 4;
    export const DISTANCE_FEET_0_0 = 5;
    export const DISTANCE_INCH_0_0 = 6;
    export const WEIGHT_LBS_0_0 = 7;
    export const WEIGHT_LBS_0_1 = 8;
    export const DISTANCE_FEET_1_0 = 10;
    export const SPEED_MILEPERHOUR_0_0 = 16;
    export const SPEED_MILEPERHOUR_0_1 = 17;
    export const SPEED_MILEPERHOUR_0_2 = 18;
    export const SPEED_FEETPERMINUTE_0_0 = 19;
    export const DISTANCE_KM_0_0 = 33;
    export const DISTANCE_KM_0_1 = 34;
    export const DISTANCE_KM_0_2 = 35;
    export const DISTANCE_METER_0_0 = 36;
    export const DISTANCE_METER_0_1 = 37;
    export const DISTANCE_CM_0_0 = 38;
    export const WEIGHT_KG_0_0 = 39;
    export const WEIGHT_KG_0_1 = 40;
    export const SPEED_KMPERHOUR_0_0 = 48;
    export const SPEED_KMPERHOUR_0_1 = 49;
    export const SPEED_KMPERHOUR_0_2 = 50;
    export const SPEED_METERPERMINUTE_0_0 = 51;
    export const PACE_MINUTEPERMILE_0_0 = 55;
    export const PACE_MINUTEPERKM_0_0 = 56;
    export const PACE_SECONDSPERKM_0_0 = 57;
    export const PACE_SECONDSPERMILE_0_0 = 58;
    export const DISTANCE_FLOORS_0_0 = 65;
    export const DISTANCE_FLOORS_0_1 = 66;
    export const DISTANCE_STEPS_0_0 = 67;
    export const DISTANCE_REVS_0_0 = 68;
    export const DISTANCE_STRIDES_0_0 = 69;
    export const DISTANCE_STROKES_0_0 = 70;
    export const MISC_BEATS_0_0 = 71;
    export const ENERGY_CALORIES_0_0 = 72;
    export const GRADE_PERCENT_0_0 = 74;
    export const GRADE_PERCENT_0_2 = 75;
    export const GRADE_PERCENT_0_1 = 76;
    export const CADENCE_FLOORSPERMINUTE_0_1 = 79;
    export const CADENCE_FLOORSPERMINUTE_0_0 = 80;
    export const CADENCE_STEPSPERMINUTE_0_0 = 81;
    export const CADENCE_REVSPERMINUTE_0_0 = 82;
    export const CADENCE_STRIDESPERMINUTE_0_0 = 83;
    export const CADENCE_STROKESPERMINUTE_0_0 = 84;
    export const MISC_BEATSPERMINUTE_0_0 = 85;
    export const BURN_CALORIESPERMINUTE_0_0 = 86;
    export const BURN_CALORIESPERHOUR_0_0 = 87;
    export const POWER_WATTS_0_0 = 88;
    export const ENERGY_INCHLB_0_0 = 90;
    export const ENERGY_FOOTLB_0_0 = 91;
    export const ENERGY_NM_0_0 = 92;
    export const KG_TO_LBS = 2.2046;
    export const LBS_TO_KG: number;
    export const IDDIGITS_MIN = 2;
    export const IDDIGITS_MAX = 5;
    export const DEFAULT_IDDIGITS = 5;
    export const DEFAULT_ID = 0;
    export const MANUAL_ID = 999999999;
    export const DEFAULT_SLAVESTATE_TIMEOUT = 20;
    export const PAUSED_SLAVESTATE_TIMEOUT = 220;
    export const INUSE_SLAVESTATE_TIMEOUT = 6;
    export const IDLE_SLAVESTATE_TIMEOUT = 30;
    export const BASE_YEAR = 1900;
    export const DEFAULT_STATUSUPDATE_INTERVAL = 256;
    export const DEFAULT_CMDUPLIST_INTERVAL = 256;
}
declare module "ergometer/pubsub" {
    /**
     *
     * Created by tijmen on 01-06-15.
     *
     * License:
     *
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
    export interface ISubscription {
        (...args: any[]): void;
    }
    export interface ISubscriptionItem {
        object: any;
        func: ISubscription;
    }
    export interface IDictionary {
        [name: string]: ISubscriptionItem[];
    }
    export class PubSub {
        private registry;
        pub(name: string, ...args: any[]): void;
        pubASync(name: string, ...args: any[]): void;
        sub(applyObject: any, name: string, fn: ISubscription): void;
        unsub(name: string, fn: ISubscription): void;
        subscribeCount(name: string): number;
    }
    export interface ISubscriptionChanged {
        (sender: any, count: number): void;
    }
    export class Event<T extends ISubscription> {
        protected _subscribed: ISubscriptionItem[];
        protected _subScriptionChangedEvent: ISubscriptionChanged;
        sub(applyObject: any, event: T): void;
        unsub(event: T): void;
        readonly pub: T;
        readonly pubAsync: T;
        readonly count: number;
        registerChangedEvent(func: ISubscriptionChanged): void;
        protected doChangedEvent(): void;
        protected findSubscription(event: T): ISubscriptionItem;
        protected doPub(args: any[]): void;
    }
}
declare module "ergometer/ble/Driver" {
    /**
     * Created by tijmen on 01-02-16.
     */
    export interface IDevice {
        address: string;
        name: string;
        rssi: number;
        _internalDevice: any;
    }
    export interface IFoundFunc {
        (device: IDevice): void;
    }
    export interface IDriver {
        startScan(foundFn?: IFoundFunc): Promise<void>;
        stopScan(): void;
        connect(device: IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    }
}
declare module "ergometer/typedefinitions" {
    /**
     * Created by tijmen on 28-12-15.
     */
    import * as pubSub from "ergometer/pubsub";
    export const enum RowingSampleRate {
        rate1sec = 0,
        rate500ms = 1,
        rate250ms = 2,
        rate100ms = 3,
    }
    export const enum ErgmachineType {
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
    export const enum WorkoutType {
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
    export const enum IntervalType {
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
    export const enum WorkoutState {
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
    export const enum RowingState {
        inactive = 0,
        active = 1,
    }
    export const enum StrokeState {
        waitingForWheelToReachMinSpeedState = 0,
        waitingForWheelToAccelerateState = 1,
        drivingState = 2,
        dwellingAfterDriveState = 3,
        recoveryState = 4,
    }
    export const enum WorkoutDurationType {
        timeDuration = 0,
        caloriesDuration = 64,
        distanceDuration = 128,
        wattsDuration = 192,
    }
    export const enum SampleRate {
        rate1sec = 0,
        rate500ms = 1,
        rate250ms = 2,
        rate100ms = 3,
    }
    export const enum Program {
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
    export const enum Unit {
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
    export enum MonitorConnectionState {
        inactive = 0,
        deviceReady = 1,
        scanning = 2,
        connecting = 3,
        connected = 4,
        servicesFound = 5,
        readyForCommunication = 6,
    }
    export enum LogLevel {
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
    }
    export interface ParsedCSafeCommand {
        command: number;
        detailCommand: number;
        data: Uint8Array;
    }
    export interface IPerformanceMonitor {
        [data: string]: any;
    }
}
declare module "ergometer/csafe/command_core" {
    import * as ergometer from "ergometer/typedefinitions";
    export interface IVersion {
        ManufacturerId: number;
        CID: number;
        Model: number;
        HardwareVersion: number;
        FirmwareVersion: number;
    }
    export interface ICommandGetVersion extends ICommandParamsBase {
        onDataReceived: (version: IVersion) => void;
    }
    export interface ICommandParamsBase {
        onError?: ergometer.ErrorHandler;
        onDataReceived?: (data: any) => void;
    }
    export interface IRawCommand {
        waitForResponse: boolean;
        command: number;
        detailCommand?: number;
        data?: number[];
        onDataReceived?: (data: DataView) => void;
        onError?: ergometer.ErrorHandler;
        _timestamp?: number;
    }
    export interface ICommandStrokeState extends ICommandParamsBase {
        onDataReceived: (state: ergometer.StrokeState) => void;
    }
    export interface ICommandPowerCurve {
        onDataReceived: (curve: number[]) => void;
        onError?: ergometer.ErrorHandler;
    }
    export interface ICommandProgramParams extends ICommandParamsBase {
        value: ergometer.Program;
    }
    export interface ICommandTimeParams extends ICommandParamsBase {
        hour: number;
        minute: number;
        second: number;
    }
    export interface IBuffer {
        rawCommands: IRawCommand[];
        clear(): IBuffer;
        addRawCommand(info: IRawCommand): any;
        send(success?: () => void, error?: ergometer.ErrorHandler): Promise<void>;
        getPowerCurve(params: ICommandPowerCurve): IBuffer;
        setProgram(params: ICommandProgramParams): IBuffer;
        getStrokeState(params: ICommandStrokeState): IBuffer;
        setTime(params: ICommandTimeParams): IBuffer;
        getVersion(params: ICommandGetVersion): IBuffer;
    }
    export interface ICommand {
        (buffer: IBuffer, monitor: ergometer.IPerformanceMonitor): void;
    }
    export class CommandManager {
        private _commands;
        register(createCommand: ICommand): void;
        apply(buffer: IBuffer, monitor: ergometer.IPerformanceMonitor): void;
    }
    export let commandManager: CommandManager;
    export interface ICommandSetStandardValue extends ICommandParamsBase {
        value: number;
    }
    export function registerStandardSet<T extends ICommandParamsBase>(functionName: string, command: number, setParams: (params: T) => number[]): void;
    export function registerStandardSetConfig<T extends ICommandParamsBase>(functionName: string, command: number, setParams: (params: T) => number[]): void;
    export function registerStandardShortGet<T extends ICommandParamsBase, U>(functionName: string, command: number, converter: (data: DataView) => U): void;
}
declare module "ergometer/utils" {
    export function copyArrayBuffer(src: ArrayBuffer): ArrayBuffer;
    /**
     * Interpret byte buffer as unsigned little endian 32 bit integer.
     * Returns converted number.
     * @param {ArrayBuffer} data - Input buffer.
     * @param {number} offset - Start of data.
     * @return Converted number.
     * @public
     */
    export function getUint24(data: DataView, offset: number): number;
    export function bufferToString(buf: ArrayBuffer): any;
    export function valueToNullValue(value: number, nullValue: number): number;
    export function isDefined(variable: any): boolean;
    /**
     * Returns the integer i in hexadecimal string form,
     * with leading zeroes, such that
     * the resulting string is at least byteCount*2 characters long.
     * @param {int} i
     * @param {int} byteCount
     * @public
     */
    export function toHexString(i: number, byteCount: number): string;
    /**
     * Takes a ArrayBuffer or TypedArray and returns its hexadecimal representation.
     * No spaces or linebreaks.
     * @param data
     * @public
     */
    export function typedArrayToHexString(data: ArrayBuffer | Uint8Array): string;
    export function hexStringToTypedArray(hexData: string): Uint8Array;
    export function getTime(): number;
}
declare module "ergometer/csafe/long_commands" {
    /**
     * Created by tijmen on 19-01-16.
     *
     * Extensible frame work so you can add your own csafe commands to the buffer
     *
     */
    import { IBuffer, ICommandParamsBase, ICommandSetStandardValue } from "ergometer/csafe/command_core";
    import * as ergometer from "ergometer/typedefinitions";
    export interface ICommandStrokeState extends ICommandParamsBase {
        onDataReceived: (state: ergometer.StrokeState) => void;
    }
    export interface IBuffer {
        getStrokeState(params: ICommandStrokeState): IBuffer;
    }
    export interface ICommandPowerCurve {
        onDataReceived: (curve: number[]) => void;
        onError?: ergometer.ErrorHandler;
    }
    export interface IBuffer {
        getPowerCurve(params: ICommandPowerCurve): IBuffer;
    }
    export interface ICommandProgramParams extends ICommandParamsBase {
        value: ergometer.Program;
    }
    export interface IBuffer {
        setProgram(params: ICommandProgramParams): IBuffer;
    }
    export interface ICommandTimeParams extends ICommandParamsBase {
        hour: number;
        minute: number;
        second: number;
    }
    export interface IBuffer {
        setTime(params: ICommandTimeParams): IBuffer;
    }
    export interface ICommandDateParams extends ICommandParamsBase {
        year: number;
        month: number;
        day: number;
    }
    export interface IBuffer {
        setDate(params: ICommandDateParams): IBuffer;
    }
    export interface IBuffer {
        setTimeout(params: ICommandSetStandardValue): IBuffer;
    }
    export interface IBuffer {
        setWork(params: ICommandTimeParams): IBuffer;
    }
    export interface ICommandDistanceParams extends ICommandSetStandardValue {
        unit: ergometer.Unit;
    }
    export interface IBuffer {
        setDistance(params: ICommandDistanceParams): IBuffer;
    }
    export interface IBuffer {
        setTotalCalories(params: ICommandSetStandardValue): IBuffer;
    }
    export interface ICommandPowerParams extends ICommandSetStandardValue {
        unit: ergometer.Unit;
    }
    export interface IBuffer {
        setPower(params: ICommandPowerParams): IBuffer;
    }
}
declare module "ergometer/csafe/short_commands" {
    /**
     * Created by tijmen on 19-01-16.
     *
     * Extensible frame work so you can add your own csafe commands to the buffer
     *
     */
    import { IBuffer, ICommandParamsBase } from "ergometer/csafe/command_core";
    import * as ergometer from "ergometer/typedefinitions";
    export interface IDistance {
        value: number;
        unit: ergometer.Unit;
    }
    export interface ICommandGetDistance extends ICommandParamsBase {
        onDataReceived: (version: IDistance) => void;
    }
    export interface IBuffer {
        getDistance(params: ICommandParamsBase): IBuffer;
    }
}
declare module "ergometer/csafe/push_config_commands" {
    /**
     * Created by tijmen on 06-02-16.
     */
    import { ICommandParamsBase } from "ergometer/csafe/command_core";
    import * as ergometer from "ergometer/typedefinitions";
    export interface ICommandSetWorkOutType extends ICommandParamsBase {
        value: ergometer.WorkoutType;
    }
    export interface IBuffer {
        setWorkoutType(params: ICommandSetWorkOutType): IBuffer;
    }
}
declare module "ergometer/functionQueue" {
    /**
     * Created by tijmen on 04/07/2017.
     *
     * queue function calls which returns a promise, converted to typescript
     * needed as work around for web blue tooth, this ensures that only one call is processed at at time
     *
     *
     */
    /**
     * It limits concurrently executed promises
     *
     * @param {Number} [maxPendingPromises=Infinity] max number of concurrently executed promises
     * @param {Number} [maxQueuedPromises=Infinity]  max number of queued promises
     * @constructor
     *
     * @example
     *
     * const queue = new Queue(1);
     *
     * queue.add(function () {
     *     // resolve of this promise will resume next request
     *     return downloadTarballFromGithub(url, file);
     * })
     * .then(function (file) {
     *     doStuffWith(file);
     * });
     *
     * queue.add(function () {
     *     return downloadTarballFromGithub(url, file);
     * })
     * // This request will be paused
     * .then(function (file) {
     *     doStuffWith(file);
     * });
     */
    export interface IPromiseFunction {
        (...args: any[]): Promise<any | void>;
    }
    export class FunctionQueue {
        private maxPendingPromises;
        private maxQueuedPromises;
        private pendingPromises;
        private queue;
        constructor(maxPendingPromises?: number, maxQueuedPromises?: number);
        /**
         * @param {promiseGenerator}  a function which returns a promise
         * @param {context} the object which is the context where the function is called in
         * @param  {params} array of parameters for the function
         * @return {Promise} promise which is resolved when the function is acually called
         */
        add(promiseGenerator: IPromiseFunction, context: any, ...params: any[]): Promise<any | void>;
        /**
         * Number of simultaneously running promises (which are resolving)
         *
         * @return {number}
         */
        getPendingLength(): number;
        /**
         * Number of queued promises (which are waiting)
         *
         * @return {number}
         */
        getQueueLength(): number;
        /**
         * @param {*} value
         * @returns {LocalPromise}
         */
        private resolveWith(value);
        /**
         * @returns {boolean} true if first item removed from queue
         * @private
         */
        private _dequeue();
    }
}
declare module "ergometer/ble/DriverBleat" {
    /**
     * Created by tijmen on 01-02-16.
     */
    import { IDevice, IDriver, IFoundFunc } from "ergometer/ble/Driver";
    import * as ergometer from "ergometer/typedefinitions";
    export class DriverBleat implements IDriver {
        performanceMonitor: ergometer.IPerformanceMonitor;
        private _device;
        connect(device: IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        startScan(foundFn?: IFoundFunc): Promise<void>;
        stopScan(): Promise<void>;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
        private getCharacteristic(serviceUid, characteristicUid);
    }
}
declare module "ergometer/ble/DriverSimpleBLE" {
    /**
     * Created by tijmen on 01-02-16.
     *
     * see simpleBLE.d.ts for the definitions of the simpleBLE
     * It assumes that there simple ble is already imported as a var named simpleBLE
     *
     */
    import { IDevice, IDriver, IFoundFunc } from "ergometer/ble/Driver";
    import * as ergometer from "ergometer/typedefinitions";
    export class DriverSimpleBLE implements IDriver {
        performanceMonitor: ergometer.IPerformanceMonitor;
        connect(device: IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        startScan(foundFn?: IFoundFunc): Promise<void>;
        stopScan(): Promise<void>;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
    }
}
declare module "ergometer/ble/typedefinitions" {
    /**
     * Created by tijmen on 16-01-16.
     */
    export const PMDEVICE = "ce060000-43e5-11e4-916c-0800200c9a66";
    export const PMDEVICE_INFO_SERVICE = "ce060010-43e5-11e4-916c-0800200c9a66";
    export const PMCONTROL_SERVICE = "ce060020-43e5-11e4-916c-0800200c9a66";
    export const PMROWING_SERVICE = "ce060030-43e5-11e4-916c-0800200c9a66";
    export const MODELNUMBER_CHARACTERISIC = "ce060011-43e5-11e4-916c-0800200c9a66";
    export const SERIALNUMBER_CHARACTERISTIC = "ce060012-43e5-11e4-916c-0800200c9a66";
    export const HWREVISION_CHARACTERISIC = "ce060013-43e5-11e4-916c-0800200c9a66";
    export const FWREVISION_CHARACTERISIC = "ce060014-43e5-11e4-916c-0800200c9a66";
    export const MANUFNAME_CHARACTERISIC = "ce060015-43e5-11e4-916c-0800200c9a66";
    export const MACHINETYPE_CHARACTERISIC = "ce060016-43e5-11e4-916c-0800200c9a66";
    export const TRANSMIT_TO_PM_CHARACTERISIC = "ce060021-43e5-11e4-916c-0800200c9a66";
    export const RECEIVE_FROM_PM_CHARACTERISIC = "ce060022-43e5-11e4-916c-0800200c9a66";
    export const ROWING_STATUS_CHARACTERISIC = "ce060031-43e5-11e4-916c-0800200c9a66";
    export const EXTRA_STATUS1_CHARACTERISIC = "ce060032-43e5-11e4-916c-0800200c9a66";
    export const EXTRA_STATUS2_CHARACTERISIC = "ce060033-43e5-11e4-916c-0800200c9a66";
    export const ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC = "ce060034-43e5-11e4-916c-0800200c9a66";
    export const STROKE_DATA_CHARACTERISIC = "ce060035-43e5-11e4-916c-0800200c9a66";
    export const EXTRA_STROKE_DATA_CHARACTERISIC = "ce060036-43e5-11e4-916c-0800200c9a66";
    export const SPLIT_INTERVAL_DATA_CHARACTERISIC = "ce060037-43e5-11e4-916c-0800200c9a66";
    export const EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC = "ce060038-43e5-11e4-916c-0800200c9a66";
    export const ROWING_SUMMARY_CHARACTERISIC = "ce060039-43e5-11e4-916c-0800200c9a66";
    export const EXTRA_ROWING_SUMMARY_CHARACTERISIC = "ce06003a-43e5-11e4-916c-0800200c9a66";
    export const HEART_RATE_BELT_INFO_CHARACTERISIC = "ce06003b-43e5-11e4-916c-0800200c9a66";
    export const MULTIPLEXED_INFO_CHARACTERISIC = "ce060080-43e5-11e4-916c-0800200c9a66";
    export const NOTIFICATION_DESCRIPTOR = "00002902-0000-1000-8000-00805f9b34fb";
    export const PACKET_SIZE = 20;
    export const enum PM_Rowing_Status_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        DISTANCE_LO = 3,
        DISTANCE_MID = 4,
        DISTANCE_HI = 5,
        WORKOUT_TYPE = 6,
        INTERVAL_TYPE = 7,
        WORKOUT_STATE = 8,
        ROWING_STATE = 9,
        STROKE_STATE = 10,
        TOTAL_WORK_DISTANCE_LO = 11,
        TOTAL_WORK_DISTANCE_MID = 12,
        TOTAL_WORK_DISTANCE_HI = 13,
        WORKOUT_DURATION_LO = 14,
        WORKOUT_DURATION_MID = 15,
        WORKOUT_DURATION_HI = 16,
        WORKOUT_DURATION_TYPE = 17,
        DRAG_FACTOR = 18,
        BLE_PAYLOAD_SIZE = 19,
    }
    export const enum PM_Extra_Status1_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        SPEED_LO = 3,
        SPEED_HI = 4,
        STROKE_RATE = 5,
        HEARTRATE = 6,
        CURRENT_PACE_LO = 7,
        CURRENT_PACE_HI = 8,
        AVG_PACE_LO = 9,
        AVG_PACE_HI = 10,
        REST_DISTANCE_LO = 11,
        REST_DISTANCE_HI = 12,
        REST_TIME_LO = 13,
        REST_TIME_MID = 14,
        REST_TIME_HI = 15,
        BLE_PAYLOAD_SIZE = 16,
    }
    export const enum PM_Mux_Extra_Status1_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        SPEED_LO = 3,
        SPEED_HI = 4,
        STROKE_RATE = 5,
        HEARTRATE = 6,
        CURRENT_PACE_LO = 7,
        CURRENT_PACE_HI = 8,
        AVG_PACE_LO = 9,
        AVG_PACE_HI = 10,
        REST_DISTANCE_LO = 11,
        REST_DISTANCE_HI = 12,
        REST_TIME_LO = 13,
        REST_TIME_MID = 14,
        REST_TIME_HI = 15,
        AVG_POWER_LO = 16,
        AVG_POWER_HI = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Extra_Status2_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        INTERVAL_COUNT = 3,
        AVG_POWER_LO = 4,
        AVG_POWER_HI = 5,
        TOTAL_CALORIES_LO = 6,
        TOTAL_CALORIES_HI = 7,
        SPLIT_INTERVAL_AVG_PACE_LO = 8,
        SPLIT_INTERVAL_AVG_PACE_HI = 9,
        SPLIT_INTERVAL_AVG_POWER_LO = 10,
        SPLIT_INTERVAL_AVG_POWER_HI = 11,
        SPLIT_INTERVAL_AVG_CALORIES_LO = 12,
        SPLIT_INTERVAL_AVG_CALORIES_HI = 13,
        LAST_SPLIT_TIME_LO = 14,
        LAST_SPLIT_TIME_MID = 15,
        LAST_SPLIT_TIME_HI = 16,
        LAST_SPLIT_DISTANCE_LO = 17,
        LAST_SPLIT_DISTANCE_MID = 18,
        LAST_SPLIT_DISTANCE_HI = 19,
        BLE_PAYLOAD_SIZE = 20,
    }
    export const enum PM_Mux_Extra_Status2_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        INTERVAL_COUNT = 3,
        TOTAL_CALORIES_LO = 4,
        TOTAL_CALORIES_HI = 5,
        SPLIT_INTERVAL_AVG_PACE_LO = 6,
        SPLIT_INTERVAL_AVG_PACE_HI = 7,
        SPLIT_INTERVAL_AVG_POWER_LO = 8,
        SPLIT_INTERVAL_AVG_POWER_HI = 9,
        SPLIT_INTERVAL_AVG_CALORIES_LO = 10,
        SPLIT_INTERVAL_AVG_CALORIES_HI = 11,
        LAST_SPLIT_TIME_LO = 12,
        LAST_SPLIT_TIME_MID = 13,
        LAST_SPLIT_TIME_HI = 14,
        LAST_SPLIT_DISTANCE_LO = 15,
        LAST_SPLIT_DISTANCE_MID = 16,
        LAST_SPLIT_DISTANCE_HI = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Stroke_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        DISTANCE_LO = 3,
        DISTANCE_MID = 4,
        DISTANCE_HI = 5,
        DRIVE_LENGTH = 6,
        DRIVE_TIME = 7,
        STROKE_RECOVERY_TIME_LO = 8,
        STROKE_RECOVERY_TIME_HI = 9,
        STROKE_DISTANCE_LO = 10,
        STROKE_DISTANCE_HI = 11,
        PEAK_DRIVE_FORCE_LO = 12,
        PEAK_DRIVE_FORCE_HI = 13,
        AVG_DRIVE_FORCE_LO = 14,
        AVG_DRIVE_FORCE_HI = 15,
        WORK_PER_STROKE_LO = 16,
        WORK_PER_STROKE_HI = 17,
        STROKE_COUNT_LO = 18,
        STROKE_COUNT_HI = 19,
        BLE_PAYLOAD_SIZE = 20,
    }
    export const enum PM_Mux_Stroke_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        DISTANCE_LO = 3,
        DISTANCE_MID = 4,
        DISTANCE_HI = 5,
        DRIVE_LENGTH = 6,
        DRIVE_TIME = 7,
        STROKE_RECOVERY_TIME_LO = 8,
        STROKE_RECOVERY_TIME_HI = 9,
        STROKE_DISTANCE_LO = 10,
        STROKE_DISTANCE_HI = 11,
        PEAK_DRIVE_FORCE_LO = 12,
        PEAK_DRIVE_FORCE_HI = 13,
        AVG_DRIVE_FORCE_LO = 14,
        AVG_DRIVE_FORCE_HI = 15,
        STROKE_COUNT_LO = 16,
        STROKE_COUNT_HI = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Extra_Stroke_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        STROKE_POWER_LO = 3,
        STROKE_POWER_HI = 4,
        STROKE_CALORIES_LO = 5,
        STROKE_CALORIES_HI = 6,
        STROKE_COUNT_LO = 7,
        STROKE_COUNT_HI = 8,
        PROJ_WORK_TIME_LO = 9,
        PROJ_WORK_TIME_MID = 10,
        PROJ_WORK_TIME_HI = 11,
        PROJ_WORK_DIST_LO = 12,
        PROJ_WORK_DIST_MID = 13,
        PROJ_WORK_DIST_HI = 14,
        BLE_PAYLOAD_SIZE = 15,
    }
    export const enum PM_Mux_Extra_Stroke_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        STROKE_POWER_LO = 3,
        STROKE_POWER_HI = 4,
        STROKE_CALORIES_LO = 5,
        STROKE_CALORIES_HI = 6,
        STROKE_COUNT_LO = 7,
        STROKE_COUNT_HI = 8,
        PROJ_WORK_TIME_LO = 9,
        PROJ_WORK_TIME_MID = 10,
        PROJ_WORK_TIME_HI = 11,
        PROJ_WORK_DIST_LO = 12,
        PROJ_WORK_DIST_MID = 13,
        PROJ_WORK_DIST_HI = 14,
        WORK_PER_STROKE_LO = 15,
        WORK_PER_STROKE_HI = 16,
        BLE_PAYLOAD_SIZE = 17,
    }
    export const enum PM_Split_Interval_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        DISTANCE_LO = 3,
        DISTANCE_MID = 4,
        DISTANCE_HI = 5,
        SPLIT_TIME_LO = 6,
        SPLIT_TIME_MID = 7,
        SPLIT_TIME_HI = 8,
        SPLIT_DISTANCE_LO = 9,
        SPLIT_DISTANCE_MID = 10,
        SPLIT_DISTANCE_HI = 11,
        REST_TIME_LO = 12,
        REST_TIME_HI = 13,
        REST_DISTANCE_LO = 14,
        REST_DISTANCE_HI = 15,
        TYPE = 16,
        INT_NUMBER = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Extra_Split_Interval_Data_BLE_Payload {
        ELAPSED_TIME_LO = 0,
        ELAPSED_TIME_MID = 1,
        ELAPSED_TIME_HI = 2,
        STROKE_RATE = 3,
        WORK_HR = 4,
        REST_HR = 5,
        AVG_PACE_LO = 6,
        AVG_PACE_HI = 7,
        CALORIES_LO = 8,
        CALORIES_HI = 9,
        AVG_CALORIES_LO = 10,
        AVG_CALORIES_HI = 11,
        SPEED_LO = 12,
        SPEED_HI = 13,
        POWER_LO = 14,
        POWER_HI = 15,
        AVG_DRAG_FACTOR = 16,
        INT_NUMBER = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Workout_Summary_Data_BLE_Payload {
        LOG_DATE_LO = 0,
        LOG_DATE_HI = 1,
        LOG_TIME_LO = 2,
        LOG_TIME_HI = 3,
        ELAPSED_TIME_LO = 4,
        ELAPSED_TIME_MID = 5,
        ELAPSED_TIME_HI = 6,
        DISTANCE_LO = 7,
        DISTANCE_MID = 8,
        DISTANCE_HI = 9,
        AVG_SPM = 10,
        END_HR = 11,
        AVG_HR = 12,
        MIN_HR = 13,
        MAX_HR = 14,
        AVG_DRAG_FACTOR = 15,
        RECOVERY_HR = 16,
        WORKOUT_TYPE = 17,
        AVG_PACE_LO = 18,
        AVG_PACE_HI = 19,
        BLE_PAYLOAD_SIZE = 20,
    }
    export const enum PM_Mux_Workout_Summary_Data_BLE_Payload {
        LOG_DATE_LO = 0,
        LOG_DATE_HI = 1,
        LOG_TIME_LO = 2,
        LOG_TIME_HI = 3,
        ELAPSED_TIME_LO = 4,
        ELAPSED_TIME_MID = 5,
        ELAPSED_TIME_HI = 6,
        DISTANCE_LO = 7,
        DISTANCE_MID = 8,
        DISTANCE_HI = 9,
        AVG_SPM = 10,
        END_HR = 11,
        AVG_HR = 12,
        MIN_HR = 13,
        MAX_HR = 14,
        AVG_DRAG_FACTOR = 15,
        RECOVERY_HR = 16,
        WORKOUT_TYPE = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Extra_Workout_Summary_Data_BLE_Payload {
        LOG_DATE_LO = 0,
        LOG_DATE_HI = 1,
        LOG_TIME_LO = 2,
        LOG_TIME_HI = 3,
        SPLIT_INT_TYPE = 4,
        SPLIT_INT_SIZE_LO = 5,
        SPLIT_INT_SIZE_HI = 6,
        SPLIT_INT_COUNT = 7,
        WORK_CALORIES_LO = 8,
        WORK_CALORIES_HI = 9,
        WATTS_LO = 10,
        WATTS_HI = 11,
        TOTAL_REST_DISTANCE_LO = 12,
        TOTAL_REST_DISTANCE_MID = 13,
        TOTAL_REST_DISTANCE_HI = 14,
        INTERVAL_REST_TIME_LO = 15,
        INTERVAL_REST_TIME_HI = 16,
        AVG_CALORIES_LO = 17,
        AVG_CALORIES_HI = 18,
        DATA_BLE_PAYLOAD_SIZE = 19,
    }
    export const enum PM_Mux_Extra_Workout_Summary_Data_BLE_Payload {
        LOG_DATE_LO = 0,
        LOG_DATE_HI = 1,
        LOG_TIME_LO = 2,
        LOG_TIME_HI = 3,
        SPLIT_INT_SIZE_LO = 4,
        SPLIT_INT_SIZE_HI = 5,
        SPLIT_INT_COUNT = 6,
        WORK_CALORIES_LO = 7,
        WORK_CALORIES_HI = 8,
        WATTS_LO = 9,
        WATTS_HI = 10,
        TOTAL_REST_DISTANCE_LO = 11,
        TOTAL_REST_DISTANCE_MID = 12,
        TOTAL_REST_DISTANCE_HI = 13,
        INTERVAL_REST_TIME_LO = 14,
        INTERVAL_REST_TIME_HI = 15,
        AVG_CALORIES_LO = 16,
        AVG_CALORIES_HI = 17,
        BLE_PAYLOAD_SIZE = 18,
    }
    export const enum PM_Mux_Extra_Workout_Summary2_Data_BLE_Payload {
        LOG_DATE_LO = 0,
        LOG_DATE_HI = 1,
        LOG_TIME_LO = 2,
        LOG_TIME_HI = 3,
        AVG_PACE_LO = 4,
        AVG_PACE_HI = 5,
        GAME_ID = 6,
        GAME_SCORE_LO = 7,
        GAME_SCORE_HI = 8,
        MACHINE_TYPE = 9,
        DATA_BLE_PAYLOAD_SIZE = 10,
    }
    export const enum PM_Heart_Rate_Belt_Info_BLE_Payload {
        MANUFACTURER_ID = 0,
        DEVICE_TYPE = 1,
        BELT_ID_LO = 2,
        BELT_ID_MID_LO = 3,
        BELT_ID_MID_HI = 4,
        BELT_ID_HI = 5,
        BLE_PAYLOAD_SIZE = 6,
    }
    export const enum PM_Multiplexed_Info_Type_ID {
        ROWING_GENERAL_STATUS = 49,
        ROWING_ADDITIONAL_STATUS1 = 50,
        ROWING_ADDITIONAL_STATUS2 = 51,
        STROKE_DATA_STATUS = 53,
        EXTRA_STROKE_DATA_STATUS = 54,
        SPLIT_INTERVAL_STATUS = 55,
        EXTRA_SPLIT_INTERVAL_STATUS = 56,
        WORKOUT_SUMMARY_STATUS = 57,
        EXTRA_WORKOUT_SUMMARY_STATUS1 = 58,
        HEART_RATE_BELT_INFO_STATUS = 59,
        EXTRA_WORKOUT_SUMMARY_STATUS2 = 60,
    }
}
declare module "ergometer/ble/DriverWebBlueTooth" {
    /**
     * Created by tijmen on 01-02-16.
     */
    import { IDevice, IDriver, IFoundFunc } from "ergometer/ble/Driver";
    import * as ergometer from "ergometer/typedefinitions";
    export function hasWebBlueTooth(): boolean;
    export class DriverWebBlueTooth implements IDriver {
        private _device;
        private _server;
        private _disconnectFn;
        private _listenerMap;
        private _listerCharacteristicMap;
        private _performanceMonitor;
        constructor(performanceMonitor: ergometer.IPerformanceMonitor);
        connect(device: IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        startScan(foundFn?: IFoundFunc): Promise<void>;
        stopScan(): Promise<void>;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
        private getCharacteristic(serviceUid, characteristicUid);
        private onDisconnected(event);
        private clearConnectionVars();
        private onCharacteristicValueChanged(event);
    }
}
declare module "ergometer/ble/RecordingDriver" {
    /**
     * Created by tijmen on 16-02-16.
     */
    import * as driver from "ergometer/ble/Driver";
    import * as ergometer from "ergometer/typedefinitions";
    export interface IRecordDevice {
        address: string;
        name: string;
        rssi: number;
    }
    export interface IRecordCharacteristic {
        serviceUIID: string;
        characteristicUUID: string;
        data?: string;
    }
    export enum RecordingEventType {
        startScan = 0,
        scanFoundFn = 1,
        stopScan = 2,
        connect = 3,
        disconnectFn = 4,
        disconnect = 5,
        writeCharacteristic = 6,
        readCharacteristic = 7,
        enableNotification = 8,
        notificationReceived = 9,
        disableNotification = 10,
    }
    export interface IRecordingItem {
        timeStamp: number;
        eventType: string;
        timeStampReturn?: number;
        data?: IRecordCharacteristic | IRecordDevice;
        error?: any;
    }
    export class RecordingDriver implements driver.IDriver {
        _performanceMonitor: ergometer.IPerformanceMonitor;
        private _realDriver;
        private _startTime;
        private _events;
        constructor(performanceMonitor: ergometer.IPerformanceMonitor, realDriver: driver.IDriver);
        addRecording(eventType: RecordingEventType, data?: IRecordCharacteristic | IRecordDevice): IRecordingItem;
        events: IRecordingItem[];
        clear(): void;
        startRecording(): void;
        startScan(foundFn?: driver.IFoundFunc): Promise<void>;
        stopScan(): void;
        connect(device: driver.IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
        protected getRelativeTime(): number;
        protected recordResolveFunc(resolve: () => void, rec: IRecordingItem): () => void;
        protected recordResolveBufferFunc(resolve: (data: ArrayBuffer) => void, rec: IRecordingItem): (data: ArrayBuffer) => void;
        protected recordErrorFunc(reject: (e) => void, rec: IRecordingItem): (e) => void;
    }
}
declare module "ergometer/ble/ReplayDriver" {
    /**
     * Created by tijmen on 18-02-16.
     */
    import { IDevice, IDriver, IFoundFunc } from "ergometer/ble/Driver";
    import { IRecordingItem, RecordingEventType } from "ergometer/ble/RecordingDriver";
    import * as ergometer from "ergometer/typedefinitions";
    export interface CallBackEvent extends IRecordingItem {
        resolve?: (e?: any) => void;
        reject?: (e: any) => void;
    }
    export class ReplayDriver implements IDriver {
        private _realDriver;
        private _events;
        private _eventCallBackMethods;
        private _eventCallbacks;
        private _playing;
        private _eventIndex;
        private _startTime;
        private _checkQueueTimerId;
        private _performanceMonitor;
        constructor(performanceMonitor: ergometer.IPerformanceMonitor, realDriver: IDriver);
        readonly events: IRecordingItem[];
        replay(events: IRecordingItem[]): void;
        playing: boolean;
        startScan(foundFn?: IFoundFunc): Promise<void>;
        stopScan(): void;
        connect(device: IDevice, disconnectFn: () => void): Promise<void>;
        disconnect(): void;
        writeCharacteristic(serviceUIID: string, characteristicUUID: string, data: ArrayBufferView): Promise<void>;
        readCharacteristic(serviceUIID: string, characteristicUUID: string): Promise<ArrayBuffer>;
        enableNotification(serviceUIID: string, characteristicUUID: string, receive: (data: ArrayBuffer) => void): Promise<void>;
        disableNotification(serviceUIID: string, characteristicUUID: string): Promise<void>;
        protected getRelativeTime(): number;
        protected isCallBack(eventType: RecordingEventType): boolean;
        protected isSameEvent(event1: IRecordingItem, event2: IRecordingItem): boolean;
        protected runEvent(event: IRecordingItem, queuedEvent: CallBackEvent): void;
        protected runTimedEvent(event: IRecordingItem, queuedEvent: CallBackEvent): void;
        protected removeEvent(i: number): void;
        protected checkQueue(): void;
        protected checkAllEventsProcessd(): boolean;
        protected timeNextCheck(timeStamp?: number): void;
        protected addEvent(eventType: RecordingEventType, isMethod: boolean, resolve?: (e?: any) => void, reject?: (e: any) => void, serviceUIID?: string, characteristicUUID?: string): void;
    }
}
declare module "ergometer/performanceMonitor" {
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
    import * as pubSub from "ergometer/pubsub";
    import * as driver from "ergometer/ble/Driver";
    import * as recordingDriver from "ergometer/ble/RecordingDriver";
    import * as replayDriver from "ergometer/ble/ReplayDriver";
    import { IBuffer } from "ergometer/csafe/command_core";
    import * as ergometer from "ergometer/typedefinitions";
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
    export class PerformanceMonitor implements ergometer.IPerformanceMonitor {
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
}
declare module "index" {
    import * as long_commands from "ergometer/csafe/long_commands";
    import * as short_commands from "ergometer/csafe/short_commands";
    import * as push_config_commands from "ergometer/csafe/push_config_commands";
    export * from "ergometer/utils";
    export * from "ergometer/functionQueue";
    export * from "ergometer/pubsub";
    export * from "ergometer/ble/Driver";
    export * from "ergometer/ble/DriverBleat";
    export * from "ergometer/ble/DriverSimpleBLE";
    export * from "ergometer/ble/DriverWebBlueTooth";
    export * from "ergometer/ble/RecordingDriver";
    export * from "ergometer/ble/ReplayDriver";
    export * from "ergometer/ble/typedefinitions";
    export * from "ergometer/csafe/typedefinitions";
    export * from "ergometer/csafe/command_core";
    export * from "ergometer/typedefinitions";
    export * from "ergometer/performanceMonitor";
    export { long_commands, short_commands, push_config_commands };
}
