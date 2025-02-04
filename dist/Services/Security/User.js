"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhpptUser = void 0;
const WhpptUser = (values) => {
    return {
        _id: values._id,
        username: values.username,
        roles: values.roles || [],
        isGuest: values._id === 'guest',
    };
};
exports.WhpptUser = WhpptUser;
//# sourceMappingURL=User.js.map