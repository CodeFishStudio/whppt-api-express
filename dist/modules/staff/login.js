"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findActiveStaff = void 0;
const assert_1 = __importDefault(require("assert"));
const omit_1 = __importDefault(require("lodash/omit"));
const login = {
    exec({ $database, $security, apiKey }, { username, password }) {
        (0, assert_1.default)(username, 'A username or email address is required.');
        (0, assert_1.default)(password, 'A password is required.');
        return $database.then(db => {
            return (0, exports.findActiveStaff)(db, username).then(staffMember => {
                return $security.encrypt(password).then(() => {
                    return $security
                        .compare(password, (staffMember === null || staffMember === void 0 ? void 0 : staffMember.password) || '')
                        .then(passwordMatches => {
                        if (!passwordMatches)
                            return Promise.reject(new Error("The password that you've entered is incorrect."));
                        return $security
                            .createToken(apiKey, (0, omit_1.default)(staffMember, 'password'))
                            .then(token => {
                            return {
                                token,
                                staffMember,
                            };
                        });
                    });
                });
            });
        });
    },
};
const findActiveStaff = (db, username) => {
    return Promise.all([
        db.document.query('staff', { filter: { username } }),
        db.document.query('contacts', { filter: { email: username } }),
    ]).then(([staff, contact]) => {
        if (staff) {
            if (!staff.password)
                return Promise.reject(new Error("The username / email address you entered isn't connected to an account."));
            if (!staff.isActive)
                return Promise.reject(new Error('This account has been deactivated.'));
            return staff;
        }
        (0, assert_1.default)(contact, "The username / email address you entered isn't connected to an account.");
        return db.document
            .query('staff', {
            filter: { contactId: contact._id },
        })
            .then(staff => {
            if (!staff)
                return Promise.reject(new Error("The username / email address you entered isn't connected to an account."));
            if (!staff.isActive)
                return Promise.reject(new Error('This account has been deactivated.'));
            return staff;
        });
    });
};
exports.findActiveStaff = findActiveStaff;
exports.default = login;
//# sourceMappingURL=login.js.map