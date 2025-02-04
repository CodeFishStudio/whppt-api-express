"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const passwordResetEmail_1 = require("../email/Templates/passwordResetEmail");
const forgottenPassword = {
    exec({ $database, $security, createEvent, apiKey, $email }, { email }, { headers }) {
        (0, assert_1.default)(email, 'A email is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document
                .query('contacts', { filter: { email } })
                .then(usedEmail => {
                if (!usedEmail)
                    return Promise.reject({ status: 404, message: 'No staff member found' });
                return document
                    .query('staff', {
                    filter: { contactId: usedEmail._id },
                })
                    .then(staff => {
                    if (!staff)
                        return Promise.reject({ status: 404, message: 'No staff member found' });
                    const events = [createEvent('RequestedResetPasswordForStaff', { email })];
                    return $security.generateAccessToken(apiKey, staff._id, 60).then(token => {
                        (0, lodash_1.assign)(staff, { resetPasswordToken: token });
                        return startTransaction(session => {
                            return document
                                .saveWithEvents('staff', staff, events, { session })
                                .then(() => {
                                const recoveryPageLink = `${headers.origin}/hentley-password-recovery/staff?email=${email}&recoveryToken=${token.token}`;
                                let html = (0, passwordResetEmail_1.resetPasswordTemplate)(recoveryPageLink);
                                return $email.send({
                                    to: email,
                                    subject: 'Recover your password',
                                    html,
                                });
                            });
                        });
                    });
                });
            })
                .then(() => { });
        });
    },
};
exports.default = forgottenPassword;
//# sourceMappingURL=forgottenPassword.js.map