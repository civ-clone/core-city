"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkedTile = exports.consumeRestored = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
// Every `WorkedTile` made with `new`, and every restored one once it has been registered. Loading a saved game puts its
//  worked tiles back with `Object.create`, which never calls the constructor, so registering one of those the first time
//  restores a tile that was already worked rather than working it, and `WorkedTileRegistry` doesn't process `TileWorked`
//  for it. That is only the first registration: after `consumeRestored` it is an ordinary tile, so registering it again
//  later (after it was unregistered) is a real change.
const constructed = new WeakSet();
const consumeRestored = (workedTile) => {
    if (constructed.has(workedTile)) {
        return false;
    }
    constructed.add(workedTile);
    return true;
};
exports.consumeRestored = consumeRestored;
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