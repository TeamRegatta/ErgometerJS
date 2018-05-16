var PubSub = /** @class */ (function () {
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
export { PubSub };
// new style event using generics
var Event = /** @class */ (function () {
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
export { Event };
//# sourceMappingURL=pubsub.js.map