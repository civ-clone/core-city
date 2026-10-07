"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeRoute = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const keysChanged_1 = require("@civ-clone/core-registry/keysChanged");
/**
 * A trade route held by `from()`, its home city, to `to()`. A route is one-way: only `from()` gains by it. What a route
 * is worth, how many a city can hold and when one replaces another are up to the ruleset; replacing a route changes
 * its `to()`, so it keeps its place among the city's routes.
 */
class TradeRoute extends DataObject_1.default {
    constructor(from, to) {
        super();
        this._from = from;
        this._to = to;
        this.addKey('from', 'to');
    }
    from() {
        return this._from;
    }
    setTo(to) {
        this._to = to;
        (0, keysChanged_1.default)(this);
    }
    to() {
        return this._to;
    }
}
exports.TradeRoute = TradeRoute;
exports.default = TradeRoute;
//# sourceMappingURL=TradeRoute.js.map