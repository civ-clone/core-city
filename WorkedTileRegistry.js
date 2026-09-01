"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.WorkedTileRegistry = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const CanBeWorked_1 = require("./Rules/CanBeWorked");
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Tileset_1 = require("@civ-clone/core-world/Tileset");
const WorkedTile_1 = require("./WorkedTile");
class WorkedTileRegistry extends EntityRegistry_1.default {
    constructor(ruleRegistry = RuleRegistry_1.instance) {
        super(WorkedTile_1.default);
        this._ruleRegistry = ruleRegistry;
    }
    getByCity(city) {
        return this.getBy('city', city);
    }
    getByTile(tile) {
        const [workedTile] = this.getBy('tile', tile);
        return workedTile !== null && workedTile !== void 0 ? workedTile : null;
    }
    getTilesByCity(city) {
        return Tileset_1.default.from(...this.filter((workedTile) => workedTile.city() === city).map((workedTile) => workedTile.tile()));
    }
    register(...workedTiles) {
        workedTiles.forEach((workedTile) => {
            const tile = workedTile.tile(), existingTile = this.getByTile(tile);
            if (existingTile !== null) {
                throw new TypeError(`Tile ${tile.x()}, ${tile.y()} is already worked!`);
            }
            super.register(workedTile);
        });
    }
    tileCanBeWorkedBy(tile, city) {
        return this._ruleRegistry
            .process(CanBeWorked_1.default, tile, city)
            .every((result) => result);
    }
    tileIsWorked(tile) {
        return !!this.getByTile(tile);
    }
    unregisterByTile(tile) {
        const workedTile = this.getByTile(tile);
        if (workedTile === null) {
            return;
        }
        this.unregister(workedTile);
    }
}
exports.WorkedTileRegistry = WorkedTileRegistry;
exports.instance = new WorkedTileRegistry();
exports.default = WorkedTileRegistry;
//# sourceMappingURL=WorkedTileRegistry.js.map