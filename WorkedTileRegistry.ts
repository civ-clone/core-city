import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import CanBeWorked from './Rules/CanBeWorked';
import City from './City';
import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import WorkedTile from './WorkedTile';
import workedBy from './AdditionalData/worked-by';

export interface IWorkedTileRegistry extends IEntityRegistry<WorkedTile> {
  getByCity(city: City): WorkedTile[];
  getByTile(tile: Tile): WorkedTile | null;
  getTilesByCity(city: City): Tileset;
  register(...workedTiles: WorkedTile[]): void;
  tileCanBeWorkedBy(tile: Tile, city: City): boolean;
  tileIsWorked(tile: Tile): boolean;
  unregisterByTile(tile: Tile): void;
}

export class WorkedTileRegistry
  extends EntityRegistry<WorkedTile>
  implements IWorkedTileRegistry
{
  #ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super(WorkedTile);

    this.#ruleRegistry = ruleRegistry;
  }

  getByCity(city: City): WorkedTile[] {
    return this.getBy('city', city);
  }

  getByTile(tile: Tile): WorkedTile | null {
    const [workedTile] = this.getBy('tile', tile);

    return workedTile ?? null;
  }

  getTilesByCity(city: City): Tileset {
    return Tileset.from(
      ...this.filter(
        (workedTile: WorkedTile): boolean => workedTile.city() === city
      ).map((workedTile: WorkedTile): Tile => workedTile.tile())
    );
  }

  register(...workedTiles: WorkedTile[]): void {
    workedTiles.forEach((workedTile: WorkedTile) => {
      const tile = workedTile.tile(),
        existingTile = this.getByTile(tile);

      if (existingTile !== null) {
        throw new TypeError(`Tile ${tile.x()}, ${tile.y()} is already worked!`);
      }

      super.register(workedTile);
    });
  }

  tileCanBeWorkedBy(tile: Tile, city: City): boolean {
    return this.#ruleRegistry
      .process(CanBeWorked, tile, city)
      .every((result: boolean): boolean => result);
  }

  tileIsWorked(tile: Tile): boolean {
    return !!this.getByTile(tile);
  }

  unregisterByTile(tile: Tile): void {
    const workedTile = this.getByTile(tile);

    if (workedTile === null) {
      return;
    }

    this.unregister(workedTile);
  }
}

export const instance = new WorkedTileRegistry();

export default WorkedTileRegistry;
