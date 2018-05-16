export var MonitorConnectionState;
(function (MonitorConnectionState) {
    MonitorConnectionState[MonitorConnectionState["inactive"] = 0] = "inactive";
    MonitorConnectionState[MonitorConnectionState["deviceReady"] = 1] = "deviceReady";
    MonitorConnectionState[MonitorConnectionState["scanning"] = 2] = "scanning";
    MonitorConnectionState[MonitorConnectionState["connecting"] = 3] = "connecting";
    MonitorConnectionState[MonitorConnectionState["connected"] = 4] = "connected";
    MonitorConnectionState[MonitorConnectionState["servicesFound"] = 5] = "servicesFound";
    MonitorConnectionState[MonitorConnectionState["readyForCommunication"] = 6] = "readyForCommunication";
})(MonitorConnectionState || (MonitorConnectionState = {}));
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["error"] = 0] = "error";
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["debug"] = 2] = "debug";
    LogLevel[LogLevel["trace"] = 3] = "trace";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=typedefinitions.js.map