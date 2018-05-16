/**
 * Created by tijmen on 04/07/2017.
 *
 * queue function calls which returns a promise, converted to typescript
 * needed as work around for web blue tooth, this ensures that only one call is processed at at time
 *
 *
 */
var FunctionQueue = /** @class */ (function () {
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
                // Forward all stuff
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
export { FunctionQueue };
//# sourceMappingURL=functionQueue.js.map