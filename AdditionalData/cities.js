"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const CityRegistry_1 = require("../CityRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Player_1 = require("@civ-clone/core-player/Player");
const Tile_1 = require("@civ-clone/core-world/Tile");
const getAdditionalData = (cityRegistry = CityRegistry_1.instance) => [
    new AdditionalData_1.default(Player_1.default, 'cities', (player) => cityRegistry.getByPlayer(player)),
    new AdditionalData_1.default(Tile_1.default, 'city', (tile) => cityRegistry.getByTile(tile)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=cities.js.map