/**
 * Created by tijmen on 16-01-16.
 *
 * translation of concept 2 csafe.h to typescript version  9/16/08 10:51a
 */
System.register("ergometer/csafe/typedefinitions", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EXT_FRAME_START_BYTE, FRAME_START_BYTE, FRAME_END_BYTE, FRAME_STUFF_BYTE, FRAME_MAX_STUFF_OFFSET_BYTE, FRAME_FLG_LEN, EXT_FRAME_ADDR_LEN, FRAME_CHKSUM_LEN, SHORT_CMD_TYPE_MSK, LONG_CMD_HDR_LENGTH, LONG_CMD_BYTE_CNT_OFFSET, RSP_HDR_LENGTH, FRAME_STD_TYPE, FRAME_EXT_TYPE, DESTINATION_ADDR_HOST, DESTINATION_ADDR_ERG_MASTER, DESTINATION_ADDR_BROADCAST, DESTINATION_ADDR_ERG_DEFAULT, FRAME_MAXSIZE, INTERFRAMEGAP_MIN, CMDUPLIST_MAXSIZE, MEMORY_BLOCKSIZE, FORCEPLOT_BLOCKSIZE, HEARTBEAT_BLOCKSIZE, MANUFACTURE_ID, CLASS_ID, MODEL_NUM, UNITS_TYPE, SERIALNUM_DIGITS, HMS_FORMAT_CNT, YMD_FORMAT_CNT, ERRORCODE_FORMAT_CNT, CTRL_CMD_LONG_MIN, CFG_CMD_LONG_MIN, DATA_CMD_LONG_MIN, AUDIO_CMD_LONG_MIN, TEXTCFG_CMD_LONG_MIN, TEXTSTATUS_CMD_LONG_MIN, CAP_CMD_LONG_MIN, PMPROPRIETARY_CMD_LONG_MIN, CTRL_CMD_SHORT_MIN, STATUS_CMD_SHORT_MIN, DATA_CMD_SHORT_MIN, AUDIO_CMD_SHORT_MIN, TEXTCFG_CMD_SHORT_MIN, TEXTSTATUS_CMD_SHORT_MIN, GETPMCFG_CMD_SHORT_MIN, GETPMCFG_CMD_LONG_MIN, SETPMCFG_CMD_SHORT_MIN, SETPMCFG_CMD_LONG_MIN, GETPMDATA_CMD_SHORT_MIN, GETPMDATA_CMD_LONG_MIN, SETPMDATA_CMD_SHORT_MIN, SETPMDATA_CMD_LONG_MIN, PREVOK_FLG, PREVREJECT_FLG, PREVBAD_FLG, PREVNOTRDY_FLG, PREVFRAMESTATUS_MSK, SLAVESTATE_ERR_FLG, SLAVESTATE_RDY_FLG, SLAVESTATE_IDLE_FLG, SLAVESTATE_HAVEID_FLG, SLAVESTATE_INUSE_FLG, SLAVESTATE_PAUSE_FLG, SLAVESTATE_FINISH_FLG, SLAVESTATE_MANUAL_FLG, SLAVESTATE_OFFLINE_FLG, FRAMECNT_FLG, SLAVESTATE_MSK, AUTOSTATUS_FLG, UPSTATUS_FLG, UPLIST_FLG, ACK_FLG, EXTERNCONTROL_FLG, CAPCODE_PROTOCOL, CAPCODE_POWER, CAPCODE_TEXT, DISTANCE_MILE_0_0, DISTANCE_MILE_0_1, DISTANCE_MILE_0_2, DISTANCE_MILE_0_3, DISTANCE_FEET_0_0, DISTANCE_INCH_0_0, WEIGHT_LBS_0_0, WEIGHT_LBS_0_1, DISTANCE_FEET_1_0, SPEED_MILEPERHOUR_0_0, SPEED_MILEPERHOUR_0_1, SPEED_MILEPERHOUR_0_2, SPEED_FEETPERMINUTE_0_0, DISTANCE_KM_0_0, DISTANCE_KM_0_1, DISTANCE_KM_0_2, DISTANCE_METER_0_0, DISTANCE_METER_0_1, DISTANCE_CM_0_0, WEIGHT_KG_0_0, WEIGHT_KG_0_1, SPEED_KMPERHOUR_0_0, SPEED_KMPERHOUR_0_1, SPEED_KMPERHOUR_0_2, SPEED_METERPERMINUTE_0_0, PACE_MINUTEPERMILE_0_0, PACE_MINUTEPERKM_0_0, PACE_SECONDSPERKM_0_0, PACE_SECONDSPERMILE_0_0, DISTANCE_FLOORS_0_0, DISTANCE_FLOORS_0_1, DISTANCE_STEPS_0_0, DISTANCE_REVS_0_0, DISTANCE_STRIDES_0_0, DISTANCE_STROKES_0_0, MISC_BEATS_0_0, ENERGY_CALORIES_0_0, GRADE_PERCENT_0_0, GRADE_PERCENT_0_2, GRADE_PERCENT_0_1, CADENCE_FLOORSPERMINUTE_0_1, CADENCE_FLOORSPERMINUTE_0_0, CADENCE_STEPSPERMINUTE_0_0, CADENCE_REVSPERMINUTE_0_0, CADENCE_STRIDESPERMINUTE_0_0, CADENCE_STROKESPERMINUTE_0_0, MISC_BEATSPERMINUTE_0_0, BURN_CALORIESPERMINUTE_0_0, BURN_CALORIESPERHOUR_0_0, POWER_WATTS_0_0, ENERGY_INCHLB_0_0, ENERGY_FOOTLB_0_0, ENERGY_NM_0_0, KG_TO_LBS, LBS_TO_KG, IDDIGITS_MIN, IDDIGITS_MAX, DEFAULT_IDDIGITS, DEFAULT_ID, MANUAL_ID, DEFAULT_SLAVESTATE_TIMEOUT, PAUSED_SLAVESTATE_TIMEOUT, INUSE_SLAVESTATE_TIMEOUT, IDLE_SLAVESTATE_TIMEOUT, BASE_YEAR, DEFAULT_STATUSUPDATE_INTERVAL, DEFAULT_CMDUPLIST_INTERVAL;
    return {
        setters: [],
        execute: function () {/**
             * Created by tijmen on 16-01-16.
             *
             * translation of concept 2 csafe.h to typescript version  9/16/08 10:51a
             */
            /* Frame contents */
            exports_1("EXT_FRAME_START_BYTE", EXT_FRAME_START_BYTE = 0xf0);
            exports_1("FRAME_START_BYTE", FRAME_START_BYTE = 0xf1);
            exports_1("FRAME_END_BYTE", FRAME_END_BYTE = 0xf2);
            exports_1("FRAME_STUFF_BYTE", FRAME_STUFF_BYTE = 0xf3);
            exports_1("FRAME_MAX_STUFF_OFFSET_BYTE", FRAME_MAX_STUFF_OFFSET_BYTE = 0x03);
            exports_1("FRAME_FLG_LEN", FRAME_FLG_LEN = 2);
            exports_1("EXT_FRAME_ADDR_LEN", EXT_FRAME_ADDR_LEN = 2);
            exports_1("FRAME_CHKSUM_LEN", FRAME_CHKSUM_LEN = 1);
            exports_1("SHORT_CMD_TYPE_MSK", SHORT_CMD_TYPE_MSK = 0x80);
            exports_1("LONG_CMD_HDR_LENGTH", LONG_CMD_HDR_LENGTH = 2);
            exports_1("LONG_CMD_BYTE_CNT_OFFSET", LONG_CMD_BYTE_CNT_OFFSET = 1);
            exports_1("RSP_HDR_LENGTH", RSP_HDR_LENGTH = 2);
            exports_1("FRAME_STD_TYPE", FRAME_STD_TYPE = 0);
            exports_1("FRAME_EXT_TYPE", FRAME_EXT_TYPE = 1);
            exports_1("DESTINATION_ADDR_HOST", DESTINATION_ADDR_HOST = 0x00);
            exports_1("DESTINATION_ADDR_ERG_MASTER", DESTINATION_ADDR_ERG_MASTER = 0x01);
            exports_1("DESTINATION_ADDR_BROADCAST", DESTINATION_ADDR_BROADCAST = 0xff);
            exports_1("DESTINATION_ADDR_ERG_DEFAULT", DESTINATION_ADDR_ERG_DEFAULT = 0xfd);
            exports_1("FRAME_MAXSIZE", FRAME_MAXSIZE = 96);
            exports_1("INTERFRAMEGAP_MIN", INTERFRAMEGAP_MIN = 50); // msec
            exports_1("CMDUPLIST_MAXSIZE", CMDUPLIST_MAXSIZE = 10);
            exports_1("MEMORY_BLOCKSIZE", MEMORY_BLOCKSIZE = 64);
            exports_1("FORCEPLOT_BLOCKSIZE", FORCEPLOT_BLOCKSIZE = 32);
            exports_1("HEARTBEAT_BLOCKSIZE", HEARTBEAT_BLOCKSIZE = 32);
            /* Manufacturer Info */
            exports_1("MANUFACTURE_ID", MANUFACTURE_ID = 22); // assigned by Fitlinxx for Concept2
            exports_1("CLASS_ID", CLASS_ID = 2); // standard CSAFE equipment
            exports_1("MODEL_NUM", MODEL_NUM = 5); // PM4
            exports_1("UNITS_TYPE", UNITS_TYPE = 0); // Metric
            exports_1("SERIALNUM_DIGITS", SERIALNUM_DIGITS = 9);
            exports_1("HMS_FORMAT_CNT", HMS_FORMAT_CNT = 3);
            exports_1("YMD_FORMAT_CNT", YMD_FORMAT_CNT = 3);
            exports_1("ERRORCODE_FORMAT_CNT", ERRORCODE_FORMAT_CNT = 3);
            /* Command space partitioning for standard commands */
            exports_1("CTRL_CMD_LONG_MIN", CTRL_CMD_LONG_MIN = 0x01);
            exports_1("CFG_CMD_LONG_MIN", CFG_CMD_LONG_MIN = 0x10);
            exports_1("DATA_CMD_LONG_MIN", DATA_CMD_LONG_MIN = 0x20);
            exports_1("AUDIO_CMD_LONG_MIN", AUDIO_CMD_LONG_MIN = 0x40);
            exports_1("TEXTCFG_CMD_LONG_MIN", TEXTCFG_CMD_LONG_MIN = 0x60);
            exports_1("TEXTSTATUS_CMD_LONG_MIN", TEXTSTATUS_CMD_LONG_MIN = 0x65);
            exports_1("CAP_CMD_LONG_MIN", CAP_CMD_LONG_MIN = 0x70);
            exports_1("PMPROPRIETARY_CMD_LONG_MIN", PMPROPRIETARY_CMD_LONG_MIN = 0x76);
            exports_1("CTRL_CMD_SHORT_MIN", CTRL_CMD_SHORT_MIN = 0x80);
            exports_1("STATUS_CMD_SHORT_MIN", STATUS_CMD_SHORT_MIN = 0x91);
            exports_1("DATA_CMD_SHORT_MIN", DATA_CMD_SHORT_MIN = 0xa0);
            exports_1("AUDIO_CMD_SHORT_MIN", AUDIO_CMD_SHORT_MIN = 0xc0);
            exports_1("TEXTCFG_CMD_SHORT_MIN", TEXTCFG_CMD_SHORT_MIN = 0xe0);
            exports_1("TEXTSTATUS_CMD_SHORT_MIN", TEXTSTATUS_CMD_SHORT_MIN = 0xe5);
            /* Command space partitioning for PM proprietary commands */
            exports_1("GETPMCFG_CMD_SHORT_MIN", GETPMCFG_CMD_SHORT_MIN = 0x80);
            exports_1("GETPMCFG_CMD_LONG_MIN", GETPMCFG_CMD_LONG_MIN = 0x50);
            exports_1("SETPMCFG_CMD_SHORT_MIN", SETPMCFG_CMD_SHORT_MIN = 0xe0);
            exports_1("SETPMCFG_CMD_LONG_MIN", SETPMCFG_CMD_LONG_MIN = 0x00);
            exports_1("GETPMDATA_CMD_SHORT_MIN", GETPMDATA_CMD_SHORT_MIN = 0xa0);
            exports_1("GETPMDATA_CMD_LONG_MIN", GETPMDATA_CMD_LONG_MIN = 0x68);
            exports_1("SETPMDATA_CMD_SHORT_MIN", SETPMDATA_CMD_SHORT_MIN = 0xd0);
            exports_1("SETPMDATA_CMD_LONG_MIN", SETPMDATA_CMD_LONG_MIN = 0x30);
            /* Status byte flag and mask definitions */
            exports_1("PREVOK_FLG", PREVOK_FLG = 0x00);
            exports_1("PREVREJECT_FLG", PREVREJECT_FLG = 0x10);
            exports_1("PREVBAD_FLG", PREVBAD_FLG = 0x20);
            exports_1("PREVNOTRDY_FLG", PREVNOTRDY_FLG = 0x30);
            exports_1("PREVFRAMESTATUS_MSK", PREVFRAMESTATUS_MSK = 0x30);
            exports_1("SLAVESTATE_ERR_FLG", SLAVESTATE_ERR_FLG = 0x00);
            exports_1("SLAVESTATE_RDY_FLG", SLAVESTATE_RDY_FLG = 0x01);
            exports_1("SLAVESTATE_IDLE_FLG", SLAVESTATE_IDLE_FLG = 0x02);
            exports_1("SLAVESTATE_HAVEID_FLG", SLAVESTATE_HAVEID_FLG = 0x03);
            exports_1("SLAVESTATE_INUSE_FLG", SLAVESTATE_INUSE_FLG = 0x05);
            exports_1("SLAVESTATE_PAUSE_FLG", SLAVESTATE_PAUSE_FLG = 0x06);
            exports_1("SLAVESTATE_FINISH_FLG", SLAVESTATE_FINISH_FLG = 0x07);
            exports_1("SLAVESTATE_MANUAL_FLG", SLAVESTATE_MANUAL_FLG = 0x08);
            exports_1("SLAVESTATE_OFFLINE_FLG", SLAVESTATE_OFFLINE_FLG = 0x09);
            exports_1("FRAMECNT_FLG", FRAMECNT_FLG = 0x80);
            exports_1("SLAVESTATE_MSK", SLAVESTATE_MSK = 0x0f);
            /* AUTOUPLOAD_CMD flag definitions */
            exports_1("AUTOSTATUS_FLG", AUTOSTATUS_FLG = 0x01);
            exports_1("UPSTATUS_FLG", UPSTATUS_FLG = 0x02);
            exports_1("UPLIST_FLG", UPLIST_FLG = 0x04);
            exports_1("ACK_FLG", ACK_FLG = 0x10);
            exports_1("EXTERNCONTROL_FLG", EXTERNCONTROL_FLG = 0x40);
            /* CSAFE Slave Capabilities Codes */
            exports_1("CAPCODE_PROTOCOL", CAPCODE_PROTOCOL = 0x00);
            exports_1("CAPCODE_POWER", CAPCODE_POWER = 0x01);
            exports_1("CAPCODE_TEXT", CAPCODE_TEXT = 0x02);
            /* CSAFE units format definitions: <type>_<unit>_<tens>_<decimals> */
            exports_1("DISTANCE_MILE_0_0", DISTANCE_MILE_0_0 = 0x01);
            exports_1("DISTANCE_MILE_0_1", DISTANCE_MILE_0_1 = 0x02);
            exports_1("DISTANCE_MILE_0_2", DISTANCE_MILE_0_2 = 0x03);
            exports_1("DISTANCE_MILE_0_3", DISTANCE_MILE_0_3 = 0x04);
            exports_1("DISTANCE_FEET_0_0", DISTANCE_FEET_0_0 = 0x05);
            exports_1("DISTANCE_INCH_0_0", DISTANCE_INCH_0_0 = 0x06);
            exports_1("WEIGHT_LBS_0_0", WEIGHT_LBS_0_0 = 0x07);
            exports_1("WEIGHT_LBS_0_1", WEIGHT_LBS_0_1 = 0x08);
            exports_1("DISTANCE_FEET_1_0", DISTANCE_FEET_1_0 = 0x0a);
            exports_1("SPEED_MILEPERHOUR_0_0", SPEED_MILEPERHOUR_0_0 = 0x10);
            exports_1("SPEED_MILEPERHOUR_0_1", SPEED_MILEPERHOUR_0_1 = 0x11);
            exports_1("SPEED_MILEPERHOUR_0_2", SPEED_MILEPERHOUR_0_2 = 0x12);
            exports_1("SPEED_FEETPERMINUTE_0_0", SPEED_FEETPERMINUTE_0_0 = 0x13);
            exports_1("DISTANCE_KM_0_0", DISTANCE_KM_0_0 = 0x21);
            exports_1("DISTANCE_KM_0_1", DISTANCE_KM_0_1 = 0x22);
            exports_1("DISTANCE_KM_0_2", DISTANCE_KM_0_2 = 0x23);
            exports_1("DISTANCE_METER_0_0", DISTANCE_METER_0_0 = 0x24);
            exports_1("DISTANCE_METER_0_1", DISTANCE_METER_0_1 = 0x25);
            exports_1("DISTANCE_CM_0_0", DISTANCE_CM_0_0 = 0x26);
            exports_1("WEIGHT_KG_0_0", WEIGHT_KG_0_0 = 0x27);
            exports_1("WEIGHT_KG_0_1", WEIGHT_KG_0_1 = 0x28);
            exports_1("SPEED_KMPERHOUR_0_0", SPEED_KMPERHOUR_0_0 = 0x30);
            exports_1("SPEED_KMPERHOUR_0_1", SPEED_KMPERHOUR_0_1 = 0x31);
            exports_1("SPEED_KMPERHOUR_0_2", SPEED_KMPERHOUR_0_2 = 0x32);
            exports_1("SPEED_METERPERMINUTE_0_0", SPEED_METERPERMINUTE_0_0 = 0x33);
            exports_1("PACE_MINUTEPERMILE_0_0", PACE_MINUTEPERMILE_0_0 = 0x37);
            exports_1("PACE_MINUTEPERKM_0_0", PACE_MINUTEPERKM_0_0 = 0x38);
            exports_1("PACE_SECONDSPERKM_0_0", PACE_SECONDSPERKM_0_0 = 0x39);
            exports_1("PACE_SECONDSPERMILE_0_0", PACE_SECONDSPERMILE_0_0 = 0x3a);
            exports_1("DISTANCE_FLOORS_0_0", DISTANCE_FLOORS_0_0 = 0x41);
            exports_1("DISTANCE_FLOORS_0_1", DISTANCE_FLOORS_0_1 = 0x42);
            exports_1("DISTANCE_STEPS_0_0", DISTANCE_STEPS_0_0 = 0x43);
            exports_1("DISTANCE_REVS_0_0", DISTANCE_REVS_0_0 = 0x44);
            exports_1("DISTANCE_STRIDES_0_0", DISTANCE_STRIDES_0_0 = 0x45);
            exports_1("DISTANCE_STROKES_0_0", DISTANCE_STROKES_0_0 = 0x46);
            exports_1("MISC_BEATS_0_0", MISC_BEATS_0_0 = 0x47);
            exports_1("ENERGY_CALORIES_0_0", ENERGY_CALORIES_0_0 = 0x48);
            exports_1("GRADE_PERCENT_0_0", GRADE_PERCENT_0_0 = 0x4a);
            exports_1("GRADE_PERCENT_0_2", GRADE_PERCENT_0_2 = 0x4b);
            exports_1("GRADE_PERCENT_0_1", GRADE_PERCENT_0_1 = 0x4c);
            exports_1("CADENCE_FLOORSPERMINUTE_0_1", CADENCE_FLOORSPERMINUTE_0_1 = 0x4f);
            exports_1("CADENCE_FLOORSPERMINUTE_0_0", CADENCE_FLOORSPERMINUTE_0_0 = 0x50);
            exports_1("CADENCE_STEPSPERMINUTE_0_0", CADENCE_STEPSPERMINUTE_0_0 = 0x51);
            exports_1("CADENCE_REVSPERMINUTE_0_0", CADENCE_REVSPERMINUTE_0_0 = 0x52);
            exports_1("CADENCE_STRIDESPERMINUTE_0_0", CADENCE_STRIDESPERMINUTE_0_0 = 0x53);
            exports_1("CADENCE_STROKESPERMINUTE_0_0", CADENCE_STROKESPERMINUTE_0_0 = 0x54);
            exports_1("MISC_BEATSPERMINUTE_0_0", MISC_BEATSPERMINUTE_0_0 = 0x55);
            exports_1("BURN_CALORIESPERMINUTE_0_0", BURN_CALORIESPERMINUTE_0_0 = 0x56);
            exports_1("BURN_CALORIESPERHOUR_0_0", BURN_CALORIESPERHOUR_0_0 = 0x57);
            exports_1("POWER_WATTS_0_0", POWER_WATTS_0_0 = 0x58);
            exports_1("ENERGY_INCHLB_0_0", ENERGY_INCHLB_0_0 = 0x5a);
            exports_1("ENERGY_FOOTLB_0_0", ENERGY_FOOTLB_0_0 = 0x5b);
            exports_1("ENERGY_NM_0_0", ENERGY_NM_0_0 = 0x5c);
            /* Conversion constants */
            exports_1("KG_TO_LBS", KG_TO_LBS = 2.2046);
            exports_1("LBS_TO_KG", LBS_TO_KG = 1 / KG_TO_LBS);
            /* ID Digits */
            exports_1("IDDIGITS_MIN", IDDIGITS_MIN = 2);
            exports_1("IDDIGITS_MAX", IDDIGITS_MAX = 5);
            exports_1("DEFAULT_IDDIGITS", DEFAULT_IDDIGITS = 5);
            exports_1("DEFAULT_ID", DEFAULT_ID = 0);
            exports_1("MANUAL_ID", MANUAL_ID = 999999999);
            /* Slave State Tiimeout Parameters */
            exports_1("DEFAULT_SLAVESTATE_TIMEOUT", DEFAULT_SLAVESTATE_TIMEOUT = 20); // seconds
            exports_1("PAUSED_SLAVESTATE_TIMEOUT", PAUSED_SLAVESTATE_TIMEOUT = 220); // seconds
            exports_1("INUSE_SLAVESTATE_TIMEOUT", INUSE_SLAVESTATE_TIMEOUT = 6); // seconds
            exports_1("IDLE_SLAVESTATE_TIMEOUT", IDLE_SLAVESTATE_TIMEOUT = 30); // seconds
            /* Base Year */
            exports_1("BASE_YEAR", BASE_YEAR = 1900);
            /* Default time intervals */
            exports_1("DEFAULT_STATUSUPDATE_INTERVAL", DEFAULT_STATUSUPDATE_INTERVAL = 256); // seconds
            exports_1("DEFAULT_CMDUPLIST_INTERVAL", DEFAULT_CMDUPLIST_INTERVAL = 256); // seconds
        }
    };
});
System.register("ergometer/pubsub", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var PubSub, Event;
    return {
        setters: [],
        execute: function () {
            PubSub = /** @class */ (function () {
                function PubSub() {
                    this.registry = {};
                }
                PubSub.prototype.pub = function (name) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (!this.registry[name])
                        return;
                    this.registry[name].forEach(function (x) {
                        try {
                            x.func.apply(x.object, args);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    });
                };
                PubSub.prototype.pubASync = function (name) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (!this.registry[name])
                        return;
                    this.registry[name].forEach(function (x) {
                        setTimeout(function () {
                            x.func.apply(x.object, args);
                        }, 0);
                    });
                };
                PubSub.prototype.sub = function (applyObject, name, fn) {
                    var evnt = this.registry[name];
                    var newItem = { object: applyObject, func: fn };
                    if (!evnt) {
                        this.registry[name] = [newItem];
                    }
                    else {
                        // never subscribe the same function twice
                        var funcExists_1 = false;
                        evnt.forEach(function (item) {
                            if (item.func === fn)
                                funcExists_1 = true;
                        });
                        if (!funcExists_1)
                            evnt.push(newItem);
                    }
                    this.pub('subscribed', name, this.subscribeCount(name));
                };
                PubSub.prototype.unsub = function (name, fn) {
                    var evnt = this.registry[name];
                    if (evnt) {
                        // remove the function
                        for (var i = evnt.length - 1; i >= 0; i--) {
                            if (evnt[i].func === fn)
                                evnt.splice(i, 1);
                        }
                    }
                    this.pub('unsubscribed', name, this.subscribeCount(name));
                };
                PubSub.prototype.subscribeCount = function (name) {
                    var evnt = this.registry[name];
                    if (evnt)
                        return evnt.length;
                    else
                        return 0;
                };
                return PubSub;
            }());
            exports_2("PubSub", PubSub);
            // new style event using generics
            Event = /** @class */ (function () {
                function Event() {
                    this._subscribed = [];
                }
                Event.prototype.sub = function (applyObject, event) {
                    var newItem = this.findSubscription(event);
                    if (!newItem) {
                        newItem = { object: applyObject, func: event };
                        this._subscribed.push(newItem);
                        this.doChangedEvent();
                    }
                };
                Event.prototype.unsub = function (event) {
                    for (var i = this._subscribed.length - 1; i >= 0; i--) {
                        if (this._subscribed[i].func === event)
                            this._subscribed.splice(i, 1);
                    }
                    this.doChangedEvent();
                };
                Object.defineProperty(Event.prototype, "pub", {
                    get: function () {
                        var pubsub = this;
                        var func = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            pubsub.doPub(args);
                        };
                        return func;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Event.prototype, "pubAsync", {
                    get: function () {
                        var pubsub = this;
                        var func = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            setTimeout(function () {
                                pubsub.doPub(args);
                            });
                        };
                        return func;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Event.prototype, "count", {
                    get: function () {
                        return this._subscribed.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Event.prototype.registerChangedEvent = function (func) {
                    this._subScriptionChangedEvent = func;
                };
                Event.prototype.doChangedEvent = function () {
                    if (this._subScriptionChangedEvent) {
                        this._subScriptionChangedEvent(this, this.count);
                    }
                };
                Event.prototype.findSubscription = function (event) {
                    this._subscribed.forEach(function (item) {
                        if (item.func === event)
                            return item;
                    });
                    return null;
                };
                Event.prototype.doPub = function (args) {
                    this._subscribed.forEach(function (item) {
                        item.func.apply(item.object, args);
                    });
                };
                return Event;
            }());
            exports_2("Event", Event);
        }
    };
});
System.register("ergometer/ble/Driver", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ergometer/typedefinitions", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var MonitorConnectionState, LogLevel;
    return {
        setters: [],
        execute: function () {
            (function (MonitorConnectionState) {
                MonitorConnectionState[MonitorConnectionState["inactive"] = 0] = "inactive";
                MonitorConnectionState[MonitorConnectionState["deviceReady"] = 1] = "deviceReady";
                MonitorConnectionState[MonitorConnectionState["scanning"] = 2] = "scanning";
                MonitorConnectionState[MonitorConnectionState["connecting"] = 3] = "connecting";
                MonitorConnectionState[MonitorConnectionState["connected"] = 4] = "connected";
                MonitorConnectionState[MonitorConnectionState["servicesFound"] = 5] = "servicesFound";
                MonitorConnectionState[MonitorConnectionState["readyForCommunication"] = 6] = "readyForCommunication";
            })(MonitorConnectionState || (MonitorConnectionState = {}));
            exports_4("MonitorConnectionState", MonitorConnectionState);
            (function (LogLevel) {
                LogLevel[LogLevel["error"] = 0] = "error";
                LogLevel[LogLevel["info"] = 1] = "info";
                LogLevel[LogLevel["debug"] = 2] = "debug";
                LogLevel[LogLevel["trace"] = 3] = "trace";
            })(LogLevel || (LogLevel = {}));
            exports_4("LogLevel", LogLevel);
        }
    };
});
System.register("ergometer/csafe/command_core", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function registerStandardSet(functionName, command, setParams) {
        commandManager.register(function (buffer, monitor) {
            buffer[functionName] = function (params) {
                buffer.addRawCommand({
                    waitForResponse: false,
                    command: command,
                    data: setParams(params),
                    onError: params.onError
                });
                return buffer;
            };
        });
    }
    exports_5("registerStandardSet", registerStandardSet);
    function registerStandardSetConfig(functionName, command, setParams) {
        commandManager.register(function (buffer, monitor) {
            buffer[functionName] = function (params) {
                buffer.addRawCommand({
                    waitForResponse: false,
                    command: 26 /* SETUSERCFG1_CMD */,
                    detailCommand: command,
                    data: setParams(params),
                    onError: params.onError
                });
                return buffer;
            };
        });
    }
    exports_5("registerStandardSetConfig", registerStandardSetConfig);
    function registerStandardShortGet(functionName, command, converter) {
        commandManager.register(function (buffer, monitor) {
            buffer[functionName] = function (params) {
                buffer.addRawCommand({
                    waitForResponse: true,
                    command: command,
                    onDataReceived: function (data) {
                        params.onDataReceived(converter(data));
                    },
                    onError: params.onError
                });
                return buffer;
            };
        });
    }
    exports_5("registerStandardShortGet", registerStandardShortGet);
    var CommandManager, commandManager;
    return {
        setters: [],
        execute: function () {
            CommandManager = /** @class */ (function () {
                function CommandManager() {
                    this._commands = [];
                }
                CommandManager.prototype.register = function (createCommand) {
                    this._commands.push(createCommand);
                };
                CommandManager.prototype.apply = function (buffer, monitor) {
                    this._commands.forEach(function (command) {
                        command(buffer, monitor);
                    });
                };
                return CommandManager;
            }());
            exports_5("CommandManager", CommandManager);
            exports_5("commandManager", commandManager = new CommandManager());
        }
    };
});
System.register("ergometer/utils", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    /**
     * Created by tijmen on 25-12-15.
     */
    /** @internal */
    function getByte(value, byteIndex) {
        return (value >> (byteIndex * 8)) & 255;
    }
    exports_6("getByte", getByte);
    function copyArrayBuffer(src) {
        var dst = new ArrayBuffer(src.byteLength);
        new Uint8Array(dst).set(new Uint8Array(src));
        return dst;
    }
    exports_6("copyArrayBuffer", copyArrayBuffer);
    /**
     * Interpret byte buffer as unsigned little endian 32 bit integer.
     * Returns converted number.
     * @param {ArrayBuffer} data - Input buffer.
     * @param {number} offset - Start of data.
     * @return Converted number.
     * @public
     */
    function getUint24(data, offset) {
        return ((data.getUint8(offset + 2) << 16) +
            (data.getUint8(offset + 1) << 8) +
            data.getUint8(offset));
    }
    exports_6("getUint24", getUint24);
    function bufferToString(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
    exports_6("bufferToString", bufferToString);
    function valueToNullValue(value, nullValue) {
        if (value === nullValue)
            return null;
        else
            return value;
    }
    exports_6("valueToNullValue", valueToNullValue);
    function isDefined(variable) {
        return typeof variable !== 'undefined';
    }
    exports_6("isDefined", isDefined);
    /**
     * Returns the integer i in hexadecimal string form,
     * with leading zeroes, such that
     * the resulting string is at least byteCount*2 characters long.
     * @param {int} i
     * @param {int} byteCount
     * @public
     */
    function toHexString(i, byteCount) {
        var str = new Number(i).toString(16);
        while (str.length < byteCount * 2) {
            str = '0' + str;
        }
        return str;
    }
    exports_6("toHexString", toHexString);
    /**
     * Takes a ArrayBuffer or TypedArray and returns its hexadecimal representation.
     * No spaces or linebreaks.
     * @param data
     * @public
     */
    function typedArrayToHexString(data) {
        // view data as a Uint8Array, unless it already is one.
        if (data.buffer) {
            if (!(data instanceof Uint8Array)) {
                data = new Uint8Array(data.buffer);
            }
        }
        else if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data);
        }
        else {
            throw new Error('not an ArrayBuffer or TypedArray.');
        }
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += toHexString(data[i], 1);
        }
        return str;
    }
    exports_6("typedArrayToHexString", typedArrayToHexString);
    function hexStringToTypedArray(hexData) {
        if (hexData.length % 2 !== 0) {
            throw new Error('Wrong hexData string: ' + hexData);
        }
        var length = hexData.length / 2;
        var result = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = parseInt(hexData.substring(i * 2, i * 2 + 2), 16);
        }
        return result;
    }
    exports_6("hexStringToTypedArray", hexStringToTypedArray);
    function getTime() {
        return new Date().getTime();
    }
    exports_6("getTime", getTime);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ergometer/csafe/long_commands", ["ergometer/csafe/command_core", "ergometer/utils"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var command_core_1, utils;
    return {
        setters: [
            function (command_core_1_1) {
                command_core_1 = command_core_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }
        ],
        execute: function () {
            command_core_1.commandManager.register(function (buffer, monitor) {
                buffer.getStrokeState = function (params) {
                    buffer.addRawCommand({
                        waitForResponse: true,
                        command: 26 /* SETUSERCFG1_CMD */,
                        detailCommand: 191 /* PM_GET_STROKESTATE */,
                        onDataReceived: function (data) {
                            if (params.onDataReceived)
                                params.onDataReceived(data.getUint8(0));
                        },
                        onError: params.onError
                    });
                    return buffer;
                };
            });
            command_core_1.commandManager.register(function (buffer, monitor) {
                var receivePowerCurvePart = [];
                var currentPowerCurve = [];
                buffer.getPowerCurve = function (params) {
                    buffer.addRawCommand({
                        waitForResponse: true,
                        command: 26 /* SETUSERCFG1_CMD */,
                        detailCommand: 107 /* PM_GET_FORCEPLOTDATA */,
                        data: [20],
                        onError: params.onError,
                        onDataReceived: function (data) {
                            if (params.onDataReceived) {
                                var bytesReturned = data.getUint8(0); // first byte
                                monitor.traceInfo("received power curve count " + bytesReturned);
                                if (bytesReturned > 0) {
                                    for (var i = 1; i < bytesReturned + 1; i += 2) {
                                        var value = data.getUint16(i, true); // in ltile endian format
                                        receivePowerCurvePart.push(value);
                                    }
                                    monitor.traceInfo('received part :' + JSON.stringify(receivePowerCurvePart));
                                    // try to get another one till it is empty and there is nothing more
                                    buffer
                                        .clear()
                                        .getPowerCurve({ onDataReceived: params.onDataReceived })
                                        .send();
                                }
                                else {
                                    if (receivePowerCurvePart.length > 0) {
                                        currentPowerCurve = receivePowerCurvePart;
                                        receivePowerCurvePart = [];
                                        monitor.traceInfo('Curve:' + JSON.stringify(currentPowerCurve));
                                        if (params.onDataReceived && currentPowerCurve.length > 0) {
                                            params.onDataReceived(currentPowerCurve);
                                        }
                                    }
                                }
                            }
                        }
                    });
                    return buffer;
                };
            });
            command_core_1.registerStandardSet('setProgram', 36 /* SETPROGRAM_CMD */, function (params) {
                return [utils.getByte(params.value, 0), 0];
            });
            command_core_1.registerStandardSet('setTime', 17 /* SETTIME_CMD */, function (params) {
                return [params.hour, params.minute, params.second];
            });
            command_core_1.registerStandardSet('setDate', 18 /* SETDATE_CMD */, function (params) {
                return [utils.getByte(params.year, 0), params.month, params.day];
            });
            command_core_1.registerStandardSet('setTimeout', 19 /* SETTIMEOUT_CMD */, function (params) {
                return [params.value];
            });
            command_core_1.registerStandardSet('setWork', 32 /* SETTWORK_CMD */, function (params) {
                return [params.hour, params.minute, params.second];
            });
            command_core_1.registerStandardSet('setDistance', 33 /* SETHORIZONTAL_CMD */, function (params) {
                return [
                    utils.getByte(params.value, 0),
                    utils.getByte(params.value, 1),
                    params.unit
                ];
            });
            command_core_1.registerStandardSet('setTotalCalories', 35 /* SETCALORIES_CMD */, function (params) {
                return [utils.getByte(params.value, 0), utils.getByte(params.value, 1)];
            });
            command_core_1.registerStandardSet('setPower', 52 /* SETPOWER_CMD */, function (params) {
                return [
                    utils.getByte(params.value, 0),
                    utils.getByte(params.value, 1),
                    params.unit
                ];
            });
        }
    };
});
System.register("ergometer/csafe/short_commands", ["ergometer/csafe/command_core"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var command_core_2;
    return {
        setters: [
            function (command_core_2_1) {
                command_core_2 = command_core_2_1;
            }
        ],
        execute: function () {
            // ----------------------------- get the version info ------------------------------------
            command_core_2.commandManager.register(function (buffer, monitor) {
                buffer.getVersion = function (params) {
                    buffer.addRawCommand({
                        waitForResponse: true,
                        command: 145 /* GETVERSION_CMD */,
                        onDataReceived: function (data) {
                            if (params.onDataReceived) {
                                params.onDataReceived({
                                    ManufacturerId: data.getUint8(0),
                                    CID: data.getUint8(1),
                                    Model: data.getUint8(2),
                                    HardwareVersion: data.getUint16(3, true),
                                    FirmwareVersion: data.getUint16(5, true)
                                });
                            }
                        },
                        onError: params.onError
                    });
                    return buffer;
                };
            });
            command_core_2.registerStandardShortGet('getDistance', 161 /* GETHORIZONTAL_CMD */, function (data) {
                return { value: data.getUint16(0, true), unit: data.getUint8(2) };
            });
        }
    };
});
System.register("ergometer/csafe/push_config_commands", ["ergometer/csafe/command_core"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var command_core_3;
    return {
        setters: [
            function (command_core_3_1) {
                command_core_3 = command_core_3_1;
            }
        ],
        execute: function () {
            command_core_3.registerStandardSetConfig('setWorkoutType', 1 /* PM_SET_WORKOUTTYPE */, function (params) {
                return [params.value];
            });
        }
    };
});
/**
 * Created by tijmen on 04/07/2017.
 *
 * queue function calls which returns a promise, converted to typescript
 * needed as work around for web blue tooth, this ensures that only one call is processed at at time
 *
 *
 */
