import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Tile from '@civ-clone/core-world/Tile';

export class WorkedTile extends DataObject {
  private _city: City;
  private _tile: Tile;
  constructor(tile: Tile, city: City) {
    super();

    this._city = city;
    this._tile = tile;

    this.addKey('city', 'tile');
  }

  city(): City {
    return this._city;
  }

  tile(): Tile {
    return this._tile;
  }
}

export default WorkedTile;
