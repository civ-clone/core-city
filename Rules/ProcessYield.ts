import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';

type ProcessYieldArgs = [Yield, City, Yield[]];

export class ProcessYield extends Rule<ProcessYieldArgs, void> {}

export default ProcessYield;
