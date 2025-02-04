"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMembershipTier = void 0;
const lodash_1 = require("lodash");
const calculateMembershipTier = (membershipOptions, currentYear, previousYear) => {
    const sortedTiers = (0, lodash_1.orderBy)(membershipOptions.membershipTiers, ['level'], ['desc']);
    const baseTier = sortedTiers.find(st => st.level === 1);
    if (!baseTier)
        throw new Error('Membership tiers not defined.');
    const currentYearTier = sortedTiers.find(t => t.entryLevelSpend <= currentYear.amount);
    const lastYearTier = sortedTiers.find(t => t.entryLevelSpend <= previousYear.amount);
    const currentTierLevel = (currentYearTier && (currentYearTier === null || currentYearTier === void 0 ? void 0 : currentYearTier.level)) || 1;
    const lastYearTierLevel = (lastYearTier && (lastYearTier === null || lastYearTier === void 0 ? void 0 : lastYearTier.level)) || 1;
    const currentTier = currentYearTier && lastYearTier
        ? currentTierLevel >= lastYearTierLevel
            ? currentYearTier
            : lastYearTier
        : baseTier;
    const nextTierLevel = ((currentTier === null || currentTier === void 0 ? void 0 : currentTier.level) || 0) + 1;
    const nextTier = sortedTiers.find(t => t.level === nextTierLevel);
    return Object.assign(Object.assign({}, currentTier), { discountAppliedForYear: currentYear.discountApplied, amountSpentForYear: currentYear.amount, amountSpentWithDiscount: currentYear.amount, amountToSpendToNextTier: nextTier ? nextTier.entryLevelSpend - currentYear.amount : 0, nextTiers: calculateNextTiers(membershipOptions.membershipTiers, currentTier, currentYear) });
};
exports.calculateMembershipTier = calculateMembershipTier;
const calculateNextTiers = (tiers, currentTier, currentYear) => {
    const nextTiers = currentTier
        ? tiers.filter(t => t.level > currentTier.level)
        : tiers;
    return nextTiers.map((t, i) => (Object.assign(Object.assign({}, t), { amountToSpendToNextTier: i === 0
            ? t.entryLevelSpend - currentYear.amount
            : calculatePreviousTiers(tiers, i) - currentYear.amount })));
};
const calculatePreviousTiers = (tiers, currentTierIndex) => {
    const totalToSpendInThisAndPrevTiers = tiers.reduce((acc, t, i) => {
        if (currentTierIndex < i) {
            return acc + t.entryLevelSpend;
        }
        return acc;
    }, 0) || 0;
    return totalToSpendInThisAndPrevTiers;
};
//# sourceMappingURL=calculateMembershipTier.js.map