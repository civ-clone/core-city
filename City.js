"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const WorkedTileRegistry_1 = require("./WorkedTileRegistry");
const Captured_1 = require("./Rules/Captured");
const CityTileYield_1 = require("./Rules/CityTileYield");
const Tiles_1 = require("./Rules/Tiles");
const Transferred_1 = require("./Rules/Transferred");
const Cost_1 = require("./Rules/Cost");
const Created_1 = require("./Rules/Created");
const Destroyed_1 = require("./Rules/Destroyed");
const Renamed_1 = require("./Rules/Renamed");
const Tileset_1 = require("@civ-clone/core-world/Tileset");
const Yield_1 = require("@civ-clone/core-yield/Yield");
const Yield_2 = require("./Rules/Yield");
const YieldModifier_1 = require("./Rules/YieldModifier");
const keysChanged_1 = require("@civ-clone/core-registry/keysChanged");
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
    /**
     * `cause` says how the city changed hands, for the `Captured` rules that care: what a ruleset passes is up to it (a
     * Diplomat's incite action, say). A conquest passes nothing.
     */
    capture(capturingPlayer, cause = null) {
        // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
        const player = this._player;
        this._player = capturingPlayer;
        // Before the rules, which may look the city up by its new owner.
        (0, keysChanged_1.default)(this);
        this._ruleRegistry.process(Captured_1.default, this, capturingPlayer, player, cause);
    }
    /**
     * Gives the city to `player` without capturing it: it keeps everything it has, and only the `Transferred` rules run,
     *  never the `Captured` ones. For a city that changes hands peacefully, such as one that joins rebels in a civil war.
     */
    transfer(player) {
        const previousPlayer = this._player;
        this._player = player;
        // Before the rules, which may look the city up by its new owner.
        (0, keysChanged_1.default)(this);
        this._ruleRegistry.process(Transferred_1.default, this, player, previousPlayer);
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
    /** Gives the city `name`, and processes the `Renamed` rules with the name it had. The same name again does nothing. */
    setName(name) {
        const previous = this._name;
        if (name === previous) {
            return;
        }
        this._name = name;
        this._ruleRegistry.process(Renamed_1.default, this, previous);
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
    /**
     * The rules the city was made with: the game's own. For a ruleset's seams that ask about this city (which kinds of
     *  specialist it may have, say), so a caller that doesn't pass a registry still gets the game's rules.
     */
    ruleRegistry() {
        return this._ruleRegistry;
    }
    /**
     * The `CityTileYield` rules that change what a square gives this city: none unless a ruleset registers some. Get them
     *  once and pass them to `tileYields` for each square, when asking about many squares at once.
     */
    tileYieldRules() {
        return this._ruleRegistry.get(CityTileYield_1.default);
    }
    /**
     * What `tile` gives this city: the tile's yields for the city's player, changed by the `CityTileYield` rules, in
     *  order. Everything that asks what a square gives a city asks this, so that the city's yields, how it places its
     *  workers and what a client shows all agree.
     *
     * With no rules, it is `tile.yields(player)` itself: the tile's cached array, which must not be changed. With rules,
     *  each yield is copied first, provider by provider, and the rules change the copies.
     */
    tileYields(tile, rules = this.tileYieldRules()) {
        const tileYields = tile.yields(this._player);
        if (rules.length === 0) {
            return tileYields;
        }
        const yields = tileYields.map((tileYield) => {
            const [first, ...rest] = tileYield.values(), copy = new tileYield.constructor(...(first !== null && first !== void 0 ? first : []));
            rest.forEach(([value, provider]) => copy.add(value, provider));
            return copy;
        });
        rules.forEach((rule) => {
            if (rule.validate(this, tile, yields)) {
                rule.process(this, tile, yields);
            }
        });
        return yields;
    }
    yields() {
        const yields = [], push = (cityYields) => {
            if (!cityYields) {
                return;
            }
            if (cityYields instanceof Yield_1.default) {
                yields.push(cityYields);
                return;
            }
            cityYields.forEach((cityYield) => yields.push(cityYield));
        };
        this._ruleRegistry.get(Yield_2.default).forEach((rule) => {
            if (rule.validate(this, yields)) {
                push(rule.process(this, yields));
            }
        });
        // What the `YieldRule`s produced, before any modifier. A modifier that adds a share of the base (a Library's +50%)
        //  reads this, so it doesn't compound on another modifier's output whatever order the rules run in.
        const base = [...yields];
        this._ruleRegistry
            .get(YieldModifier_1.default)
            .forEach((rule) => {
            if (rule.validate(this, yields, base)) {
                push(rule.process(this, yields, base));
            }
        });
        this._ruleRegistry.get(Cost_1.default).forEach((rule) => {
            if (rule.validate(this, yields)) {
                push(rule.process(this, yields));
            }
        });
        return yields;
    }
    /**
     * Put the `Tileset` back around the restored tiles.
     *
     * `_tiles` is a registry held as a field, and `core-save-game` writes one as
     * an array of its members — the class around a collection is the one thing
     * the format cannot record. So a loaded city arrives with a plain `Tile[]`
     * here and `tiles()` hands back something whose `entries()` is an array
     * iterator.
     *
     * Only the container, deliberately. Recomputing the fat cross from the
     * `Tiles` rule would be smaller in the file and would read the *world* —
     * which may not have rebuilt its own tiles yet, since hooks run in no
     * particular order. A hook that puts its own class back around its own
     * restored state cannot depend on another one.
     */
    onHydrated() {
        const tiles = this._tiles;
        if (Array.isArray(tiles)) {
            this._tiles = Tileset_1.default.from(...tiles);
        }
    }
}
exports.City = City;
City.transient = ['_ruleRegistry', '_workedTileRegistry'];
exports.default = City;
//# sourceMappingURL=City.js.map