import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Tile from '@civ-clone/core-world/Tile';

// Every `WorkedTile` made with `new`. Loading a saved game puts its worked tiles back with `Object.create`, which never
//  calls the constructor, so registering one of those restores a tile that was already worked rather than working it,
//  and `WorkedTileRegistry` doesn't process `TileWorked` for it.
const constructed = new WeakSet<WorkedTile>();

export const isRestored = (workedTile: WorkedTile): boolean =>
  !constructed.has(workedTile);

export class WorkedTile extends DataObject {
  private _city: City;
  private _tile: Tile;
  constructor(tile: Tile, city: City) {
    super();

    this._city = city;
    this._tile = tile;

    this.addKey('city', 'tile');

    constructed.add(this);
  }

  city(): City {
    return this._city;
  }

  tile(): Tile {
    return this._tile;
  }
}

export default WorkedTile;
