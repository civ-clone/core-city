import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';
declare type CostArgs = [City, YieldValue[]];
export declare class Cost extends Rule<CostArgs, YieldValue | YieldValue[]> {}
export default Cost;
export interface ICostRegistry
  extends IRuleRegistry<Cost, CostArgs, YieldValue | YieldValue[]> {}
