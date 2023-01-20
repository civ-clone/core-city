import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';

export class CanBeWorked extends Rule<[Tile, City], boolean> {}

export default CanBeWorked;
