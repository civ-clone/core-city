import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  WorkedTileRegistry,
  instance as workedTileRegistryInstance,
} from './WorkedTileRegistry';
import Captured from './Rules/Captured';
import CityTileYield from './Rules/CityTileYield';
import Tiles from './Rules/Tiles';
import Transferred from './Rules/Transferred';
import Cost from './Rules/Cost';
import Created from './Rules/Created';
import Destroyed from './Rules/Destroyed';
import Renamed from './Rules/Renamed';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import WorkedTile from './WorkedTile';
import Yield from '@civ-clone/core-yield/Yield';
import YieldRule from './Rules/Yield';
import YieldModifier from './Rules/YieldModifier';
import keysChanged from '@civ-clone/core-registry/keysChanged';

export interface ICity extends IDataObject {
  capture(player: Player, cause?: unknown): void;
  destroy(player: Player | null): void;
  destroyed(): boolean;
  name(): string;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tiles(): Tileset;
  tilesWorked(): Tileset;
  transfer(player: Player): void;
  yields(): Yield[];
}

export class City extends DataObject implements ICity {
  static readonly transient = ['_ruleRegistry', '_workedTileRegistry'];
  private _destroyed: boolean = false;
  private _name: string;
  private _originalPlayer: Player;
  private _player: Player;
  private _ruleRegistry: RuleRegistry;
  private _tile: Tile;
  private _tiles: Tileset;
  private _workedTileRegistry: WorkedTileRegistry;

  constructor(
    player: Player,
    tile: Tile,
    name: string,
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    workedTileRegistry: WorkedTileRegistry = workedTileRegistryInstance
  ) {
    super();

    this._name = name;
    this._originalPlayer = player;
    this._player = player;
    this._tile = tile;
    this._ruleRegistry = ruleRegistry;
    this._workedTileRegistry = workedTileRegistry;

    [this._tiles] = this._ruleRegistry.process(Tiles, this);

    this._ruleRegistry.process(Created, this);

    this.addKey(
      'destroyed',
      'name',
      'originalPlayer',
      'player',
      'tile',
      'tiles',
      'tilesWorked',
      'yields'
    );
  }

  /**
   * `cause` says how the city changed hands, for the `Captured` rules that care: what a ruleset passes is up to it (a
   * Diplomat's incite action, say). A conquest passes nothing.
   */
  capture(capturingPlayer: Player, cause: unknown = null): void {
    // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
    const player = this._player;

    this._player = capturingPlayer;

    // Before the rules, which may look the city up by its new owner.
    keysChanged(this);

    this._ruleRegistry.process(Captured, this, capturingPlayer, player, cause);
  }

  /**
   * Gives the city to `player` without capturing it: it keeps everything it has, and only the `Transferred` rules run,
   *  never the `Captured` ones. For a city that changes hands peacefully, such as one that joins rebels in a civil war.
   */
  transfer(player: Player): void {
    const previousPlayer = this._player;

    this._player = player;

    // Before the rules, which may look the city up by its new owner.
    keysChanged(this);

    this._ruleRegistry.process(Transferred, this, player, previousPlayer);
  }

  destroy(player: Player | null = null): void {
    this._destroyed = true;

    this._ruleRegistry.process(Destroyed, this, player);
  }

  destroyed(): boolean {
    return this._destroyed;
  }

  name(): string {
    return this._name;
  }

  /** Gives the city `name`, and processes the `Renamed` rules with the name it had. The same name again does nothing. */
  setName(name: string): void {
    const previous = this._name;

    if (name === previous) {
      return;
    }

    this._name = name;

    this._ruleRegistry.process(Renamed, this, previous);
  }

  originalPlayer(): Player {
    return this._originalPlayer;
  }

  player(): Player {
    return this._player;
  }

  tile(): Tile {
    return this._tile;
  }

  tiles(): Tileset {
    return this._tiles;
  }

  tilesWorked(): Tileset {
    return this._workedTileRegistry.getTilesByCity(this);
  }

  /**
   * The rules the city was made with: the game's own. For a ruleset's seams that ask about this city (which kinds of
   *  specialist it may have, say), so a caller that doesn't pass a registry still gets the game's rules.
   */
  ruleRegistry(): RuleRegistry {
    return this._ruleRegistry;
  }

  /**
   * The `CityTileYield` rules that change what a square gives this city: none unless a ruleset registers some. Get them
   *  once and pass them to `tileYields` for each square, when asking about many squares at once.
   */
  tileYieldRules(): CityTileYield[] {
    return this._ruleRegistry.get(CityTileYield);
  }

  /**
   * What `tile` gives this city: the tile's yields for the city's player, changed by the `CityTileYield` rules, in
   *  order. Everything that asks what a square gives a city asks this, so that the city's yields, how it places its
   *  workers and what a client shows all agree.
   *
   * With no rules, it is `tile.yields(player)` itself: the tile's cached array, which must not be changed. With rules,
   *  each yield is copied first, provider by provider, and the rules change the copies.
   */
  tileYields(
    tile: Tile,
    rules: CityTileYield[] = this.tileYieldRules()
  ): Yield[] {
    const tileYields = tile.yields(this._player);

    if (rules.length === 0) {
      return tileYields;
    }

    const yields = tileYields.map((tileYield: Yield): Yield => {
      const [first, ...rest] = tileYield.values(),
        copy = new (tileYield.constructor as typeof Yield)(...(first ?? []));

      rest.forEach(([value, provider]) => copy.add(value, provider));

      return copy;
    });

    rules.forEach((rule: CityTileYield): void => {
      if (rule.validate(this, tile, yields)) {
        rule.process(this, tile, yields);
      }
    });

    return yields;
  }

  yields(): Yield[] {
    const yields: Yield[] = [],
      push = (cityYields: Yield | Yield[] | void): void => {
        if (!cityYields) {
          return;
        }

        if (cityYields instanceof Yield) {
          yields.push(cityYields);

          return;
        }

        cityYields.forEach((cityYield: Yield) => yields.push(cityYield));
      };

    this._ruleRegistry.get(YieldRule).forEach((rule: YieldRule): void => {
      if (rule.validate(this, yields)) {
        push(rule.process(this, yields));
      }
    });

    // What the `YieldRule`s produced, before any modifier. A modifier that adds a share of the base (a Library's +50%)
    //  reads this, so it doesn't compound on another modifier's output whatever order the rules run in.
    const base: Yield[] = [...yields];

    this._ruleRegistry
      .get(YieldModifier)
      .forEach((rule: YieldModifier): void => {
        if (rule.validate(this, yields, base)) {
          push(rule.process(this, yields, base));
        }
      });

    this._ruleRegistry.get(Cost).forEach((rule: Cost): void => {
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
  onHydrated(): void {
    const tiles = this._tiles as unknown;

    if (Array.isArray(tiles)) {
      this._tiles = Tileset.from(...(tiles as Tile[]));
    }
  }
}

export default City;
