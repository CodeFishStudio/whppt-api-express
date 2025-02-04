"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const debug_1 = __importDefault(require("debug"));
const Logger = () => ({
    info: (0, debug_1.default)('whppt:info'),
    error: (0, debug_1.default)('whppt:error'),
    warning: (0, debug_1.default)('whppt:warning'),
    dev: (0, debug_1.default)('whppt:dev'),
});
exports.Logger = Logger;
//# sourceMappingURL=index.js.map