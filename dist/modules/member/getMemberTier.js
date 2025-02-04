"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryMemberTier_1 = require("../order/Queries/queryMemberTier");
const Secure_1 = require("./Secure");
const getMemberTier = {
    exec(context, args) {
        return (0, queryMemberTier_1.queryMemberTier)(context, args);
    },
};
exports.default = (0, Secure_1.Secure)(getMemberTier);
//# sourceMappingURL=getMemberTier.js.map