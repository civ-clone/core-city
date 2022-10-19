import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';
declare type ProcessYieldArgs = [Yield, City, Yield[]];
export declare class ProcessYield extends Rule<ProcessYieldArgs, void> {}
export default ProcessYield;
