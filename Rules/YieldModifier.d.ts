import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import YieldValue from '@civ-clone/core-yield/Yield';
/**
 * Arguments: the `City`, the yields so far (including earlier modifiers' output), and the base yields (what the
 * `YieldRule`s produced, before any modifier).
 */
export declare class YieldModifier extends Rule<
  [City, YieldValue[], YieldValue[]],
  YieldValue | YieldValue[]
> {}
export default YieldModifier;
