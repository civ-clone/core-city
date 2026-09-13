"use strict";
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
        super();
        this._destroyed = false;
        this._name = name;
        this._originalPlayer = player;
        this._player = player;
        this._tile = tile;
        this._ruleRegistry = ruleRegistry;
        this._workedTileRegistry = workedTileRegistry;
        [this._tiles] = this._ruleRegistry.process(Tiles_1.default, this);
        this._ruleRegistry.process(Created_1.default, this);
        this.addKey('destroyed', 'name', 'originalPlayer', 'player', 'tile', 'tiles', 'tilesWorked', 'yields');
    }
    capture(capturingPlayer) {
        // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
        const player = this._player;
        this._player = capturingPlayer;
        this._ruleRegistry.process(Captured_1.default, this, capturingPlayer, player);
    }
    destroy(player = null) {
        this._destroyed = true;
        this._ruleRegistry.process(Destroyed_1.default, this, player);
    }
    destroyed() {
        return this._destroyed;
    }
    name() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    originalPlayer() {
        return this._originalPlayer;
    }
    player() {
        return this._player;
    }
    tile() {
        return this._tile;
    }
    tiles() {
        return this._tiles;
    }
    tilesWorked() {
        return this._workedTileRegistry.getTilesByCity(this);
    }
    yields() {
        const yields = [];
        [
            this._ruleRegistry.get(Yield_2.default),
            this._ruleRegistry.get(YieldModifier_1.default),
            this._ruleRegistry.get(Cost_1.default),
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
City.transient = ['_ruleRegistry', '_workedTileRegistry'];
exports.default = City;
//# sourceMappingURL=City.js.map