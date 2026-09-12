import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { WorkedTileRegistry } from '../../WorkedTileRegistry';
import City from '../../City';
export declare const setUpCity: (
  name?: string,
  ruleRegistry?: RuleRegistry,
  workedTileRegistry?: WorkedTileRegistry
) => Promise<City>;
export default setUpCity;
