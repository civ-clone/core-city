"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkedTile = exports.isRestored = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
// Every `WorkedTile` made with `new`. Loading a saved game puts its worked tiles back with `Object.create`, which never
//  calls the constructor, so registering one of those restores a tile that was already worked rather than working it,
//  and `WorkedTileRegistry` doesn't process `TileWorked` for it.
const constructed = new WeakSet();
const isRestored = (workedTile) => !constructed.has(workedTile);
exports.isRestored = isRestored;
class WorkedTile extends DataObject_1.default {
    constructor(tile, city) {
        super();
        this._city = city;
        this._tile = tile;
        this.addKey('city', 'tile');
        constructed.add(this);
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