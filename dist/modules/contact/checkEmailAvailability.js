"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const checkEmailAvailability = {
    exec({ $database }, { email, contactId }) {
        (0, assert_1.default)(email, 'A email is required');
        return $database.then(database => {
            const { document } = database;
            const query = { filter: { email } };
            if (contactId)
                query.filter._id = { $ne: contactId };
            return document.query('contacts', query).then(usedEmail => {
                return !usedEmail;
            });
        });
    },
};
exports.default = checkEmailAvailability;
//# sourceMappingURL=checkEmailAvailability.js.map