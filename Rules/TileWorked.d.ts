import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';
/**
 * A city has started working a tile. `WorkedTileRegistry` processes it once the tile is registered, so it covers every
 * way a tile comes to be worked: founding a city, growth, a player's choice, reassignment. Not loading a saved game,
 * which restores what was worked rather than working anything.
 *
 * A notification only: nothing processing it should change which tiles are worked. That is what `TileReassigned` is for.
 */
export declare class TileWorked extends Rule<[City, Tile], void> {}
export default TileWorked;
