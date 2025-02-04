"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const omit_1 = __importDefault(require("lodash/omit"));
const login = {
    exec({ $database, $security, apiKey }, { username, password }) {
        (0, assert_1.default)(username, 'A username or email address is required.');
        (0, assert_1.default)(password, 'A password is required.');
        return $database.then(database => {
            return findMember(database, username).then(member => {
                if (!member)
                    return Promise.reject(new Error("The username / email address you entered isn't connected to an account."));
                if (!member.password)
                    return Promise.reject(new Error('This account is not verified'));
                return $security
                    .compare(password, member.password)
                    .then((passwordMatches) => {
                    if (!passwordMatches)
                        return Promise.reject(new Error("The password that you've entered is incorrect."));
                    return $security
                        .createToken(apiKey, (0, omit_1.default)(member, ['password', 'notes']))
                        .then(token => {
                        return {
                            token,
                            memberId: member._id,
                        };
                    });
                });
            });
        });
    },
};
const findMember = (db, username) => {
    return Promise.all([
        db.document.query('members', {
            filter: { username: new RegExp(`^${username}$`, 'iu') },
        }),
        db.document.query('contacts', {
            filter: { email: new RegExp(`^${username}$`, 'iu') },
        }),
    ]).then(([member, contact]) => {
        if (member)
            return member;
        (0, assert_1.default)(contact, "The username / email address you entered isn't connected to an account.");
        return db.document.query('members', { filter: { contactId: contact._id } });
    });
};
exports.default = login;
//# sourceMappingURL=login.js.map