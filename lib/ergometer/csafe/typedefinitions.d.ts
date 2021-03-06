/**
 * Created by tijmen on 16-01-16.
 *
 * translation of concept 2 csafe.h to typescript version  9/16/08 10:51a
 */
export declare const EXT_FRAME_START_BYTE = 240;
export declare const FRAME_START_BYTE = 241;
export declare const FRAME_END_BYTE = 242;
export declare const FRAME_STUFF_BYTE = 243;
export declare const FRAME_MAX_STUFF_OFFSET_BYTE = 3;
export declare const FRAME_FLG_LEN = 2;
export declare const EXT_FRAME_ADDR_LEN = 2;
export declare const FRAME_CHKSUM_LEN = 1;
export declare const SHORT_CMD_TYPE_MSK = 128;
export declare const LONG_CMD_HDR_LENGTH = 2;
export declare const LONG_CMD_BYTE_CNT_OFFSET = 1;
export declare const RSP_HDR_LENGTH = 2;
export declare const FRAME_STD_TYPE = 0;
export declare const FRAME_EXT_TYPE = 1;
export declare const DESTINATION_ADDR_HOST = 0;
export declare const DESTINATION_ADDR_ERG_MASTER = 1;
export declare const DESTINATION_ADDR_BROADCAST = 255;
export declare const DESTINATION_ADDR_ERG_DEFAULT = 253;
export declare const FRAME_MAXSIZE = 96;
export declare const INTERFRAMEGAP_MIN = 50;
export declare const CMDUPLIST_MAXSIZE = 10;
export declare const MEMORY_BLOCKSIZE = 64;
export declare const FORCEPLOT_BLOCKSIZE = 32;
export declare const HEARTBEAT_BLOCKSIZE = 32;
export declare const MANUFACTURE_ID = 22;
export declare const CLASS_ID = 2;
export declare const MODEL_NUM = 5;
export declare const UNITS_TYPE = 0;
export declare const SERIALNUM_DIGITS = 9;
export declare const HMS_FORMAT_CNT = 3;
export declare const YMD_FORMAT_CNT = 3;
export declare const ERRORCODE_FORMAT_CNT = 3;
export declare const CTRL_CMD_LONG_MIN = 1;
export declare const CFG_CMD_LONG_MIN = 16;
export declare const DATA_CMD_LONG_MIN = 32;
export declare const AUDIO_CMD_LONG_MIN = 64;
export declare const TEXTCFG_CMD_LONG_MIN = 96;
export declare const TEXTSTATUS_CMD_LONG_MIN = 101;
export declare const CAP_CMD_LONG_MIN = 112;
export declare const PMPROPRIETARY_CMD_LONG_MIN = 118;
export declare const CTRL_CMD_SHORT_MIN = 128;
export declare const STATUS_CMD_SHORT_MIN = 145;
export declare const DATA_CMD_SHORT_MIN = 160;
export declare const AUDIO_CMD_SHORT_MIN = 192;
export declare const TEXTCFG_CMD_SHORT_MIN = 224;
export declare const TEXTSTATUS_CMD_SHORT_MIN = 229;
export declare const enum SHORT_CTRL_CMDS {
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
export declare const enum SHORT_STATUS_CMDS {
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
export declare const enum SHORT_DATA_CMDS {
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
export declare const enum SHORT_AUDIO_CMDS {
    GETAUDIOCHANNEL_CMD = 192,
    GETAUDIOVOLUME_CMD = 193,
    GETAUDIOMUTE_CMD = 194,
    AUDIO_CMD_SHORT_MAX = 195,
}
export declare const enum SHORT_TEXTCFG_CMDS {
    ENDTEXT_CMD = 224,
    DISPLAYPOPUP_CMD = 225,
    TEXTCFG_CMD_SHORT_MAX = 226,
}
export declare const enum SHORT_TEXTSTATUS_CMDS {
    GETPOPUPSTATUS_CMD = 229,
    TEXTSTATUS_CMD_SHORT_MAX = 230,
}
export declare const enum LONG_CTRL_CMDS {
    AUTOUPLOAD_CMD = 1,
    UPLIST_CMD = 2,
    UPSTATUSSEC_CMD = 4,
    UPLISTSEC_CMD = 5,
    CTRL_CMD_LONG_MAX = 6,
}
export declare const enum LONG_CFG_CMDS {
    IDDIGITS_CMD = 16,
    SETTIME_CMD = 17,
    SETDATE_CMD = 18,
    SETTIMEOUT_CMD = 19,
    SETUSERCFG1_CMD = 26,
    SETUSERCFG2_CMD = 27,
    CFG_CMD_LONG_MAX = 28,
}
export declare const enum LONG_DATA_CMDS {
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
export declare const enum LONG_AUDIO_CMDS {
    SETCHANNELRANGE_CMD = 64,
    SETVOLUMERANGE_CMD = 65,
    SETAUDIOMUTE_CMD = 66,
    SETAUDIOCHANNEL_CMD = 67,
    SETAUDIOVOLUME_CMD = 68,
    AUDIO_CMD_LONG_MAX = 69,
}
export declare const enum LONG_TEXTCFG_CMDS {
    STARTTEXT_CMD = 96,
    APPENDTEXT_CMD = 97,
    TEXTCFG_CMD_LONG_MAX = 98,
}
export declare const enum LONG_TEXTSTATUS_CMDS {
    GETTEXTSTATUS_CMD = 101,
    TEXTSTATUS_CMD_LONG_MAX = 102,
}
export declare const enum LONG_CAP_CMDS {
    GETCAPS_CMD = 112,
    GETUSERCAPS1_CMD = 126,
    GETUSERCAPS2_CMD = 127,
    CAP_CMD_LONG_MAX = 128,
}
export declare const enum LONG_PMPROPRIETARY_CMDS {
    SETPMCFG_CMD = 118,
    SETPMDATA_CMD = 119,
    GETPMCFG_CMD = 126,
    GETPMDATA_CMD = 127,
    PMPROPRIETARY_CMD_LONG_MAX = 128,
}
export declare const GETPMCFG_CMD_SHORT_MIN = 128;
export declare const GETPMCFG_CMD_LONG_MIN = 80;
export declare const SETPMCFG_CMD_SHORT_MIN = 224;
export declare const SETPMCFG_CMD_LONG_MIN = 0;
export declare const GETPMDATA_CMD_SHORT_MIN = 160;
export declare const GETPMDATA_CMD_LONG_MIN = 104;
export declare const SETPMDATA_CMD_SHORT_MIN = 208;
export declare const SETPMDATA_CMD_LONG_MIN = 48;
export declare const enum PM_SHORT_PULL_CFG_CMDS {
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
export declare const enum PM_SHORT_PULL_DATA_CMDS {
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
export declare const enum PM_SHORT_PUSH_DATA_CMDS {
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
export declare const enum PM_SHORT_PUSH_CFG_CMDS {
    PM_SET_RESET_ALL = 224,
    PM_SET_RESET_ERGNUMBER = 225,
    SETPMCFG_CMD_SHORT_MAX = 226,
}
export declare const enum PM_LONG_PUSH_CFG_CMDS {
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
export declare const enum PM_LONG_PUSH_DATA_CMDS {
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
export declare const enum PM_LONG_PULL_CFG_CMDS {
    PM_GET_ERGNUMBER = 80,
    PM_GET_ERGNUMBERREQUEST = 81,
    PM_GET_USERIDSTRING = 82,
    PM_GET_LOCALRACEPARTICIPANT = 83,
    PM_GET_USER_ID = 84,
    PM_GET_USER_PROFILE = 85,
    GETPMCFG_CMD_LONG_MAX = 86,
}
export declare const enum PM_LONG_PULL_DATA_CMDS {
    PM_GET_MEMORY = 104,
    PM_GET_LOGCARDMEMORY = 105,
    PM_GET_INTERNALLOGMEMORY = 106,
    PM_GET_FORCEPLOTDATA = 107,
    PM_GET_HEARTBEATDATA = 108,
    PM_GET_UI_EVENTS = 109,
    GETPMDATA_CMD_LONG_MAX = 110,
}
export declare const PREVOK_FLG = 0;
export declare const PREVREJECT_FLG = 16;
export declare const PREVBAD_FLG = 32;
export declare const PREVNOTRDY_FLG = 48;
export declare const PREVFRAMESTATUS_MSK = 48;
export declare const SLAVESTATE_ERR_FLG = 0;
export declare const SLAVESTATE_RDY_FLG = 1;
export declare const SLAVESTATE_IDLE_FLG = 2;
export declare const SLAVESTATE_HAVEID_FLG = 3;
export declare const SLAVESTATE_INUSE_FLG = 5;
export declare const SLAVESTATE_PAUSE_FLG = 6;
export declare const SLAVESTATE_FINISH_FLG = 7;
export declare const SLAVESTATE_MANUAL_FLG = 8;
export declare const SLAVESTATE_OFFLINE_FLG = 9;
export declare const FRAMECNT_FLG = 128;
export declare const SLAVESTATE_MSK = 15;
export declare const AUTOSTATUS_FLG = 1;
export declare const UPSTATUS_FLG = 2;
export declare const UPLIST_FLG = 4;
export declare const ACK_FLG = 16;
export declare const EXTERNCONTROL_FLG = 64;
export declare const CAPCODE_PROTOCOL = 0;
export declare const CAPCODE_POWER = 1;
export declare const CAPCODE_TEXT = 2;
export declare const DISTANCE_MILE_0_0 = 1;
export declare const DISTANCE_MILE_0_1 = 2;
export declare const DISTANCE_MILE_0_2 = 3;
export declare const DISTANCE_MILE_0_3 = 4;
export declare const DISTANCE_FEET_0_0 = 5;
export declare const DISTANCE_INCH_0_0 = 6;
export declare const WEIGHT_LBS_0_0 = 7;
export declare const WEIGHT_LBS_0_1 = 8;
export declare const DISTANCE_FEET_1_0 = 10;
export declare const SPEED_MILEPERHOUR_0_0 = 16;
export declare const SPEED_MILEPERHOUR_0_1 = 17;
export declare const SPEED_MILEPERHOUR_0_2 = 18;
export declare const SPEED_FEETPERMINUTE_0_0 = 19;
export declare const DISTANCE_KM_0_0 = 33;
export declare const DISTANCE_KM_0_1 = 34;
export declare const DISTANCE_KM_0_2 = 35;
export declare const DISTANCE_METER_0_0 = 36;
export declare const DISTANCE_METER_0_1 = 37;
export declare const DISTANCE_CM_0_0 = 38;
export declare const WEIGHT_KG_0_0 = 39;
export declare const WEIGHT_KG_0_1 = 40;
export declare const SPEED_KMPERHOUR_0_0 = 48;
export declare const SPEED_KMPERHOUR_0_1 = 49;
export declare const SPEED_KMPERHOUR_0_2 = 50;
export declare const SPEED_METERPERMINUTE_0_0 = 51;
export declare const PACE_MINUTEPERMILE_0_0 = 55;
export declare const PACE_MINUTEPERKM_0_0 = 56;
export declare const PACE_SECONDSPERKM_0_0 = 57;
export declare const PACE_SECONDSPERMILE_0_0 = 58;
export declare const DISTANCE_FLOORS_0_0 = 65;
export declare const DISTANCE_FLOORS_0_1 = 66;
export declare const DISTANCE_STEPS_0_0 = 67;
export declare const DISTANCE_REVS_0_0 = 68;
export declare const DISTANCE_STRIDES_0_0 = 69;
export declare const DISTANCE_STROKES_0_0 = 70;
export declare const MISC_BEATS_0_0 = 71;
export declare const ENERGY_CALORIES_0_0 = 72;
export declare const GRADE_PERCENT_0_0 = 74;
export declare const GRADE_PERCENT_0_2 = 75;
export declare const GRADE_PERCENT_0_1 = 76;
export declare const CADENCE_FLOORSPERMINUTE_0_1 = 79;
export declare const CADENCE_FLOORSPERMINUTE_0_0 = 80;
export declare const CADENCE_STEPSPERMINUTE_0_0 = 81;
export declare const CADENCE_REVSPERMINUTE_0_0 = 82;
export declare const CADENCE_STRIDESPERMINUTE_0_0 = 83;
export declare const CADENCE_STROKESPERMINUTE_0_0 = 84;
export declare const MISC_BEATSPERMINUTE_0_0 = 85;
export declare const BURN_CALORIESPERMINUTE_0_0 = 86;
export declare const BURN_CALORIESPERHOUR_0_0 = 87;
export declare const POWER_WATTS_0_0 = 88;
export declare const ENERGY_INCHLB_0_0 = 90;
export declare const ENERGY_FOOTLB_0_0 = 91;
export declare const ENERGY_NM_0_0 = 92;
export declare const KG_TO_LBS = 2.2046;
export declare const LBS_TO_KG: number;
export declare const IDDIGITS_MIN = 2;
export declare const IDDIGITS_MAX = 5;
export declare const DEFAULT_IDDIGITS = 5;
export declare const DEFAULT_ID = 0;
export declare const MANUAL_ID = 999999999;
export declare const DEFAULT_SLAVESTATE_TIMEOUT = 20;
export declare const PAUSED_SLAVESTATE_TIMEOUT = 220;
export declare const INUSE_SLAVESTATE_TIMEOUT = 6;
export declare const IDLE_SLAVESTATE_TIMEOUT = 30;
export declare const BASE_YEAR = 1900;
export declare const DEFAULT_STATUSUPDATE_INTERVAL = 256;
export declare const DEFAULT_CMDUPLIST_INTERVAL = 256;
