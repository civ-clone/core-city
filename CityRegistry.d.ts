import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
export interface ICityRegistry extends IEntityRegistry<City> {
  getByPlayer(player: Player): City[];
  getByTile(tile: Tile): City | null;
}
export declare class CityRegistry
  extends EntityRegistry<City>
  implements ICityRegistry
{
  constructor();
  getByPlayer(player: Player): City[];
  getByTile(tile: Tile): City | null;
}
export declare const instance: CityRegistry;
export default CityRegistry;
