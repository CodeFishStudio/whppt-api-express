"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdService = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const IdService = () => ({ newId: () => uniqid_1.default.process() });
exports.IdService = IdService;
//# sourceMappingURL=index.js.map