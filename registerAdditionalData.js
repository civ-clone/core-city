"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cities_1 = require("./AdditionalData/cities");
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const worked_by_1 = require("./AdditionalData/worked-by");
AdditionalDataRegistry_1.instance.register(...(0, cities_1.default)(), ...(0, worked_by_1.default)());
//# sourceMappingURL=registerAdditionalData.js.map