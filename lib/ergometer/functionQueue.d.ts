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
export declare class FunctionQueue {
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
