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
var _City_name, _City_originalPlayer, _City_player, _City_ruleRegistry, _City_tile, _City_tiles, _City_tilesWorked, _City_yieldRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const Captured_1 = require("./Rules/Captured");
const Cost_1 = require("./Rules/Cost");
const Created_1 = require("./Rules/Created");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Destroyed_1 = require("./Rules/Destroyed");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Yield_1 = require("./Rules/Yield");
const YieldRegistry_1 = require("@civ-clone/core-yield/YieldRegistry");
const Tileset_1 = require("@civ-clone/core-world/Tileset");
class City extends DataObject_1.DataObject {
    constructor(player, tile, name, ruleRegistry = RuleRegistry_1.instance, yieldRegistry = YieldRegistry_1.instance) {
        super();
        _City_name.set(this, void 0);
        _City_originalPlayer.set(this, void 0);
        _City_player.set(this, void 0);
        _City_ruleRegistry.set(this, void 0);
        _City_tile.set(this, void 0);
        _City_tiles.set(this, void 0);
        _City_tilesWorked.set(this, new Tileset_1.default());
        _City_yieldRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _City_name, name, "f");
        __classPrivateFieldSet(this, _City_originalPlayer, player, "f");
        __classPrivateFieldSet(this, _City_player, player, "f");
        __classPrivateFieldSet(this, _City_tile, tile, "f");
        // TODO: have this controlled via `Rule`s to match original (removing indices 0, 4, 20, 24)
        __classPrivateFieldSet(this, _City_tiles, __classPrivateFieldGet(this, _City_tile, "f").getSurroundingArea(), "f");
        __classPrivateFieldGet(this, _City_tilesWorked, "f").push(tile);
        __classPrivateFieldSet(this, _City_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldSet(this, _City_yieldRegistry, yieldRegistry, "f");
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Created_1.Created, this);
        this.addKey('name', 'originalPlayer', 'player', 'tile', 'tiles', 'tilesWorked', 'yields');
    }
    capture(capturingPlayer) {
        // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
        const player = __classPrivateFieldGet(this, _City_player, "f");
        __classPrivateFieldSet(this, _City_player, capturingPlayer, "f");
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Captured_1.Captured, this, capturingPlayer, player);
    }
    destroy(player = null) {
        __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Destroyed_1.Destroyed, this, player);
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
        return __classPrivateFieldGet(this, _City_tilesWorked, "f");
    }
    yields(yields = [], yieldRegistry = __classPrivateFieldGet(this, _City_yieldRegistry, "f")) {
        if (yields.length === 0) {
            yields = yieldRegistry.entries();
        }
        const tilesetYields = __classPrivateFieldGet(this, _City_tilesWorked, "f").yields(__classPrivateFieldGet(this, _City_player, "f"), yields);
        // Do for...of so that as yields are added, they too are processed.
        for (const cityYield of tilesetYields) {
            __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Yield_1.Yield, cityYield, this, tilesetYields);
        }
        for (const cityYield of tilesetYields) {
            __classPrivateFieldGet(this, _City_ruleRegistry, "f").process(Cost_1.Cost, cityYield, this, tilesetYields);
        }
        return tilesetYields;
    }
}
exports.City = City;
_City_name = new WeakMap(), _City_originalPlayer = new WeakMap(), _City_player = new WeakMap(), _City_ruleRegistry = new WeakMap(), _City_tile = new WeakMap(), _City_tiles = new WeakMap(), _City_tilesWorked = new WeakMap(), _City_yieldRegistry = new WeakMap();
exports.default = City;
//# sourceMappingURL=City.js.map