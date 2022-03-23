"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const cities_1 = require("./AdditionalData/cities");
AdditionalDataRegistry_1.instance.register(...(0, cities_1.default)());
//# sourceMappingURL=registerAdditionalData.js.map