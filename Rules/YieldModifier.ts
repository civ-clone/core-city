import City from '../City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';

type YieldArgs = [City, YieldValue[]];

export class YieldModifier extends Rule<YieldArgs, YieldValue | YieldValue[]> {}

export default YieldModifier;

export interface IYieldModifierRegistry
  extends IRuleRegistry<YieldModifier, YieldArgs, YieldValue | YieldValue[]> {}