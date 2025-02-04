"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delivery = void 0;
const save_1 = __importDefault(require("./save"));
const load_1 = __importDefault(require("./load"));
const getPrice_1 = __importDefault(require("./getPrice"));
exports.delivery = {
    save: save_1.default,
    load: load_1.default,
    getPrice: getPrice_1.default,
};
//# sourceMappingURL=index.js.map