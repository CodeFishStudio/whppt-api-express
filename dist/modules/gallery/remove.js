"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const load = {
    authorise({ $roles }, { user }) {
        // TODO: Gallery Security
        const requiredRoles = [];
        return $roles.validate(user, [requiredRoles]);
    },
    exec({ $mongo: { $delete, $startTransaction }, $storage }, { itemId, type }) {
        (0, assert_1.default)(itemId, 'itemId is required');
        (0, assert_1.default)(type, 'Item type is reqiured.');
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            return $delete('gallery', itemId, { session })
                .then(() => $storage.remove(itemId, type))
                .then(() => { });
        }));
    },
};
exports.default = load;
//# sourceMappingURL=remove.js.map