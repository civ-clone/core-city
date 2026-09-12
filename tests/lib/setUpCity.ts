import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  WorkedTileRegistry,
  instance as workedTileRegistryInstance,
} from '../../WorkedTileRegistry';
import City from '../../City';
import Player from '@civ-clone/core-player/Player';
import { generateTile } from '@civ-clone/core-world/tests/lib/buildWorld';

export const setUpCity: (
  name?: string,
  ruleRegistry?: RuleRegistry,
  workedTileRegistry?: WorkedTileRegistry
) => Promise<City> = async (
  name: string = 'city',
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  workedTileRegistry: WorkedTileRegistry = workedTileRegistryInstance
): Promise<City> =>
  new City(
    new Player(ruleRegistry),
    await generateTile(ruleRegistry),
    name,
    ruleRegistry,
    workedTileRegistry
  );

export default setUpCity;
