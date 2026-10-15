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
import TileReleased from './Rules/TileReleased';
import TileWorked from './Rules/TileWorked';
import Tileset from '@civ-clone/core-world/Tileset';
import WorkedTile, { consumeRestored } from './WorkedTile';
import workedBy from './AdditionalData/worked-by';

export interface IWorkedTileRegistry extends IEntityRegistry<WorkedTile> {
  getByCity(city: City): WorkedTile[];
  getByTile(tile: Tile): WorkedTile | null;
  getTilesByCity(city: City): Tileset;
  register(...workedTiles: WorkedTile[]): void;
  tileCanBeWorkedBy(tile: Tile, city: City): boolean;
  tileIsWorked(tile: Tile): boolean;
  unregister(...workedTiles: WorkedTile[]): void;
  unregisterByTile(tile: Tile): void;
}

export class WorkedTileRegistry
  extends EntityRegistry<WorkedTile>
  implements IWorkedTileRegistry
{
  // A worked tile's city and tile are set when it's made and never change, so these need no `keysChanged`. Scanning
  //  every worked tile for each lookup was ~2% of a late-game turn (civ-clone/web-renderer#308).
  private _byCity = this.index(
    (workedTile: WorkedTile): City => workedTile.city()
  );
  private _byTile = this.index(
    (workedTile: WorkedTile): Tile => workedTile.tile()
  );
  private _ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super(WorkedTile);

    this._ruleRegistry = ruleRegistry;
  }

  getByCity(city: City): WorkedTile[] {
    return this._byCity.get(city);
  }

  getByTile(tile: Tile): WorkedTile | null {
    const [workedTile] = this._byTile.get(tile);

    return workedTile ?? null;
  }

  getTilesByCity(city: City): Tileset {
    return Tileset.from(
      ...this._byCity
        .get(city)
        .map((workedTile: WorkedTile): Tile => workedTile.tile())
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

      // Once per tile, after it is registered, so a rule sees the tile as worked. A tile restored from a save was already
      //  worked, so only that first registration, which loading a game performs, processes nothing.
      if (!consumeRestored(workedTile)) {
        this._ruleRegistry.process(TileWorked, workedTile.city(), tile);
      }
    });
  }

  tileCanBeWorkedBy(tile: Tile, city: City): boolean {
    return this._ruleRegistry
      .process(CanBeWorked, tile, city)
      .every((result: boolean): boolean => result);
  }

  tileIsWorked(tile: Tile): boolean {
    return !!this.getByTile(tile);
  }

  // Every way a tile stops being worked comes through here, `unregisterByTile` included.
  unregister(...workedTiles: WorkedTile[]): void {
    workedTiles.forEach((workedTile: WorkedTile): void => {
      if (!this.includes(workedTile)) {
        return;
      }

      super.unregister(workedTile);

      this._ruleRegistry.process(
        TileReleased,
        workedTile.city(),
        workedTile.tile()
      );
    });
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
