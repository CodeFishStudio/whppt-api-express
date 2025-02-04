"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
const contactTemplate_1 = require("./contactTemplate");
const emailReceipt_1 = require("./emailReceipt");
const headers_1 = require("./headers");
const footer_1 = require("./footer");
const passwordResetEmail_1 = require("./passwordResetEmail");
exports.Templates = {
    HentleyFarm: {
        headers: headers_1.headers,
        footer: footer_1.footer,
        getOrderTemplate: emailReceipt_1.getOrderTemplate,
        resetPasswordTemplate: passwordResetEmail_1.resetPasswordTemplate,
        getContactTemplate: contactTemplate_1.getContactTemplate,
    },
};
//# sourceMappingURL=index.js.map