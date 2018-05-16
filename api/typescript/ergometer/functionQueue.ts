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
  (...args: any[]): Promise<any | void>
}

export class FunctionQueue {
  private maxPendingPromises = Infinity
  private maxQueuedPromises = Infinity
  private pendingPromises = 0
  private queue = []

  constructor(maxPendingPromises?: number, maxQueuedPromises?: number) {
    this.maxPendingPromises =
      typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity
    this.maxQueuedPromises =
      typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity
  }

  /**
   * @param {promiseGenerator}  a function which returns a promise
   * @param {context} the object which is the context where the function is called in
   * @param  {params} array of parameters for the function
   * @return {Promise} promise which is resolved when the function is acually called
   */
  public add(
    promiseGenerator: IPromiseFunction,
    context: any,
    ...params: any[]
  ): Promise<any | void> {
    const self = this
    return new Promise(function(resolve, reject) {
      // Do not queue to much promises
      if (self.queue.length >= self.maxQueuedPromises) {
        reject(new Error('Queue limit reached'))
        return
      }

      // Add to queue
      self.queue.push({
        promiseGenerator: promiseGenerator,
        context: context,
        params: params,
        resolve: resolve,
        reject: reject
      })

      self._dequeue()
    })
  }

  /**
   * Number of simultaneously running promises (which are resolving)
   *
   * @return {number}
   */
  public getPendingLength(): number {
    return this.pendingPromises
  }

  /**
   * Number of queued promises (which are waiting)
   *
   * @return {number}
   */
  public getQueueLength(): number {
    return this.queue.length
  }

  /**
   * @param {*} value
   * @returns {LocalPromise}
   */
  private resolveWith(value: any): Promise<any> {
    if (value && typeof value.then === 'function') {
      return value
    }

    return new Promise(function(resolve) {
      resolve(value)
    })
  }

  /**
   * @returns {boolean} true if first item removed from queue
   * @private
   */
  private _dequeue(): boolean {
    const self = this
    if (this.pendingPromises >= this.maxPendingPromises) {
      return false
    }

    // Remove from queue
    const item = this.queue.shift()
    if (!item) {
      return false
    }

    try {
      this.pendingPromises++

      self
        .resolveWith(item.promiseGenerator.apply(item.context, item.params))
        // Forward all stuff
        .then(
          function(value) {
            // It is not pending now
            self.pendingPromises--
            // It should pass values
            item.resolve(value)
            self._dequeue()
          },
          function(err) {
            // It is not pending now
            self.pendingPromises--
            // It should not mask errors
            item.reject(err)
            self._dequeue()
          }
        )
    } catch (err) {
      self.pendingPromises--
      item.reject(err)
      self._dequeue()
    }

    return true
  }
}
