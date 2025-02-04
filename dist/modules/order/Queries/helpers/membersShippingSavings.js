"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMemberShippingSavings = void 0;
const calculateMemberShippingSavings = (tier, shippingCost, itemsCostInCents, purchaseTotalDiscount, amountOfProducts, amountSpentForYear) => {
    var _a, _b, _c, _d;
    if (!(tier === null || tier === void 0 ? void 0 : tier.discounts))
        return 0;
    let selectedDiscountTier = tier;
    if ((_a = tier.nextTiers) === null || _a === void 0 ? void 0 : _a.length) {
        (_b = tier.nextTiers) === null || _b === void 0 ? void 0 : _b.sort((a, b) => a.entryLevelSpend - b.entryLevelSpend);
        (_c = tier.nextTiers) === null || _c === void 0 ? void 0 : _c.forEach(tier => {
            if (amountSpentForYear + itemsCostInCents - purchaseTotalDiscount >=
                tier.entryLevelSpend)
                selectedDiscountTier = tier;
        });
    }
    return (_d = selectedDiscountTier === null || selectedDiscountTier === void 0 ? void 0 : selectedDiscountTier.discounts) === null || _d === void 0 ? void 0 : _d.reduce(getDiscountedAmount, 0);
    function getDiscountedAmount(partialSum, discount) {
        var _a;
        if (discount.appliedTo === 'total')
            return partialSum + 0;
        if (discount.minItemsRequiredForDiscount &&
            discount.minItemsRequiredForDiscount > amountOfProducts)
            return partialSum + 0;
        if (((_a = discount === null || discount === void 0 ? void 0 : discount.shipping) === null || _a === void 0 ? void 0 : _a.value) !== shippingCost.type)
            return partialSum + 0;
        if (discount.type === 'flat')
            return partialSum + discount.value;
        return partialSum + Number(shippingCost.price) * (discount.value / 100);
    }
};
exports.calculateMemberShippingSavings = calculateMemberShippingSavings;
//# sourceMappingURL=membersShippingSavings.js.map