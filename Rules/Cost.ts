import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';

export class Cost extends Rule<
  [City, YieldValue[]],
  YieldValue | YieldValue[]
> {}

export default Cost;
