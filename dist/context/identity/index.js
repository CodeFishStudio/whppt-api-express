"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const assert_1 = __importDefault(require("assert"));
const Identity = () => {
    return {
        isUser: user => (0, assert_1.default)(user._id !== 'guest', 'Unauthorised'),
    };
};
exports.Identity = Identity;
//# sourceMappingURL=index.js.map