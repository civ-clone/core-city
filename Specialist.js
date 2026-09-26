"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specialist = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
/**
 * A citizen of `city` who works no tile. What a `Specialist` produces is up to the ruleset: its class is its type, so
 * changing one means replacing it with an instance of another class from `AvailableSpecialistRegistry`.
 */
class Specialist extends DataObject_1.default {
    constructor(city) {
        super();
        this._city = city;
        this.addKey('city');
    }
    city() {
        return this._city;
    }
}
exports.Specialist = Specialist;
exports.default = Specialist;
//# sourceMappingURL=Specialist.js.map