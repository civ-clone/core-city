import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';
export declare class ProcessYield extends Rule<[Yield, City], void> {}
export default ProcessYield;
export interface IProcessYieldRegistry
  extends IRuleRegistry<ProcessYield, [Yield, City], void> {}
