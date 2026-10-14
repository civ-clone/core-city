"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileReleased = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * A city has stopped working a tile. `WorkedTileRegistry` processes it once the tile is unregistered, however that
 * happened: the city shrinking, a player's choice, reassignment, an enemy unit moving onto it, the city being destroyed.
 *
 * A notification only: nothing processing it should change which tiles are worked. `TileReassigned` is the rule that
 * asks a city to find its worker another tile.
 */
class TileReleased extends Rule_1.default {
}
exports.TileReleased = TileReleased;
exports.default = TileReleased;
//# sourceMappingURL=TileReleased.js.map