import City from '../City';
import Rule from '@civ-clone/core-rule/Rule';
import Tile from '@civ-clone/core-world/Tile';
/**
 * A city has stopped working a tile. `WorkedTileRegistry` processes it once the tile is unregistered, however that
 * happened: the city shrinking, a player's choice, reassignment, an enemy unit moving onto it, the city being destroyed.
 *
 * A notification only: nothing processing it should change which tiles are worked. `TileReassigned` is the rule that
 * asks a city to find its worker another tile.
 */
export declare class TileReleased extends Rule<[City, Tile], void> {}
export default TileReleased;
