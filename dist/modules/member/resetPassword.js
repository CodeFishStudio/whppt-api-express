"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const resetPassword = {
    exec({ $database, $security, createEvent }, { email, password, confirmPassword, token }) {
        (0, assert_1.default)(email, 'A email is required');
        (0, assert_1.default)(token, 'A email is required');
        (0, assert_1.default)(password === confirmPassword, 'Passwords dont match');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return Promise.all([
                document.query('members', {
                    filter: { 'resetPasswordToken.token': token },
                }),
                document.query('contacts', { filter: { email } }),
            ])
                .then(([member, contact]) => {
                console.log('🚀 ~ file: resetPassword.ts:24 ~ token:', token);
                (0, assert_1.default)(contact, 'No  member found');
                (0, assert_1.default)(member, 'No member found');
                (0, assert_1.default)(contact._id === member.contactId, 'No member found');
                const events = [createEvent('MemberResetPassword', { email })];
                return $security.encrypt(password).then(hashedPassword => {
                    (0, lodash_1.assign)(member, { resetPasswordToken: undefined, password: hashedPassword });
                    return startTransaction(session => {
                        return document.saveWithEvents('members', member, events, { session });
                    });
                });
            })
                .then(() => { });
        });
    },
};
exports.default = resetPassword;
//# sourceMappingURL=resetPassword.js.map