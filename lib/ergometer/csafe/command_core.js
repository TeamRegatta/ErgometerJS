var CommandManager = /** @class */ (function () {
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
export { CommandManager };
export var commandManager = new CommandManager();
export function registerStandardSet(functionName, command, setParams) {
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
export function registerStandardSetConfig(functionName, command, setParams) {
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
export function registerStandardShortGet(functionName, command, converter) {
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
//# sourceMappingURL=command_core.js.map