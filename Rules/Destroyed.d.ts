import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
export declare class Destroyed extends Rule<[City, Player | null], void> {}
export default Destroyed;
export interface IDestroyedRegistry
  extends IRuleRegistry<Destroyed, [City, Player | null], void> {}