System.register("ergometer/functionQueue", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var FunctionQueue;
    return {
        setters: [],
        execute: function () {/**
             * Created by tijmen on 04/07/2017.
             *
             * queue function calls which returns a promise, converted to typescript
             * needed as work around for web blue tooth, this ensures that only one call is processed at at time
             *
             *
             */
            FunctionQueue = /** @class */ (function () {
                function FunctionQueue(maxPendingPromises, maxQueuedPromises) {
                    this.maxPendingPromises = Infinity;
                    this.maxQueuedPromises = Infinity;
                    this.pendingPromises = 0;
                    this.queue = [];
                    this.maxPendingPromises =
                        typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity;
                    this.maxQueuedPromises =
                        typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity;
                }
                /**
                 * @param {promiseGenerator}  a function which returns a promise
                 * @param {context} the object which is the context where the function is called in
                 * @param  {params} array of parameters for the function
                 * @return {Promise} promise which is resolved when the function is acually called
                 */
                FunctionQueue.prototype.add = function (promiseGenerator, context) {
                    var params = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        params[_i - 2] = arguments[_i];
                    }
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        // Do not queue to much promises
                        if (self.queue.length >= self.maxQueuedPromises) {
                            reject(new Error('Queue limit reached'));
                            return;
                        }
                        // Add to queue
                        self.queue.push({
                            promiseGenerator: promiseGenerator,
                            context: context,
                            params: params,
                            resolve: resolve,
                            reject: reject
                        });
                        self._dequeue();
                    });
                };
                /**
                 * Number of simultaneously running promises (which are resolving)
                 *
                 * @return {number}
                 */
                FunctionQueue.prototype.getPendingLength = function () {
                    return this.pendingPromises;
                };
                /**
                 * Number of queued promises (which are waiting)
                 *
                 * @return {number}
                 */
                FunctionQueue.prototype.getQueueLength = function () {
                    return this.queue.length;
                };
                /**
                 * @param {*} value
                 * @returns {LocalPromise}
                 */
                FunctionQueue.prototype.resolveWith = function (value) {
                    if (value && typeof value.then === 'function') {
                        return value;
                    }
                    return new Promise(function (resolve) {
                        resolve(value);
                    });
                };
                /**
                 * @returns {boolean} true if first item removed from queue
                 * @private
                 */
                FunctionQueue.prototype._dequeue = function () {
                    var self = this;
                    if (this.pendingPromises >= this.maxPendingPromises) {
                        return false;
                    }
                    // Remove from queue
                    var item = this.queue.shift();
                    if (!item) {
                        return false;
                    }
                    try {
                        this.pendingPromises++;
                        self
                            .resolveWith(item.promiseGenerator.apply(item.context, item.params))
                            .then(function (value) {
                            // It is not pending now
                            self.pendingPromises--;
                            // It should pass values
                            item.resolve(value);
                            self._dequeue();
                        }, function (err) {
                            // It is not pending now
                            self.pendingPromises--;
                            // It should not mask errors
                            item.reject(err);
                            self._dequeue();
                        });
                    }
                    catch (err) {
                        self.pendingPromises--;
                        item.reject(err);
                        self._dequeue();
                    }
                    return true;
                };
                return FunctionQueue;
            }());
            exports_10("FunctionQueue", FunctionQueue);
        }
    };
});
System.register("ergometer/ble/DriverBleat", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var DriverBleat;
    return {
        setters: [],
        execute: function () {
            DriverBleat = /** @class */ (function () {
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
            exports_11("DriverBleat", DriverBleat);
        }
    };
});
System.register("ergometer/ble/DriverSimpleBLE", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var DriverSimpleBLE;
    return {
        setters: [],
        execute: function () {
            DriverSimpleBLE = /** @class */ (function () {
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
            exports_12("DriverSimpleBLE", DriverSimpleBLE);
        }
    };
});
System.register("ergometer/ble/typedefinitions", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var PMDEVICE, PMDEVICE_INFO_SERVICE, PMCONTROL_SERVICE, PMROWING_SERVICE, MODELNUMBER_CHARACTERISIC, SERIALNUMBER_CHARACTERISTIC, HWREVISION_CHARACTERISIC, FWREVISION_CHARACTERISIC, MANUFNAME_CHARACTERISIC, MACHINETYPE_CHARACTERISIC, TRANSMIT_TO_PM_CHARACTERISIC, RECEIVE_FROM_PM_CHARACTERISIC, ROWING_STATUS_CHARACTERISIC, EXTRA_STATUS1_CHARACTERISIC, EXTRA_STATUS2_CHARACTERISIC, ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC, STROKE_DATA_CHARACTERISIC, EXTRA_STROKE_DATA_CHARACTERISIC, SPLIT_INTERVAL_DATA_CHARACTERISIC, EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC, ROWING_SUMMARY_CHARACTERISIC, EXTRA_ROWING_SUMMARY_CHARACTERISIC, HEART_RATE_BELT_INFO_CHARACTERISIC, MULTIPLEXED_INFO_CHARACTERISIC, NOTIFICATION_DESCRIPTOR, PACKET_SIZE;
    return {
        setters: [],
        execute: function () {
            /**
             * Created by tijmen on 16-01-16.
             */
            exports_13("PMDEVICE", PMDEVICE = 'ce060000-43e5-11e4-916c-0800200c9a66');
            // Service UUIDs
            exports_13("PMDEVICE_INFO_SERVICE", PMDEVICE_INFO_SERVICE = 'ce060010-43e5-11e4-916c-0800200c9a66');
            exports_13("PMCONTROL_SERVICE", PMCONTROL_SERVICE = 'ce060020-43e5-11e4-916c-0800200c9a66');
            exports_13("PMROWING_SERVICE", PMROWING_SERVICE = 'ce060030-43e5-11e4-916c-0800200c9a66');
            // Characteristic UUIDs for PM device info service
            exports_13("MODELNUMBER_CHARACTERISIC", MODELNUMBER_CHARACTERISIC = 'ce060011-43e5-11e4-916c-0800200c9a66');
            exports_13("SERIALNUMBER_CHARACTERISTIC", SERIALNUMBER_CHARACTERISTIC = 'ce060012-43e5-11e4-916c-0800200c9a66');
            exports_13("HWREVISION_CHARACTERISIC", HWREVISION_CHARACTERISIC = 'ce060013-43e5-11e4-916c-0800200c9a66');
            exports_13("FWREVISION_CHARACTERISIC", FWREVISION_CHARACTERISIC = 'ce060014-43e5-11e4-916c-0800200c9a66');
            exports_13("MANUFNAME_CHARACTERISIC", MANUFNAME_CHARACTERISIC = 'ce060015-43e5-11e4-916c-0800200c9a66');
            exports_13("MACHINETYPE_CHARACTERISIC", MACHINETYPE_CHARACTERISIC = 'ce060016-43e5-11e4-916c-0800200c9a66');
            // Characteristic UUIDs for PM control service
            exports_13("TRANSMIT_TO_PM_CHARACTERISIC", TRANSMIT_TO_PM_CHARACTERISIC = 'ce060021-43e5-11e4-916c-0800200c9a66');
            exports_13("RECEIVE_FROM_PM_CHARACTERISIC", RECEIVE_FROM_PM_CHARACTERISIC = 'ce060022-43e5-11e4-916c-0800200c9a66');
            // Characteristic UUIDs for rowing service
            exports_13("ROWING_STATUS_CHARACTERISIC", ROWING_STATUS_CHARACTERISIC = 'ce060031-43e5-11e4-916c-0800200c9a66');
            exports_13("EXTRA_STATUS1_CHARACTERISIC", EXTRA_STATUS1_CHARACTERISIC = 'ce060032-43e5-11e4-916c-0800200c9a66');
            exports_13("EXTRA_STATUS2_CHARACTERISIC", EXTRA_STATUS2_CHARACTERISIC = 'ce060033-43e5-11e4-916c-0800200c9a66');
            exports_13("ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC", ROWING_STATUS_SAMPLE_RATE_CHARACTERISIC = 'ce060034-43e5-11e4-916c-0800200c9a66');
            exports_13("STROKE_DATA_CHARACTERISIC", STROKE_DATA_CHARACTERISIC = 'ce060035-43e5-11e4-916c-0800200c9a66');
            exports_13("EXTRA_STROKE_DATA_CHARACTERISIC", EXTRA_STROKE_DATA_CHARACTERISIC = 'ce060036-43e5-11e4-916c-0800200c9a66');
            exports_13("SPLIT_INTERVAL_DATA_CHARACTERISIC", SPLIT_INTERVAL_DATA_CHARACTERISIC = 'ce060037-43e5-11e4-916c-0800200c9a66');
            exports_13("EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC", EXTRA_SPLIT_INTERVAL_DATA_CHARACTERISIC = 'ce060038-43e5-11e4-916c-0800200c9a66');
            exports_13("ROWING_SUMMARY_CHARACTERISIC", ROWING_SUMMARY_CHARACTERISIC = 'ce060039-43e5-11e4-916c-0800200c9a66');
            exports_13("EXTRA_ROWING_SUMMARY_CHARACTERISIC", EXTRA_ROWING_SUMMARY_CHARACTERISIC = 'ce06003a-43e5-11e4-916c-0800200c9a66');
            exports_13("HEART_RATE_BELT_INFO_CHARACTERISIC", HEART_RATE_BELT_INFO_CHARACTERISIC = 'ce06003b-43e5-11e4-916c-0800200c9a66');
            exports_13("MULTIPLEXED_INFO_CHARACTERISIC", MULTIPLEXED_INFO_CHARACTERISIC = 'ce060080-43e5-11e4-916c-0800200c9a66');
            exports_13("NOTIFICATION_DESCRIPTOR", NOTIFICATION_DESCRIPTOR = '00002902-0000-1000-8000-00805f9b34fb');
            exports_13("PACKET_SIZE", PACKET_SIZE = 20);
        }
    };
});
System.register("ergometer/ble/DriverWebBlueTooth", ["ergometer/ble/typedefinitions", "ergometer/typedefinitions", "ergometer/utils"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function hasWebBlueTooth() {
        return navigator && typeof navigator.bluetooth !== 'undefined';
    }
    exports_14("hasWebBlueTooth", hasWebBlueTooth);
    var ble, ergometer, utils, DriverWebBlueTooth;
    return {
        setters: [
            function (ble_1) {
                ble = ble_1;
            },
            function (ergometer_1) {
                ergometer = ergometer_1;
            },
            function (utils_2) {
                utils = utils_2;
            }
        ],
        execute: function () {
            DriverWebBlueTooth = /** @class */ (function () {
                function DriverWebBlueTooth(performanceMonitor) {
                    this._listenerMap = {};
                    // needed to prevent early free of the characteristic
                    this._listerCharacteristicMap = {};
                    this._performanceMonitor = performanceMonitor;
                }
                DriverWebBlueTooth.prototype.connect = function (device, disconnectFn) {
                    var _this = this;
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("connect ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            var newDevice_2 = device._internalDevice;
                            newDevice_2.gatt
                                .connect()
                                .then(function (server) {
                                _this._device = newDevice_2;
                                _this._server = server;
                                _this._disconnectFn = disconnectFn;
                                newDevice_2.addEventListener('ongattserverdisconnected', _this.onDisconnected.bind(_this));
                                resolve();
                            }, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.disconnect = function () {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("disconnect ");
                    }
                    if (this._server && this._server.connected)
                        this._server.disconnect();
                    else
                        this.clearConnectionVars();
                };
                DriverWebBlueTooth.prototype.startScan = function (foundFn) {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("startScan ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            navigator.bluetooth
                                .requestDevice({
                                filters: [
                                    {
                                        services: [ble.PMDEVICE]
                                    }
                                ],
                                optionalServices: [
                                    ble.PMDEVICE_INFO_SERVICE,
                                    ble.PMCONTROL_SERVICE,
                                    ble.PMROWING_SERVICE
                                ]
                            })
                                .then(function (device) {
                                foundFn({
                                    address: device.id,
                                    name: device.name,
                                    rssi: typeof device.adData !== 'undefined' && device.adData.rssi
                                        ? device.adData.rssi
                                        : 0,
                                    _internalDevice: device
                                });
                            })
                                .then(resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.stopScan = function () {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("stopScan ");
                    }
                    if (typeof navigator.bluetooth.cancelRequest !== 'undefined') {
                        return navigator.bluetooth.cancelRequest();
                    }
                    else {
                        return new Promise(function (resolve, reject) {
                            resolve();
                        });
                    }
                };
                DriverWebBlueTooth.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
                    var _this = this;
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("writeCharacteristic " + characteristicUUID + " : " + data + " ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            _this.getCharacteristic(serviceUIID, characteristicUUID)
                                .then(function (characteristic) {
                                return characteristic.writeValue(data.buffer);
                            })
                                .then(resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
                    var _this = this;
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("readCharacteristic " + characteristicUUID + "  ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            _this.getCharacteristic(serviceUIID, characteristicUUID)
                                .then(function (characteristic) {
                                return characteristic.readValue();
                            })
                                .then(function (data) {
                                if (_this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                                    _this._performanceMonitor.traceInfo("doReadCharacteristic " + characteristicUUID + " : " + utils.typedArrayToHexString(data.buffer) + " ");
                                }
                                resolve(data.buffer);
                            }, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
                    var _this = this;
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("enableNotification " + characteristicUUID + "  ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            _this.getCharacteristic(serviceUIID, characteristicUUID)
                                .then(function (characteristic) {
                                return characteristic.startNotifications().then(function (_) {
                                    _this._listenerMap[characteristicUUID] = receive;
                                    // bug fix: this prevents the chracteristic from being free-ed
                                    _this._listerCharacteristicMap[characteristicUUID] = characteristic;
                                    characteristic.addEventListener('characteristicvaluechanged', _this.onCharacteristicValueChanged.bind(_this));
                                    resolve();
                                }, reject);
                            })
                                .then(resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
                    var _this = this;
                    // only disable when receive is
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("disableNotification " + characteristicUUID + "  ");
                    }
                    return new Promise(function (resolve, reject) {
                        try {
                            if (typeof _this._listenerMap[characteristicUUID] !== 'undefined' &&
                                _this._listenerMap[characteristicUUID]) {
                                _this.getCharacteristic(serviceUIID, characteristicUUID).then(function (characteristic) {
                                    characteristic.stopNotifications().then(function () {
                                        _this._listenerMap[characteristic.uuid] = null;
                                        _this._listerCharacteristicMap[characteristic.uuid] = null;
                                        characteristic.removeEventListener('characteristicvaluechanged', _this.onCharacteristicValueChanged);
                                        resolve();
                                    }, reject);
                                });
                            }
                            else
                                resolve(); // just resolve nothing to do
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                // simple wrapper for bleat characteristic functions
                DriverWebBlueTooth.prototype.getCharacteristic = function (serviceUid, characteristicUid) {
                    var _this = this;
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("getCharacteristic " + characteristicUid + " ");
                    }
                    return new Promise(function (resolve, reject) {
                        if (!_this._server || !_this._server.connected) {
                            reject('server not connected');
                        }
                        else {
                            _this._server
                                .getPrimaryService(serviceUid)
                                .then(function (service) {
                                return service.getCharacteristic(characteristicUid);
                            })
                                .then(resolve, reject);
                        }
                    });
                };
                DriverWebBlueTooth.prototype.onDisconnected = function (event) {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("onDisconnected ");
                    }
                    if (this._disconnectFn)
                        this._disconnectFn();
                    this.clearConnectionVars();
                };
                DriverWebBlueTooth.prototype.clearConnectionVars = function () {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("clearConnectionVars ");
                    }
                    if (this._device) {
                        this._device.removeEventListener('ongattserverdisconnected', this.onDisconnected);
                    }
                    this._device = null;
                    this._server = null;
                    this._disconnectFn = null;
                    this._listenerMap = {};
                    this._listerCharacteristicMap = {};
                };
                DriverWebBlueTooth.prototype.onCharacteristicValueChanged = function (event) {
                    if (this._performanceMonitor.logLevel === ergometer.LogLevel.trace) {
                        this._performanceMonitor.traceInfo("onCharacteristicValueChanged " + event.target.uuid + " : " + utils.typedArrayToHexString(event.target.value.buffer) + " ");
                    }
                    try {
                        var func = this._listenerMap[event.target.uuid];
                        if (func)
                            func(event.target.value.buffer);
                    }
                    catch (e) {
                        if (this._performanceMonitor) {
                            this._performanceMonitor.handleError(e.toString());
                        }
                        else
                            throw e;
                    }
                };
                return DriverWebBlueTooth;
            }());
            exports_14("DriverWebBlueTooth", DriverWebBlueTooth);
        }
    };
});
System.register("ergometer/ble/RecordingDriver", ["ergometer/utils"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var utils, RecordingEventType, RecordingDriver;
    return {
        setters: [
            function (utils_3) {
                utils = utils_3;
            }
        ],
        execute: function () {
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
            exports_15("RecordingEventType", RecordingEventType);
            RecordingDriver = /** @class */ (function () {
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
            exports_15("RecordingDriver", RecordingDriver);
        }
    };
});
System.register("ergometer/ble/ReplayDriver", ["ergometer/ble/RecordingDriver", "ergometer/typedefinitions", "ergometer/utils"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var RecordingDriver_1, ergometer, utils, ReplayDriver;
    return {
        setters: [
            function (RecordingDriver_1_1) {
                RecordingDriver_1 = RecordingDriver_1_1;
            },
            function (ergometer_2) {
                ergometer = ergometer_2;
            },
            function (utils_4) {
                utils = utils_4;
            }
        ],
        execute: function () {
            ReplayDriver = /** @class */ (function () {
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
                    this.addEvent(RecordingDriver_1.RecordingEventType.scanFoundFn, false, foundFn);
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.startScan, true, resolve, reject);
                    });
                };
                ReplayDriver.prototype.stopScan = function () {
                    this.addEvent(RecordingDriver_1.RecordingEventType.stopScan, true);
                };
                ReplayDriver.prototype.connect = function (device, disconnectFn) {
                    var _this = this;
                    this.addEvent(RecordingDriver_1.RecordingEventType.disconnectFn, false, disconnectFn);
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.connect, true, resolve, reject);
                    });
                };
                ReplayDriver.prototype.disconnect = function () {
                    this.addEvent(RecordingDriver_1.RecordingEventType.disconnect, true);
                };
                ReplayDriver.prototype.writeCharacteristic = function (serviceUIID, characteristicUUID, data) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.writeCharacteristic, true, resolve, reject, serviceUIID, characteristicUUID);
                    });
                };
                ReplayDriver.prototype.readCharacteristic = function (serviceUIID, characteristicUUID) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.readCharacteristic, true, resolve, reject, serviceUIID, characteristicUUID);
                    });
                };
                ReplayDriver.prototype.enableNotification = function (serviceUIID, characteristicUUID, receive) {
                    var _this = this;
                    this.addEvent(RecordingDriver_1.RecordingEventType.notificationReceived, false, receive, null, serviceUIID, characteristicUUID);
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.enableNotification, true, resolve, reject, serviceUIID, characteristicUUID);
                    });
                };
                ReplayDriver.prototype.disableNotification = function (serviceUIID, characteristicUUID) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.addEvent(RecordingDriver_1.RecordingEventType.disableNotification, true, resolve, reject, serviceUIID, characteristicUUID);
                    });
                };
                ReplayDriver.prototype.getRelativeTime = function () {
                    return utils.getTime() - this._startTime;
                };
                ReplayDriver.prototype.isCallBack = function (eventType) {
                    return (eventType === RecordingDriver_1.RecordingEventType.scanFoundFn ||
                        eventType === RecordingDriver_1.RecordingEventType.disconnectFn ||
                        eventType === RecordingDriver_1.RecordingEventType.notificationReceived);
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
                            var eventType = RecordingDriver_1.RecordingEventType[event.eventType];
                            if (eventType === RecordingDriver_1.RecordingEventType.readCharacteristic ||
                                eventType === RecordingDriver_1.RecordingEventType.notificationReceived) {
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
                        if (this_1.isCallBack(RecordingDriver_1.RecordingEventType[event_1.eventType])) {
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
                        eventType: RecordingDriver_1.RecordingEventType[eventType]
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
            exports_16("ReplayDriver", ReplayDriver);
        }
    };
});
System.register("ergometer/performanceMonitor", ["ergometer/pubsub", "ergometer/ble/RecordingDriver", "ergometer/ble/ReplayDriver", "ergometer/ble/DriverWebBlueTooth", "ergometer/ble/DriverBleat", "ergometer/ble/DriverSimpleBLE", "ergometer/csafe/command_core", "ergometer/utils", "ergometer/typedefinitions", "ergometer/ble/typedefinitions", "ergometer/csafe/typedefinitions"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var pubSub, recordingDriver, replayDriver, DriverWebBlueTooth_1, DriverBleat_1, DriverSimpleBLE_1, command_core_4, utils, ergometer, ble, csafe, PerformanceMonitor;
    return {
        setters: [
            function (pubSub_1) {
                pubSub = pubSub_1;
            },
            function (recordingDriver_1) {
                recordingDriver = recordingDriver_1;
            },
            function (replayDriver_1) {
                replayDriver = replayDriver_1;
            },
            function (DriverWebBlueTooth_1_1) {
                DriverWebBlueTooth_1 = DriverWebBlueTooth_1_1;
            },
            function (DriverBleat_1_1) {
                DriverBleat_1 = DriverBleat_1_1;
            },
            function (DriverSimpleBLE_1_1) {
                DriverSimpleBLE_1 = DriverSimpleBLE_1_1;
            },
            function (command_core_4_1) {
                command_core_4 = command_core_4_1;
            },
            function (utils_5) {
                utils = utils_5;
            },
            function (ergometer_3) {
                ergometer = ergometer_3;
            },
            function (ble_2) {
                ble = ble_2;
            },
            function (csafe_1) {
                csafe = csafe_1;
            }
        ],
        execute: function () {
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
            PerformanceMonitor = /** @class */ (function () {
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
                            command_core_4.commandManager.apply(this.csafeBuffer, this);
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
                        this._driver = new DriverBleat_1.DriverBleat();
                    }
                    else if (typeof simpleBLE !== 'undefined' && simpleBLE) {
                        this._driver = new DriverSimpleBLE_1.DriverSimpleBLE();
                    }
                    else if (DriverWebBlueTooth_1.hasWebBlueTooth()) {
                        this._driver = new DriverWebBlueTooth_1.DriverWebBlueTooth(this);
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
            exports_17("PerformanceMonitor", PerformanceMonitor);
        }
    };
});
System.register("index", ["ergometer/csafe/long_commands", "ergometer/csafe/short_commands", "ergometer/csafe/push_config_commands", "ergometer/utils", "ergometer/functionQueue", "ergometer/pubsub", "ergometer/ble/DriverBleat", "ergometer/ble/DriverSimpleBLE", "ergometer/ble/DriverWebBlueTooth", "ergometer/ble/RecordingDriver", "ergometer/ble/ReplayDriver", "ergometer/ble/typedefinitions", "ergometer/csafe/typedefinitions", "ergometer/csafe/command_core", "ergometer/typedefinitions", "ergometer/performanceMonitor"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var long_commands, short_commands, push_config_commands;
    var exportedNames_1 = {
        "long_commands": true,
        "short_commands": true,
        "push_config_commands": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_18(exports);
    }
    return {
        setters: [
            function (long_commands_1) {
                long_commands = long_commands_1;
            },
            function (short_commands_1) {
                short_commands = short_commands_1;
            },
            function (push_config_commands_1) {
                push_config_commands = push_config_commands_1;
            },
            function (utils_6_1) {
                exportStar_1(utils_6_1);
            },
            function (functionQueue_1_1) {
                exportStar_1(functionQueue_1_1);
            },
            function (pubsub_1_1) {
                exportStar_1(pubsub_1_1);
            },
            function (DriverBleat_2_1) {
                exportStar_1(DriverBleat_2_1);
            },
            function (DriverSimpleBLE_2_1) {
                exportStar_1(DriverSimpleBLE_2_1);
            },
            function (DriverWebBlueTooth_2_1) {
                exportStar_1(DriverWebBlueTooth_2_1);
            },
            function (RecordingDriver_2_1) {
                exportStar_1(RecordingDriver_2_1);
            },
            function (ReplayDriver_1_1) {
                exportStar_1(ReplayDriver_1_1);
            },
            function (typedefinitions_1_1) {
                exportStar_1(typedefinitions_1_1);
            },
            function (typedefinitions_2_1) {
                exportStar_1(typedefinitions_2_1);
            },
            function (command_core_5_1) {
                exportStar_1(command_core_5_1);
            },
            function (typedefinitions_3_1) {
                exportStar_1(typedefinitions_3_1);
            },
            function (performanceMonitor_1_1) {
                exportStar_1(performanceMonitor_1_1);
            }
        ],
        execute: function () {
            exports_18("long_commands", long_commands);
            exports_18("short_commands", short_commands);
            exports_18("push_config_commands", push_config_commands);
        }
    };
});
//# sourceMappingURL=ergometer.js.map