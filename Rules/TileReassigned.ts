import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';

export class TileReassigned extends Rule<[City, Tile], void> {}

export default TileReassigned;
