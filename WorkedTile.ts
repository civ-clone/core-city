import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Tile from '@civ-clone/core-world/Tile';

// Every `WorkedTile` made with `new`, and every restored one once it has been registered. Loading a saved game puts its
//  worked tiles back with `Object.create`, which never calls the constructor, so registering one of those the first time
//  restores a tile that was already worked rather than working it, and `WorkedTileRegistry` doesn't process `TileWorked`
//  for it. That is only the first registration: after `consumeRestored` it is an ordinary tile, so registering it again
//  later (after it was unregistered) is a real change.
const constructed = new WeakSet<WorkedTile>();

export const consumeRestored = (workedTile: WorkedTile): boolean => {
  if (constructed.has(workedTile)) {
    return false;
  }

  constructed.add(workedTile);

  return true;
};

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
