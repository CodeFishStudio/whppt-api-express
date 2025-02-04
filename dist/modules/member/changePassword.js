"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const changePassword = {
    exec({ $database, createEvent, $security }, { memberId, currentPassword, newPassword, confirmNewPassword }) {
        (0, assert_1.default)(memberId, 'A member id is required');
        (0, assert_1.default)(newPassword, 'A new password is required');
        (0, assert_1.default)(currentPassword, 'A current password required');
        (0, assert_1.default)(confirmNewPassword, 'A current password required');
        (0, assert_1.default)(newPassword === confirmNewPassword, "New password doesn't match confirmation password.");
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('members', memberId).then(member => {
                (0, assert_1.default)(member, 'Could not find member.');
                return $security.encrypt(newPassword).then(encryptedNew => {
                    return $security
                        .compare(currentPassword, member.password)
                        .then((passwordMatches) => {
                        if (!passwordMatches)
                            return Promise.reject(new Error("The current password that you've entered is incorrect."));
                        const memberEvents = [createEvent('ChangedPassword', { memberId })];
                        member.password = encryptedNew;
                        return startTransaction(session => {
                            return document.saveWithEvents('members', member, memberEvents, {
                                session,
                            });
                        });
                    });
                });
            });
        });
    },
};
exports.default = changePassword;
//# sourceMappingURL=changePassword.js.map