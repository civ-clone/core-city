"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.SpecialistRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Specialist_1 = require("./Specialist");
class SpecialistRegistry extends EntityRegistry_1.default {
    constructor() {
        super(Specialist_1.default);
    }
    getByCity(city) {
        return this.getBy('city', city);
    }
}
exports.SpecialistRegistry = SpecialistRegistry;
exports.instance = new SpecialistRegistry();
exports.default = SpecialistRegistry;
//# sourceMappingURL=SpecialistRegistry.js.map