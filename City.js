"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _originalPlayer, _player, _ruleRegistry, _tile, _tiles, _tilesWorked, _yieldRegistry;
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
        _name.set(this, void 0);
        _originalPlayer.set(this, void 0);
        _player.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        _tile.set(this, void 0);
        _tiles.set(this, void 0);
        _tilesWorked.set(this, new Tileset_1.default());
        _yieldRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _originalPlayer, player);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _tile, tile);
        // TODO: have this controlled via `Rule`s to match original (removing indices 0, 4, 20, 24)
        __classPrivateFieldSet(this, _tiles, __classPrivateFieldGet(this, _tile).getSurroundingArea());
        __classPrivateFieldGet(this, _tilesWorked).push(tile);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldSet(this, _yieldRegistry, yieldRegistry);
        __classPrivateFieldGet(this, _ruleRegistry).process(Created_1.Created, this);
        this.addKey('name', 'originalPlayer', 'player', 'tile', 'tiles', 'tilesWorked', 'yields');
    }
    capture(capturingPlayer) {
        // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
        const player = __classPrivateFieldGet(this, _player);
        __classPrivateFieldSet(this, _player, capturingPlayer);
        __classPrivateFieldGet(this, _ruleRegistry).process(Captured_1.Captured, this, capturingPlayer, player);
    }
    destroy(player = null) {
        __classPrivateFieldGet(this, _ruleRegistry).process(Destroyed_1.Destroyed, this, player);
    }
    name() {
        return __classPrivateFieldGet(this, _name);
    }
    setName(name) {
        __classPrivateFieldSet(this, _name, name);
    }
    originalPlayer() {
        return __classPrivateFieldGet(this, _originalPlayer);
    }
    player() {
        return __classPrivateFieldGet(this, _player);
    }
    tile() {
        return __classPrivateFieldGet(this, _tile);
    }
    tiles() {
        return __classPrivateFieldGet(this, _tiles);
    }
    tilesWorked() {
        return __classPrivateFieldGet(this, _tilesWorked);
    }
    yields(yields = [], yieldRegistry = __classPrivateFieldGet(this, _yieldRegistry)) {
        if (yields.length === 0) {
            yields = yieldRegistry.entries();
        }
        const tilesetYields = __classPrivateFieldGet(this, _tilesWorked).yields(__classPrivateFieldGet(this, _player), yields);
        // Do for...of so that as yields are added, they too are processed.
        for (const cityYield of tilesetYields) {
            __classPrivateFieldGet(this, _ruleRegistry).process(Yield_1.Yield, cityYield, this, tilesetYields);
            __classPrivateFieldGet(this, _ruleRegistry).process(Cost_1.Cost, cityYield, this, tilesetYields);
        }
        return tilesetYields;
    }
}
exports.City = City;
_name = new WeakMap(), _originalPlayer = new WeakMap(), _player = new WeakMap(), _ruleRegistry = new WeakMap(), _tile = new WeakMap(), _tiles = new WeakMap(), _tilesWorked = new WeakMap(), _yieldRegistry = new WeakMap();
exports.default = City;
//# sourceMappingURL=City.js.map