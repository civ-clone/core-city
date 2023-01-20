"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const WorkedTileRegistry_1 = require("../WorkedTileRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Tile_1 = require("@civ-clone/core-world/Tile");
const getAdditionalData = (workedTileRegistry = WorkedTileRegistry_1.instance) => [
    new AdditionalData_1.default(Tile_1.default, 'workedBy', (tile) => { var _a, _b; return (_b = (_a = workedTileRegistry.getByTile(tile)) === null || _a === void 0 ? void 0 : _a.city()) !== null && _b !== void 0 ? _b : null; }),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=worked-by.js.map