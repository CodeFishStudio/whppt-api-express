"use strict";
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
    exec({ $mongo: { $db } }, { itemId }) {
        (0, assert_1.default)(itemId, 'itemId is required');
        return $db
            .collection('gallery')
            .findOne({ _id: itemId })
            .then(item => ({ item }));
    },
};
exports.default = load;
//# sourceMappingURL=load.js.map