import City from './City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Tile from '@civ-clone/core-world/Tile';
export declare class WorkedTile extends DataObject {
  #private;
  constructor(tile: Tile, city: City);
  city(): City;
  tile(): Tile;
}
export default WorkedTile;
