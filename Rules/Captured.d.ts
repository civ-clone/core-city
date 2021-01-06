import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
export declare class Captured extends Rule<[City, Player], void> {
}
export default Captured;
export interface ICapturedRegistry extends IRuleRegistry<Captured, [City, Player], void> {
}
