"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpCity = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const City_1 = require("../../City");
const Player_1 = require("@civ-clone/core-player/Player");
const buildWorld_1 = require("@civ-clone/core-world/tests/lib/buildWorld");
const setUpCity = (name = 'city', ruleRegistry = RuleRegistry_1.instance) => new City_1.default(new Player_1.default(), buildWorld_1.generateTile(), name, ruleRegistry);
exports.setUpCity = setUpCity;
exports.default = exports.setUpCity;
//# sourceMappingURL=setUpCity.js.map