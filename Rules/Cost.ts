import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';

type CostArgs = [City, YieldValue[]];

export class Cost extends Rule<CostArgs, YieldValue | YieldValue[]> {}

export default Cost;
