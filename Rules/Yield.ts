import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';

export class Yield extends Rule<[YieldValue, City, YieldValue[]], void> {}

export default Yield;

export interface IYieldRegistry
  extends IRuleRegistry<Yield, [YieldValue, City, YieldValue[]], void> {}
