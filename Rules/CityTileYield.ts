import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';
import YieldValue from '@civ-clone/core-yield/Yield';

/**
 * Changes what one square gives a city, in that city's context: a bonus for a building the city has (a harbour's extra
 * food on ocean squares), or a penalty the city's government sets on each square. Arguments: the `City`, the `Tile`
 * and the square's yields, which the rule changes in place (`add`, `subtract`, `set`). They are the city's own copies:
 * the tile's cached yields are never changed.
 *
 * The rules run one after another, in priority order and then in the order they were registered, as `process` runs
 * any rule, so each sees what the ones before it did. `City#tileYields` runs them; with none registered it gives the
 * tile's own yields, unchanged and uncopied.
 */
export class CityTileYield extends Rule<[City, Tile, YieldValue[]], void> {}

export default CityTileYield;
