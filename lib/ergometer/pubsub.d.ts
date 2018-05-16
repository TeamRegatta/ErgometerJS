/**
 *
 * Created by tijmen on 01-06-15.
 *
 * License:
 *
 * Copyright 2016 Tijmen van Gulik (tijmen@vangulik.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface ISubscription {
    (...args: any[]): void;
}
export interface ISubscriptionItem {
    object: any;
    func: ISubscription;
}
export interface IDictionary {
    [name: string]: ISubscriptionItem[];
}
export declare class PubSub {
    private registry;
    pub(name: string, ...args: any[]): void;
    pubASync(name: string, ...args: any[]): void;
    sub(applyObject: any, name: string, fn: ISubscription): void;
    unsub(name: string, fn: ISubscription): void;
    subscribeCount(name: string): number;
}
export interface ISubscriptionChanged {
    (sender: any, count: number): void;
}
export declare class Event<T extends ISubscription> {
    protected _subscribed: ISubscriptionItem[];
    protected _subScriptionChangedEvent: ISubscriptionChanged;
    sub(applyObject: any, event: T): void;
    unsub(event: T): void;
    readonly pub: T;
    readonly pubAsync: T;
    readonly count: number;
    registerChangedEvent(func: ISubscriptionChanged): void;
    protected doChangedEvent(): void;
    protected findSubscription(event: T): ISubscriptionItem;
    protected doPub(args: any[]): void;
}
