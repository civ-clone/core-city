import { Captured, ICapturedRegistry } from './Rules/Captured';
import { Cost, ICostRegistry } from './Rules/Cost';
import { Created, ICreatedRegistry } from './Rules/Created';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { Destroyed, IDestroyedRegistry } from './Rules/Destroyed';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Yield as YieldRule, IYieldRegistry } from './Rules/Yield';
import {
  YieldRegistry,
  instance as yieldRegistryInstance,
} from '@civ-clone/core-yield/YieldRegistry';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import Yield from '@civ-clone/core-yield/Yield';

export interface ICity extends IDataObject {
  capture(player: Player): void;
  destroy(player: Player | null): void;
  name(): string;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tilesWorked(): Tileset;
  yields(yields: typeof Yield[], yieldRegistry: YieldRegistry): Yield[];
}

export class City extends DataObject implements ICity {
  #name: string;
  #originalPlayer: Player;
  #player: Player;
  #ruleRegistry: RuleRegistry;
  #tile: Tile;
  #tiles: Tileset;
  #tilesWorked: Tileset = new Tileset();

  constructor(
    player: Player,
    tile: Tile,
    name: string,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.#name = name;
    this.#originalPlayer = player;
    this.#player = player;
    this.#tile = tile;
    this.#tiles = this.#tile.getSurroundingArea();
    this.#tilesWorked.push(tile);
    this.#ruleRegistry = ruleRegistry;

    (this.#ruleRegistry as ICreatedRegistry).process(Created, this);

    this.addKey(
      'name',
      // 'player',
      'tile',
      'tilesWorked',
      'yields'
    );
  }

  capture(player: Player): void {
    this.#player = player;

    (this.#ruleRegistry as ICapturedRegistry).process(Captured, this, player);
  }

  destroy(player: Player | null = null): void {
    (this.#ruleRegistry as IDestroyedRegistry).process(Destroyed, this, player);
  }

  name(): string {
    return this.#name;
  }

  setName(name: string): void {
    this.#name = name;
  }

  originalPlayer(): Player {
    return this.#originalPlayer;
  }

  player(): Player {
    return this.#player;
  }

  tile(): Tile {
    return this.#tile;
  }

  tilesWorked(): Tileset {
    return this.#tilesWorked;
  }

  yields(
    yields: typeof Yield[] = [],
    yieldRegistry: YieldRegistry = yieldRegistryInstance
  ): Yield[] {
    if (yields.length === 0) {
      yields = yieldRegistry.entries();
    }

    const tilesetYields = this.#tilesWorked.yields(this.#player, yields);

    // Do for...of so that as yields are added, they too are processed.
    for (const cityYield of tilesetYields) {
      (this.#ruleRegistry as IYieldRegistry).process(
        YieldRule,
        cityYield,
        this,
        tilesetYields
      );
      (this.#ruleRegistry as ICostRegistry).process(
        Cost,
        cityYield,
        this,
        tilesetYields
      );
    }

    return tilesetYields;
  }
}

export default City;
