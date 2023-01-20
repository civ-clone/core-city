"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WorkedTileRegistry_ruleRegistry;
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
        _WorkedTileRegistry_ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _WorkedTileRegistry_ruleRegistry, ruleRegistry, "f");
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
        return __classPrivateFieldGet(this, _WorkedTileRegistry_ruleRegistry, "f")
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
_WorkedTileRegistry_ruleRegistry = new WeakMap();
exports.instance = new WorkedTileRegistry();
exports.default = WorkedTileRegistry;
//# sourceMappingURL=WorkedTileRegistry.js.map