"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WorkedTile_city, _WorkedTile_tile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkedTile = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class WorkedTile extends DataObject_1.default {
    constructor(tile, city) {
        super();
        _WorkedTile_city.set(this, void 0);
        _WorkedTile_tile.set(this, void 0);
        __classPrivateFieldSet(this, _WorkedTile_city, city, "f");
        __classPrivateFieldSet(this, _WorkedTile_tile, tile, "f");
        this.addKey('city', 'tile');
    }
    city() {
        return __classPrivateFieldGet(this, _WorkedTile_city, "f");
    }
    tile() {
        return __classPrivateFieldGet(this, _WorkedTile_tile, "f");
    }
}
exports.WorkedTile = WorkedTile;
_WorkedTile_city = new WeakMap(), _WorkedTile_tile = new WeakMap();
exports.default = WorkedTile;
//# sourceMappingURL=WorkedTile.js.map