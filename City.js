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
var _City_destroyed, _City_name, _City_originalPlayer, _City_player, _City_ruleRegistry, _City_tile, _City_tiles, _City_workedTileRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const WorkedTileRegistry_1 = require("./WorkedTileRegistry");
const Captured_1 = require("./Rules/Captured");
const Tiles_1 = require("./Rules/Tiles");
const Cost_1 = require("./Rules/Cost");
const Created_1 = require("./Rules/Created");
const Destroyed_1 = require("./Rules/Destroyed");
const Yield_1 = require("@civ-clone/core-yield/Yield");
const Yield_2 = require("./Rules/Yield");
const YieldModifier_1 = require("./Rules/YieldModifier");
class City extends DataObject_1.DataObject {
    constructor(player, tile, name, ruleRegistry = RuleRegistry_1.instance, workedTileRegistry = WorkedTileRegistry_1.instance) {
        var _a;
        super();
        _City_destroyed.set(this, false);
        _City_name.set(this, void 0);
        _City_originalPlayer.set(this, void 0);
        _City_player.set(this, void 0);
        _City_ruleRegistry.set(this, void 0);
        _City_tile.set(this, void 0);
        _City_tiles.set(this, void 0);
        _City_workedTileRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _City_name, name, "f");
        __classPrivateFieldSet(this, _City_originalPlayer, player, "f");
        __classPrivateFieldSet(this, _City_player, player, "f");
        __classPrivateFieldSet(this, _City_tile, tile, "f");
        __classPrivateFieldSet(this, _City_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldSet(this, _City_workedTileRegistry, workedTileRegistry, "f");
        _a = this, [({ set value(_b) { __classPrivateFieldSet(_a, _City_tiles, _b, "f"); } }).value] = __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Tiles_1.default, this);
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Created_1.default, this);
        this.addKey('destroyed', 'name', 'originalPlayer', 'player', 'tile', 'tiles', 'tilesWorked', 'yields');
    }
    capture(capturingPlayer) {
        // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
        const player = __classPrivateFieldGet(this, _City_player, "f");
        __classPrivateFieldSet(this, _City_player, capturingPlayer, "f");
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Captured_1.default, this, capturingPlayer, player);
    }
    destroy(player = null) {
        __classPrivateFieldSet(this, _City_destroyed, true, "f");
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Destroyed_1.default, this, player);
    }
    destroyed() {
        return __classPrivateFieldGet(this, _City_destroyed, "f");
    }
    name() {
        return __classPrivateFieldGet(this, _City_name, "f");
    }
    setName(name) {
        __classPrivateFieldSet(this, _City_name, name, "f");
    }
    originalPlayer() {
        return __classPrivateFieldGet(this, _City_originalPlayer, "f");
    }
    player() {
        return __classPrivateFieldGet(this, _City_player, "f");
    }
    tile() {
        return __classPrivateFieldGet(this, _City_tile, "f");
    }
    tiles() {
        return __classPrivateFieldGet(this, _City_tiles, "f");
    }
    tilesWorked() {
        return __classPrivateFieldGet(this, _City_workedTileRegistry, "f").getTilesByCity(this);
    }
    yields() {
        const yields = [];
        [
            __classPrivateFieldGet(this, _City_ruleRegistry, "f").get(Yield_2.default),
            __classPrivateFieldGet(this, _City_ruleRegistry, "f").get(YieldModifier_1.default),
            __classPrivateFieldGet(this, _City_ruleRegistry, "f").get(Cost_1.default),
        ]
            .flat()
            .forEach((rule) => {
            if (!rule.validate(this, yields)) {
                return;
            }
            const cityYields = rule.process(this, yields);
            if (!cityYields) {
                return;
            }
            if (cityYields instanceof Yield_1.default) {
                yields.push(cityYields);
                return;
            }
            cityYields.forEach((cityYield) => yields.push(cityYield));
        });
        return yields;
    }
}
exports.City = City;
_City_destroyed = new WeakMap(), _City_name = new WeakMap(), _City_originalPlayer = new WeakMap(), _City_player = new WeakMap(), _City_ruleRegistry = new WeakMap(), _City_tile = new WeakMap(), _City_tiles = new WeakMap(), _City_workedTileRegistry = new WeakMap();
exports.default = City;
//# sourceMappingURL=City.js.map