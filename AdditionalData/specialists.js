"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const SpecialistRegistry_1 = require("../SpecialistRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const City_1 = require("../City");
const getAdditionalData = (specialistRegistry = SpecialistRegistry_1.instance) => [
    new AdditionalData_1.default(City_1.default, 'specialists', (city) => specialistRegistry.getByCity(city)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=specialists.js.map