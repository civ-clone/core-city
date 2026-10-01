"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const City_1 = require("./City");
class CityRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(City_1.default);
        // A city's tile is fixed for its lifetime (capture changes its player, not
        // where it is), so the key cannot go stale under a live registration and
        // needs no `reindex`. The AI asks "is there a city here?" of every tile it
        // knows, every turn, and of the 81 tiles around every candidate site.
        this._byTile = this.index((city) => city.tile());
    }
    getByPlayer(player, includeDestroyed = false) {
        if (includeDestroyed) {
            return this.getBy('player', player);
        }
        return this.filter((city) => city.player() === player && !city.destroyed());
    }
    getByTile(tile) {
        const [city] = this._byTile
            .get(tile)
            .filter((city) => !city.destroyed());
        return city !== null && city !== void 0 ? city : null;
    }
}
exports.CityRegistry = CityRegistry;
exports.instance = new CityRegistry();
exports.default = CityRegistry;
//# sourceMappingURL=CityRegistry.js.map