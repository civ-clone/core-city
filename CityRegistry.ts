import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';

export interface ICityRegistry extends IEntityRegistry<City> {
  getByPlayer(player: Player): City[];
  getByTile(tile: Tile): City[];
}

export class CityRegistry
  extends EntityRegistry<City>
  implements ICityRegistry
{
  constructor() {
    super(City);
  }

  getByPlayer(player: Player): City[] {
    return this.filter((city: City): boolean => city.player() === player);
  }

  getByTile(tile: Tile): City[] {
    return this.filter((city: City): boolean => city.tile() === tile);
  }
}

export const instance: CityRegistry = new CityRegistry();

export default CityRegistry;
