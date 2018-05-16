/**
 * Created by tijmen on 16-01-16.
 *
 * translation of concept 2 csafe.h to typescript version  9/16/08 10:51a
 */
/* Frame contents */
export var EXT_FRAME_START_BYTE = 0xf0;
export var FRAME_START_BYTE = 0xf1;
export var FRAME_END_BYTE = 0xf2;
export var FRAME_STUFF_BYTE = 0xf3;
export var FRAME_MAX_STUFF_OFFSET_BYTE = 0x03;
export var FRAME_FLG_LEN = 2;
export var EXT_FRAME_ADDR_LEN = 2;
export var FRAME_CHKSUM_LEN = 1;
export var SHORT_CMD_TYPE_MSK = 0x80;
export var LONG_CMD_HDR_LENGTH = 2;
export var LONG_CMD_BYTE_CNT_OFFSET = 1;
export var RSP_HDR_LENGTH = 2;
export var FRAME_STD_TYPE = 0;
export var FRAME_EXT_TYPE = 1;
export var DESTINATION_ADDR_HOST = 0x00;
export var DESTINATION_ADDR_ERG_MASTER = 0x01;
export var DESTINATION_ADDR_BROADCAST = 0xff;
export var DESTINATION_ADDR_ERG_DEFAULT = 0xfd;
export var FRAME_MAXSIZE = 96;
export var INTERFRAMEGAP_MIN = 50; // msec
export var CMDUPLIST_MAXSIZE = 10;
export var MEMORY_BLOCKSIZE = 64;
export var FORCEPLOT_BLOCKSIZE = 32;
export var HEARTBEAT_BLOCKSIZE = 32;
/* Manufacturer Info */
export var MANUFACTURE_ID = 22; // assigned by Fitlinxx for Concept2
export var CLASS_ID = 2; // standard CSAFE equipment
export var MODEL_NUM = 5; // PM4
export var UNITS_TYPE = 0; // Metric
export var SERIALNUM_DIGITS = 9;
export var HMS_FORMAT_CNT = 3;
export var YMD_FORMAT_CNT = 3;
export var ERRORCODE_FORMAT_CNT = 3;
/* Command space partitioning for standard commands */
export var CTRL_CMD_LONG_MIN = 0x01;
export var CFG_CMD_LONG_MIN = 0x10;
export var DATA_CMD_LONG_MIN = 0x20;
export var AUDIO_CMD_LONG_MIN = 0x40;
export var TEXTCFG_CMD_LONG_MIN = 0x60;
export var TEXTSTATUS_CMD_LONG_MIN = 0x65;
export var CAP_CMD_LONG_MIN = 0x70;
export var PMPROPRIETARY_CMD_LONG_MIN = 0x76;
export var CTRL_CMD_SHORT_MIN = 0x80;
export var STATUS_CMD_SHORT_MIN = 0x91;
export var DATA_CMD_SHORT_MIN = 0xa0;
export var AUDIO_CMD_SHORT_MIN = 0xc0;
export var TEXTCFG_CMD_SHORT_MIN = 0xe0;
export var TEXTSTATUS_CMD_SHORT_MIN = 0xe5;
/* Command space partitioning for PM proprietary commands */
export var GETPMCFG_CMD_SHORT_MIN = 0x80;
export var GETPMCFG_CMD_LONG_MIN = 0x50;
export var SETPMCFG_CMD_SHORT_MIN = 0xe0;
export var SETPMCFG_CMD_LONG_MIN = 0x00;
export var GETPMDATA_CMD_SHORT_MIN = 0xa0;
export var GETPMDATA_CMD_LONG_MIN = 0x68;
export var SETPMDATA_CMD_SHORT_MIN = 0xd0;
export var SETPMDATA_CMD_LONG_MIN = 0x30;
/* Status byte flag and mask definitions */
export var PREVOK_FLG = 0x00;
export var PREVREJECT_FLG = 0x10;
export var PREVBAD_FLG = 0x20;
export var PREVNOTRDY_FLG = 0x30;
export var PREVFRAMESTATUS_MSK = 0x30;
export var SLAVESTATE_ERR_FLG = 0x00;
export var SLAVESTATE_RDY_FLG = 0x01;
export var SLAVESTATE_IDLE_FLG = 0x02;
export var SLAVESTATE_HAVEID_FLG = 0x03;
export var SLAVESTATE_INUSE_FLG = 0x05;
export var SLAVESTATE_PAUSE_FLG = 0x06;
export var SLAVESTATE_FINISH_FLG = 0x07;
export var SLAVESTATE_MANUAL_FLG = 0x08;
export var SLAVESTATE_OFFLINE_FLG = 0x09;
export var FRAMECNT_FLG = 0x80;
export var SLAVESTATE_MSK = 0x0f;
/* AUTOUPLOAD_CMD flag definitions */
export var AUTOSTATUS_FLG = 0x01;
export var UPSTATUS_FLG = 0x02;
export var UPLIST_FLG = 0x04;
export var ACK_FLG = 0x10;
export var EXTERNCONTROL_FLG = 0x40;
/* CSAFE Slave Capabilities Codes */
export var CAPCODE_PROTOCOL = 0x00;
export var CAPCODE_POWER = 0x01;
export var CAPCODE_TEXT = 0x02;
/* CSAFE units format definitions: <type>_<unit>_<tens>_<decimals> */
export var DISTANCE_MILE_0_0 = 0x01;
export var DISTANCE_MILE_0_1 = 0x02;
export var DISTANCE_MILE_0_2 = 0x03;
export var DISTANCE_MILE_0_3 = 0x04;
export var DISTANCE_FEET_0_0 = 0x05;
export var DISTANCE_INCH_0_0 = 0x06;
export var WEIGHT_LBS_0_0 = 0x07;
export var WEIGHT_LBS_0_1 = 0x08;
export var DISTANCE_FEET_1_0 = 0x0a;
export var SPEED_MILEPERHOUR_0_0 = 0x10;
export var SPEED_MILEPERHOUR_0_1 = 0x11;
export var SPEED_MILEPERHOUR_0_2 = 0x12;
export var SPEED_FEETPERMINUTE_0_0 = 0x13;
export var DISTANCE_KM_0_0 = 0x21;
export var DISTANCE_KM_0_1 = 0x22;
export var DISTANCE_KM_0_2 = 0x23;
export var DISTANCE_METER_0_0 = 0x24;
export var DISTANCE_METER_0_1 = 0x25;
export var DISTANCE_CM_0_0 = 0x26;
export var WEIGHT_KG_0_0 = 0x27;
export var WEIGHT_KG_0_1 = 0x28;
export var SPEED_KMPERHOUR_0_0 = 0x30;
export var SPEED_KMPERHOUR_0_1 = 0x31;
export var SPEED_KMPERHOUR_0_2 = 0x32;
export var SPEED_METERPERMINUTE_0_0 = 0x33;
export var PACE_MINUTEPERMILE_0_0 = 0x37;
export var PACE_MINUTEPERKM_0_0 = 0x38;
export var PACE_SECONDSPERKM_0_0 = 0x39;
export var PACE_SECONDSPERMILE_0_0 = 0x3a;
export var DISTANCE_FLOORS_0_0 = 0x41;
export var DISTANCE_FLOORS_0_1 = 0x42;
export var DISTANCE_STEPS_0_0 = 0x43;
export var DISTANCE_REVS_0_0 = 0x44;
export var DISTANCE_STRIDES_0_0 = 0x45;
export var DISTANCE_STROKES_0_0 = 0x46;
export var MISC_BEATS_0_0 = 0x47;
export var ENERGY_CALORIES_0_0 = 0x48;
export var GRADE_PERCENT_0_0 = 0x4a;
export var GRADE_PERCENT_0_2 = 0x4b;
export var GRADE_PERCENT_0_1 = 0x4c;
export var CADENCE_FLOORSPERMINUTE_0_1 = 0x4f;
export var CADENCE_FLOORSPERMINUTE_0_0 = 0x50;
export var CADENCE_STEPSPERMINUTE_0_0 = 0x51;
export var CADENCE_REVSPERMINUTE_0_0 = 0x52;
export var CADENCE_STRIDESPERMINUTE_0_0 = 0x53;
export var CADENCE_STROKESPERMINUTE_0_0 = 0x54;
export var MISC_BEATSPERMINUTE_0_0 = 0x55;
export var BURN_CALORIESPERMINUTE_0_0 = 0x56;
export var BURN_CALORIESPERHOUR_0_0 = 0x57;
export var POWER_WATTS_0_0 = 0x58;
export var ENERGY_INCHLB_0_0 = 0x5a;
export var ENERGY_FOOTLB_0_0 = 0x5b;
export var ENERGY_NM_0_0 = 0x5c;
/* Conversion constants */
export var KG_TO_LBS = 2.2046;
export var LBS_TO_KG = 1 / KG_TO_LBS;
/* ID Digits */
export var IDDIGITS_MIN = 2;
export var IDDIGITS_MAX = 5;
export var DEFAULT_IDDIGITS = 5;
export var DEFAULT_ID = 0;
export var MANUAL_ID = 999999999;
/* Slave State Tiimeout Parameters */
export var DEFAULT_SLAVESTATE_TIMEOUT = 20; // seconds
export var PAUSED_SLAVESTATE_TIMEOUT = 220; // seconds
export var INUSE_SLAVESTATE_TIMEOUT = 6; // seconds
export var IDLE_SLAVESTATE_TIMEOUT = 30; // seconds
/* Base Year */
export var BASE_YEAR = 1900;
/* Default time intervals */
export var DEFAULT_STATUSUPDATE_INTERVAL = 256; // seconds
export var DEFAULT_CMDUPLIST_INTERVAL = 256; // seconds
//# sourceMappingURL=typedefinitions.js.map