"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkedTile = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class WorkedTile extends DataObject_1.default {
    constructor(tile, city) {
        super();
        this._city = city;
        this._tile = tile;
        this.addKey('city', 'tile');
    }
    city() {
        return this._city;
    }
    tile() {
        return this._tile;
    }
}
exports.WorkedTile = WorkedTile;
exports.default = WorkedTile;
//# sourceMappingURL=WorkedTile.js.map