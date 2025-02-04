"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderCosts = void 0;
const membersTotalSavings_1 = require("./membersTotalSavings");
const membersShippingSavings_1 = require("./membersShippingSavings");
const calculateOrderCosts = ([shippingCost, memberTier, order]) => {
    var _a, _b, _c, _d, _e, _f;
    const itemsCostInCents = order && order.items.length
        ? order.items.reduce((acc, item) => {
            var _a;
            const price = Number(item.overidedPrice || item.overidedPrice === 0
                ? item.overidedPrice
                : ((_a = item.product) === null || _a === void 0 ? void 0 : _a.price) || item.purchasedPrice);
            return acc + price * Number(item.quantity || 0);
        }, 0)
        : 0;
    const itemsDiscountedCostInCents = order && order.items.length
        ? order.items.reduce((acc, item) => {
            const price = Number(item.overidedPrice || item.overidedPrice === 0
                ? item.overidedPrice
                : undefined);
            if (!price)
                return acc;
            return acc + price * Number(item.quantity);
        }, 0)
        : 0;
    const itemsOriginalCostInCents = order && order.items.length
        ? order.items.reduce((acc, item) => {
            var _a;
            const price = Number((_a = item.product) === null || _a === void 0 ? void 0 : _a.price);
            return acc + price * Number(item.quantity);
        }, 0)
        : 0;
    const postageCostInCents = ((_b = (_a = order === null || order === void 0 ? void 0 : order.shipping) === null || _a === void 0 ? void 0 : _a.shippingCost) === null || _b === void 0 ? void 0 : _b.price) || (shippingCost === null || shippingCost === void 0 ? void 0 : shippingCost.price) || 0;
    if (!shippingCost.allowCheckout)
        throw new Error(shippingCost.message);
    const amountOfProducts = calcAmountOfProducts(order);
    const overrideTotalPrice = ((_c = order === null || order === void 0 ? void 0 : order.overrides) === null || _c === void 0 ? void 0 : _c.total) || ((_d = order === null || order === void 0 ? void 0 : order.overrides) === null || _d === void 0 ? void 0 : _d.total) === 0
        ? Number((_e = order === null || order === void 0 ? void 0 : order.overrides) === null || _e === void 0 ? void 0 : _e.total)
        : undefined;
    const memberTotalDiscount = (memberTier === null || memberTier === void 0 ? void 0 : memberTier.discounts) && !overrideTotalPrice && !itemsDiscountedCostInCents
        ? (0, membersTotalSavings_1.calculateMembersTotalSavings)([memberTier, ...(memberTier.nextTiers || [])], itemsCostInCents, memberTier.amountSpentWithDiscount || 0, amountOfProducts, memberTier.lockToTier || '').reduce((acc, discount) => acc + discount.discountApplied || 0, 0)
        : 0;
    const memberShippingDiscount = (memberTier === null || memberTier === void 0 ? void 0 : memberTier.discounts)
        ? (0, membersShippingSavings_1.calculateMemberShippingSavings)(memberTier, shippingCost, itemsCostInCents, memberTotalDiscount, amountOfProducts, memberTier.amountSpentWithDiscount || 0)
        : 0;
    const itemsWithDiscount = itemsDiscountedCostInCents > 0
        ? Number(itemsCostInCents)
        : Number(itemsCostInCents) - memberTotalDiscount < 0
            ? 0
            : Number(itemsCostInCents) - memberTotalDiscount;
    const postageWithDiscount = Number(postageCostInCents) - memberShippingDiscount < 0
        ? 0
        : Number(postageCostInCents) - memberShippingDiscount;
    const total = overrideTotalPrice || overrideTotalPrice == 0
        ? overrideTotalPrice + postageWithDiscount
        : itemsWithDiscount + postageWithDiscount;
    const subTotal = overrideTotalPrice || overrideTotalPrice == 0 ? overrideTotalPrice : itemsCostInCents;
    const originalTotal = itemsWithDiscount + postageWithDiscount;
    const totalOverrideOfOriginalTotal = overrideTotalPrice
        ? itemsWithDiscount - overrideTotalPrice
        : undefined;
    const itemOverridesDiscount = itemsDiscountedCostInCents
        ? itemsOriginalCostInCents - itemsDiscountedCostInCents
        : undefined;
    const discountApplied = Number((totalOverrideOfOriginalTotal &&
        totalOverrideOfOriginalTotal + (itemOverridesDiscount || 0)) ||
        itemOverridesDiscount ||
        memberTotalDiscount);
    return {
        total,
        subTotal,
        originalSubTotal: itemsCostInCents,
        shippingCost: ((_f = order === null || order === void 0 ? void 0 : order.shipping) === null || _f === void 0 ? void 0 : _f.shippingCost) || shippingCost,
        memberTotalDiscount,
        memberShippingDiscount,
        originalTotal,
        overrideTotalPrice,
        discountApplied,
    };
};
exports.calculateOrderCosts = calculateOrderCosts;
const calcAmountOfProducts = (order) => {
    var _a;
    return (((_a = order === null || order === void 0 ? void 0 : order.items) === null || _a === void 0 ? void 0 : _a.reduce((partialSum, item) => {
        var _a, _b, _c;
        const packItemsQuantity = (_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.customFields) === null || _b === void 0 ? void 0 : _b.packItems) === null || _c === void 0 ? void 0 : _c.reduce((ps, pi) => ps + pi.qty, 0);
        if (!packItemsQuantity || packItemsQuantity === 0)
            return partialSum + item.quantity;
        return partialSum + item.quantity * packItemsQuantity;
    }, 0)) || 0);
};
// const amountOfProducts = useMemo(() => {
//   return (
//     order?.items?.reduce((partialSum, item) => {
//       const packItemsQuantity = item?.product?.customFields?.packItems?.reduce(
//         (ps: any, pi: any) => ps + pi.qty,
//         0
//       );
//       if (!packItemsQuantity || packItemsQuantity === 0)
//         return partialSum + item.quantity;
//       return partialSum + item.quantity * packItemsQuantity;
//     }, 0) || 0
//   );
// }, [order?.items]);
//# sourceMappingURL=calculateOrderCosts.js.map