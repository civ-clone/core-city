import City from '../City';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
export declare class Destroyed extends Rule<[City, Player | null], void> {}
export default Destroyed;
