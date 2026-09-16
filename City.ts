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
import Tiles from './Rules/Tiles';
import Cost from './Rules/Cost';
import Created from './Rules/Created';
import Destroyed from './Rules/Destroyed';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import WorkedTile from './WorkedTile';
import Yield from '@civ-clone/core-yield/Yield';
import YieldRule from './Rules/Yield';
import YieldModifier from './Rules/YieldModifier';

export interface ICity extends IDataObject {
  capture(player: Player): void;
  destroy(player: Player | null): void;
  destroyed(): boolean;
  name(): string;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tiles(): Tileset;
  tilesWorked(): Tileset;
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

  capture(capturingPlayer: Player): void {
    // Should this method even exist? Thinking about just having a `setPlayer` method and having this `Rule`-controlled..
    const player = this._player;

    this._player = capturingPlayer;

    this._ruleRegistry.process(Captured, this, capturingPlayer, player);
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

  setName(name: string): void {
    this._name = name;
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

  yields(): Yield[] {
    const yields: Yield[] = [];

    [
      this._ruleRegistry.get(YieldRule),
      this._ruleRegistry.get(YieldModifier),
      this._ruleRegistry.get(Cost),
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

        if (cityYields instanceof Yield) {
          yields.push(cityYields);

          return;
        }

        cityYields.forEach((cityYield: Yield) => yields.push(cityYield));
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
