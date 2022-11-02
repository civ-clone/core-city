import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';

export class ProcessYield extends Rule<[Yield, City, Yield[]], void> {}

export default ProcessYield;
