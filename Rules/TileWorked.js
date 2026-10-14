"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileWorked = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * A city has started working a tile. `WorkedTileRegistry` processes it once the tile is registered, so it covers every
 * way a tile comes to be worked: founding a city, growth, a player's choice, reassignment. Not loading a saved game,
 * which restores what was worked rather than working anything.
 *
 * A notification only: nothing processing it should change which tiles are worked. That is what `TileReassigned` is for.
 */
class TileWorked extends Rule_1.default {
}
exports.TileWorked = TileWorked;
exports.default = TileWorked;
//# sourceMappingURL=TileWorked.js.map