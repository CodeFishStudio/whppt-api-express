"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const load = {
    authorise({ $roles }, { user }) {
        const requiredRoles = [];
        return $roles.validate(user, [requiredRoles]);
    },
    exec({ $mongo: { $db } }, { itemId, parentId }) {
        (0, assert_1.default)(itemId, 'itemId is required');
        (0, assert_1.default)(parentId, 'parentId ID is required');
        return $db
            .collection('dependencies')
            .findOne({ _id: `${itemId}_${parentId}` })
            .then(item => item || undefined);
    },
};
exports.default = load;
//# sourceMappingURL=findDependency.js.map