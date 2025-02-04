"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const checkUsernameIsAvailable = {
    exec({ $database }, { username }) {
        (0, assert_1.default)(username, 'A username is required');
        return $database.then(database => {
            const { document } = database;
            return document
                .query('members', { filter: { username } })
                .then(usedUsername => {
                (0, assert_1.default)(!usedUsername, 'Username already in use.');
                return;
            });
        });
    },
};
exports.default = checkUsernameIsAvailable;
//# sourceMappingURL=checkUsernameIsAvailable.js.map