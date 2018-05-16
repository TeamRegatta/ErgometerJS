/**
 * Created by tijmen on 06-02-16.
 */
import { registerStandardSetConfig } from './command_core';
registerStandardSetConfig('setWorkoutType', 1 /* PM_SET_WORKOUTTYPE */, function (params) {
    return [params.value];
});
//# sourceMappingURL=push_config_commands.js.map