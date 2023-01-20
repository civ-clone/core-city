import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Tile from '@civ-clone/core-world/Tile';

export class WorkedTile extends DataObject {
  #city: City;
  #tile: Tile;
  constructor(tile: Tile, city: City) {
    super();

    this.#city = city;
    this.#tile = tile;

    this.addKey('city', 'tile');
  }

  city(): City {
    return this.#city;
  }

  tile(): Tile {
    return this.#tile;
  }
}

export default WorkedTile;
