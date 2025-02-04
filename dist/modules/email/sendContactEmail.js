"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Templates_1 = require("./Templates");
const sendContactEmail = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { to, subject, content, clientKey }) {
        (0, assert_1.default)(clientKey, 'Client key is required');
        (0, assert_1.default)(to, 'Email address is required');
        return context.$email.send({
            to,
            subject,
            html: Templates_1.Templates[clientKey].getContactTemplate(content),
        });
    },
};
exports.default = sendContactEmail;
//# sourceMappingURL=sendContactEmail.js.map