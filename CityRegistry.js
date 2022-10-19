"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const City_1 = require("./City");
class CityRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(City_1.default);
    }
    getByPlayer(player) {
        return this.filter((city) => city.player() === player);
    }
    getByTile(tile) {
        const [city] = this.filter((city) => city.tile() === tile);
        return city !== null && city !== void 0 ? city : null;
    }
}
exports.CityRegistry = CityRegistry;
exports.instance = new CityRegistry();
exports.default = CityRegistry;
//# sourceMappingURL=CityRegistry.js.map