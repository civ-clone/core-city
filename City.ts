import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Captured from './Rules/Captured';
import Cost from './Rules/Cost';
import Created from './Rules/Created';
import Destroyed from './Rules/Destroyed';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import Yield from '@civ-clone/core-yield/Yield';
import YieldRule from './Rules/Yield';
import YieldModifier from './Rules/YieldModifier';

export interface ICity extends IDataObject {
  capture(player: Player): void;
  destroy(player: Player | null): void;
  name(): string;
  originalPlayer(): Player;
  player(): Player;
  tile(): Tile;
  tiles(): Tileset;
  tilesWorked(): Tileset;
  yields(): Yield[];
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
    // TODO: have this controlled via `Rule`s to match original (removing indices 0, 4, 20, 24)
    this.#tiles = this.#tile.getSurroundingArea();
    // TODO: need a `WorkedTilesRegistry` so that two cities (from any players) cannot work the same `Tile`.
    this.#tilesWorked.push(tile);
    this.#ruleRegistry = ruleRegistry;

    this.#ruleRegistry.process(Created, this);

    this.addKey(
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
    const player = this.#player;

    this.#player = capturingPlayer;

    this.#ruleRegistry.process(Captured, this, capturingPlayer, player);
  }

  destroy(player: Player | null = null): void {
    this.#ruleRegistry.process(Destroyed, this, player);
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

  tiles(): Tileset {
    return this.#tiles;
  }

  tilesWorked(): Tileset {
    return this.#tilesWorked;
  }

  yields(): Yield[] {
    const yields: Yield[] = [];

    [
      this.#ruleRegistry.get(YieldRule),
      this.#ruleRegistry.get(YieldModifier),
      this.#ruleRegistry.get(Cost),
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
}

export default City;
