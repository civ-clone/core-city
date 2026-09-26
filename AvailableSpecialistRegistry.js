"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.AvailableSpecialistRegistry = void 0;
const ConstructorRegistry_1 = require("@civ-clone/core-registry/ConstructorRegistry");
const Specialist_1 = require("./Specialist");
class AvailableSpecialistRegistry extends ConstructorRegistry_1.ConstructorRegistry {
    constructor() {
        super(Specialist_1.default);
    }
}
exports.AvailableSpecialistRegistry = AvailableSpecialistRegistry;
exports.instance = new AvailableSpecialistRegistry();
exports.default = AvailableSpecialistRegistry;
//# sourceMappingURL=AvailableSpecialistRegistry.js.map