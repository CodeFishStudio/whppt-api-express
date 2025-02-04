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
    exec({ $mongo: { $db, $save }, $id, $security, apiKey }, { newUser }) {
        const { username, email } = newUser;
        const lowerUsername = toLower(username);
        const lowerEmail = toLower(email);
        assert(username || email, 'Missing Field: Please provide a username or email');
        return findExistingUsers($db, lowerUsername, lowerEmail).then(existingUser => {
            let error = '';
            if (existingUser &&
                existingUser.username &&
                lowerUsername === toLower(existingUser.username))
                error = 'Username already taken, please try another username';
            if (existingUser &&
                existingUser.email &&
                existingUser.email !== '' &&
                lowerEmail === toLower(existingUser.email))
                error = 'Email address already taken, please try another email';
            assert(!existingUser, error);
            const user = {
                _id: $id.newId(),
                username: lowerUsername,
                email: lowerEmail,
            };
            return $security
                .generateAccessToken(apiKey, user._id)
                .then(({ token, tokenExpiry }) => {
                user.passwordResetToken = { token, tokenExpiry };
                return $save('users', user).then(() => {
                    return generateResetLink(token, lowerEmail);
                });
            });
        });
    },
};
function findExistingUsers($db, username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchParams = [];
        if (username)
            searchParams.push({ username: new RegExp(`^${username}$`, 'iu') });
        if (email)
            searchParams.push({ email: new RegExp(`^${email}$`, 'iu') });
        return $db.collection('users').findOne({ $or: searchParams });
    });
}
function generateResetLink(token, email) {
    return `${process.env.BASE_URL}/?token=${token}&email=${email}`;
}
//# sourceMappingURL=create.js.map