import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';

type YieldArgs = [City, YieldValue[]];

export class Yield extends Rule<YieldArgs, YieldValue | YieldValue[]> {}

export default Yield;
