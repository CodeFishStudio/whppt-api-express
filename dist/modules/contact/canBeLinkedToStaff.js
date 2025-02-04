"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const canBeLinkedToStaff = {
    exec({ $database }, { email }) {
        (0, assert_1.default)(email, 'A email is required');
        return $database.then(database => {
            const { document } = database;
            return document
                .query('contacts', { filter: { email } })
                .then(usedEmail => {
                if (!usedEmail)
                    return true;
                return document
                    .query('staff', {
                    filter: { contactId: usedEmail._id },
                })
                    .then(staff => {
                    if (staff)
                        return false;
                    return usedEmail;
                });
            });
        });
    },
};
exports.default = canBeLinkedToStaff;
//# sourceMappingURL=canBeLinkedToStaff.js.map