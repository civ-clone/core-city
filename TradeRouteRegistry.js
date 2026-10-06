"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.TradeRouteRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const TradeRoute_1 = require("./TradeRoute");
class TradeRouteRegistry extends EntityRegistry_1.default {
    constructor() {
        super(TradeRoute_1.default);
    }
    /** The routes `city` holds, in the order they were set up. */
    getByCity(city) {
        return this.getBy('from', city);
    }
    /** The routes other cities hold to `city`. */
    getByPartner(city) {
        return this.getBy('to', city);
    }
}
exports.TradeRouteRegistry = TradeRouteRegistry;
exports.instance = new TradeRouteRegistry();
exports.default = TradeRouteRegistry;
//# sourceMappingURL=TradeRouteRegistry.js.map