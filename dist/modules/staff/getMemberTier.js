"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryMemberLifetimeSpend_1 = require("../order/Queries/queryMemberLifetimeSpend");
const queryMemberTier_1 = require("../order/Queries/queryMemberTier");
const Secure_1 = require("./Secure");
const getMemberTier = {
    exec(context, args) {
        return (0, queryMemberTier_1.queryMemberTier)(context, args).then(tier => {
            return (0, queryMemberLifetimeSpend_1.queryMemberLifetimeSpend)(context, args).then(lifetimeSpend => {
                return Object.assign(Object.assign({}, tier), { lifetimeSpend });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(getMemberTier);
//# sourceMappingURL=getMemberTier.js.map