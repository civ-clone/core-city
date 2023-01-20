import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from './City';
import EntityRegistry, {
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Tile from '@civ-clone/core-world/Tile';
import Tileset from '@civ-clone/core-world/Tileset';
import WorkedTile from './WorkedTile';
export interface IWorkedTileRegistry extends IEntityRegistry<WorkedTile> {
  getByCity(city: City): WorkedTile[];
  getByTile(tile: Tile): WorkedTile | null;
  getTilesByCity(city: City): Tileset;
  register(...workedTiles: WorkedTile[]): void;
  tileCanBeWorkedBy(tile: Tile, city: City): boolean;
  tileIsWorked(tile: Tile): boolean;
  unregisterByTile(tile: Tile): void;
}
export declare class WorkedTileRegistry
  extends EntityRegistry<WorkedTile>
  implements IWorkedTileRegistry
{
  #private;
  constructor(ruleRegistry?: RuleRegistry);
  getByCity(city: City): WorkedTile[];
  getByTile(tile: Tile): WorkedTile | null;
  getTilesByCity(city: City): Tileset;
  register(...workedTiles: WorkedTile[]): void;
  tileCanBeWorkedBy(tile: Tile, city: City): boolean;
  tileIsWorked(tile: Tile): boolean;
  unregisterByTile(tile: Tile): void;
}
export declare const instance: WorkedTileRegistry;
export default WorkedTileRegistry;
