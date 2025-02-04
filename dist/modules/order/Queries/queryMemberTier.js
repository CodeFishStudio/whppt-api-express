"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMemberTier = void 0;
const assert_1 = __importDefault(require("assert"));
const queryMemberAmountSpentForYear_1 = require("./queryMemberAmountSpentForYear");
const calculateMembershipTier_1 = require("./helpers/calculateMembershipTier");
const queryMemberLifetimeSpend_1 = require("./queryMemberLifetimeSpend");
const queryMemberTier = (context, { memberId, domainId }) => {
    if (!memberId)
        return Promise.resolve({});
    return context.$database.then(database => {
        (0, assert_1.default)(domainId, 'Domain Id required');
        const { db, document } = database;
        return Promise.all([
            db.collection('members').findOne({ _id: memberId }),
            document.query('site', {
                filter: { _id: `membershipOptions_${domainId}` },
            }),
        ]).then(([member, membershipOptions]) => {
            var _a;
            (0, assert_1.default)(member, `Member not found for ID:${memberId}`);
            (0, assert_1.default)(membershipOptions, 'Member Tiers not found');
            const lockedTier = (member === null || member === void 0 ? void 0 : member.lockToTier)
                ? (_a = membershipOptions === null || membershipOptions === void 0 ? void 0 : membershipOptions.membershipTiers) === null || _a === void 0 ? void 0 : _a.find(tier => tier._id === member.lockToTier)
                : undefined;
            return (0, queryMemberAmountSpentForYear_1.queryMemberAmountSpentForYear)(context, { memberId }).then(({ currentYear, previousYear }) => {
                if (lockedTier)
                    return Object.assign(Object.assign({}, lockedTier), { currentYear, lockToTier: member.lockToTier, amountToSpendToNextTier: 0 });
                const tier = (0, calculateMembershipTier_1.calculateMembershipTier)(membershipOptions, currentYear, previousYear);
                return (0, queryMemberLifetimeSpend_1.queryMemberLifetimeSpend)(context, { memberId }).then(lifetimeSpend => {
                    return Object.assign(Object.assign({}, tier), { lifetimeSpend });
                });
            });
        });
    });
};
exports.queryMemberTier = queryMemberTier;
//# sourceMappingURL=queryMemberTier.js.map