import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '../../City';
import Player from '@civ-clone/core-player/Player';
import { generateTile } from '@civ-clone/core-world/tests/lib/buildWorld';

export const setUpCity: (
  name?: string,
  ruleRegistry?: RuleRegistry
) => Promise<City> = async (
  name: string = 'city',
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Promise<City> =>
  new City(
    new Player(ruleRegistry),
    await generateTile(ruleRegistry),
    name,
    ruleRegistry
  );

export default setUpCity;
