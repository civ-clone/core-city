import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import City from './City';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';

export interface ICityRegistry extends IEntityRegistry<City> {
  getByPlayer(player: Player, includeDestroyed?: boolean): City[];
  getByTile(tile: Tile): City | null;
}

export class CityRegistry
  extends EntityRegistry<City>
  implements ICityRegistry
{
  constructor() {
    super(City);
  }

  getByPlayer(player: Player, includeDestroyed: boolean = false): City[] {
    if (includeDestroyed) {
      return this.getBy('player', player);
    }

    return this.filter(
      (city: City): boolean => city.player() === player && !city.destroyed()
    );
  }

  getByTile(tile: Tile): City | null {
    const [city] = this.filter(
      (city: City): boolean => city.tile() === tile && !city.destroyed()
    );

    return city ?? null;
  }
}

export const instance: CityRegistry = new CityRegistry();

export default CityRegistry;
