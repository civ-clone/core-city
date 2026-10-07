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
  // A city's tile is fixed for its lifetime (capture changes its player, not
  // where it is), so the key cannot go stale under a live registration and
  // needs no `reindex`. The AI asks "is there a city here?" of every tile it
  // knows, every turn, and of the 81 tiles around every candidate site.
  private _byTile = this.index((city: City): Tile => city.tile());
  // A city's owner does change, on capture, and `City#capture` says so (`keysChanged`) (civ-clone/web-renderer#308).
  private _byPlayer = this.index((city: City): Player => city.player());

  constructor() {
    super(City);
  }

  getByPlayer(player: Player, includeDestroyed: boolean = false): City[] {
    const cities = this._byPlayer.get(player);

    if (includeDestroyed) {
      return cities;
    }

    return cities.filter((city: City): boolean => !city.destroyed());
  }

  getByTile(tile: Tile): City | null {
    const [city] = this._byTile
      .get(tile)
      .filter((city: City): boolean => !city.destroyed());

    return city ?? null;
  }
}

export const instance: CityRegistry = new CityRegistry();

export default CityRegistry;
