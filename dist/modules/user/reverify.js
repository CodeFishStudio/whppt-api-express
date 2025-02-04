"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert = require('assert');
const { toLower } = require('lodash');
module.exports = {
    authorise({ $roles }, { user }) {
        return Promise.resolve(!$roles.isGuest(user));
    },
    exec({ $mongo: { $db, $save }, $id, $security, apiKey }, { userId }) {
        assert(userId, 'Missing Field: Please provide a id');
        return findExistingUsers($db, userId).then(existingUser => {
            assert(existingUser, 'User not found');
            return $security
                .generateAccessToken(apiKey, existingUser._id)
                .then(({ token, tokenExpiry }) => {
                existingUser.passwordResetToken = { token, tokenExpiry };
                return $save('users', existingUser).then(() => {
                    return generateResetLink(token, existingUser.email);
                });
            });
        });
    },
};
function findExistingUsers($db, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        return $db.collection('users').findOne({ _id });
    });
}
function generateResetLink(token, email) {
    return `${process.env.BASE_URL}/?token=${token}&email=${email}`;
}
//# sourceMappingURL=reverify.js.map