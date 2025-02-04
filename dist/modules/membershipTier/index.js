"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipTier = void 0;
const save_1 = __importDefault(require("./save"));
const load_1 = __importDefault(require("./load"));
const getEntryLevelTier_1 = __importDefault(require("./getEntryLevelTier"));
exports.membershipTier = {
    save: save_1.default,
    load: load_1.default,
    getEntryLevelTier: getEntryLevelTier_1.default,
};
//# sourceMappingURL=index.js.map