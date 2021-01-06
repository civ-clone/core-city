import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';

export class Cost extends Rule<[Yield, City, Yield[]], void> {}

export default Cost;

export interface ICostRegistry
  extends IRuleRegistry<Cost, [Yield, City, Yield[]], void> {}
