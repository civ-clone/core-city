"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.TradeRouteRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const TradeRoute_1 = require("./TradeRoute");
class TradeRouteRegistry extends EntityRegistry_1.default {
    constructor() {
        super(TradeRoute_1.default);
        // A route's city is fixed; its partner changes when a better one replaces it (`setTo`), which says so
        //  (`keysChanged`) (civ-clone/web-renderer#308).
        this._byCity = this.index((route) => route.from());
        this._byPartner = this.index((route) => route.to());
    }
    /** The routes `city` holds, in the order they were set up. */
    getByCity(city) {
        return this._byCity.get(city);
    }
    /** The routes other cities hold to `city`. */
    getByPartner(city) {
        return this._byPartner.get(city);
    }
}
exports.TradeRouteRegistry = TradeRouteRegistry;
exports.instance = new TradeRouteRegistry();
exports.default = TradeRouteRegistry;
//# sourceMappingURL=TradeRouteRegistry.js.map