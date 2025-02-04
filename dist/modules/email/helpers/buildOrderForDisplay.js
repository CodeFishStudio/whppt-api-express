"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderForDisplay = void 0;
function getSubtotal(order) {
    return order && order.items.length
        ? order.items.reduce((acc, item) => {
            var _a;
            return (acc +
                (Number((item === null || item === void 0 ? void 0 : item.purchasedPrice) || ((_a = item.product) === null || _a === void 0 ? void 0 : _a.price) || 0) / 100) *
                    Number(item.quantity || 0));
        }, 0)
        : 0;
}
const buildOrderForDisplay = (order) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const memberShippingDiscount = Number((_a = order === null || order === void 0 ? void 0 : order.payment) === null || _a === void 0 ? void 0 : _a.memberShippingDiscount) / 100 || 0;
    const totalDiscounted = ((_b = order === null || order === void 0 ? void 0 : order.overrides) === null || _b === void 0 ? void 0 : _b.total) && ((_c = order === null || order === void 0 ? void 0 : order.overrides) === null || _c === void 0 ? void 0 : _c.total) / 100;
    const _shippingCost = Number(((_e = (_d = order === null || order === void 0 ? void 0 : order.payment) === null || _d === void 0 ? void 0 : _d.shippingCost) === null || _e === void 0 ? void 0 : _e.price) || ((_g = (_f = order === null || order === void 0 ? void 0 : order.shipping) === null || _f === void 0 ? void 0 : _f.shippingCost) === null || _g === void 0 ? void 0 : _g.price) || 0) /
        100 -
        memberShippingDiscount;
    const shippingCost = _shippingCost >= 0 ? _shippingCost : 0;
    const shipping = ((_h = order === null || order === void 0 ? void 0 : order.shipping) === null || _h === void 0 ? void 0 : _h.pickup)
        ? 'Pickup'
        : shippingCost === 0
            ? 'Complimentary'
            : `$${shippingCost.toFixed(2)}`;
    const subtotal = totalDiscounted || getSubtotal(order);
    const originalSubtotal = getSubtotal(order);
    const itemsDiscountedCostInCents = order && order.items.length
        ? order.items.reduce((acc, item) => {
            const price = Number(item.overidedPrice || item.overidedPrice === 0
                ? item.overidedPrice
                : undefined);
            if (!price)
                return acc;
            return (acc + ((Number(item.originalPrice) || 0) - price) * Number(item.quantity));
        }, 0)
        : 0;
    const itemsDiscountedAmount = itemsDiscountedCostInCents / 100;
    const totalDiscountedFromTotal = (totalDiscounted || totalDiscounted === 0) && originalSubtotal
        ? originalSubtotal - totalDiscounted
        : 0;
    const membersDiscount = !itemsDiscountedCostInCents
        ? Number((_j = order === null || order === void 0 ? void 0 : order.payment) === null || _j === void 0 ? void 0 : _j.memberTotalDiscount) / 100
        : 0;
    const total = totalDiscounted || totalDiscounted === 0
        ? totalDiscounted + shippingCost
        : subtotal + shippingCost - membersDiscount;
    const tax = total / 11;
    return {
        total: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        shipping,
        totalDiscountedFromTotal: totalDiscountedFromTotal > 0 ? totalDiscountedFromTotal.toFixed(2) : 0,
        itemsDiscountedAmount: itemsDiscountedAmount > 0 ? itemsDiscountedAmount.toFixed(2) : 0,
        tax: tax.toFixed(2),
        membersDiscount: membersDiscount > 0 ? membersDiscount.toFixed(2) : 0,
    };
};
exports.buildOrderForDisplay = buildOrderForDisplay;
//# sourceMappingURL=buildOrderForDisplay.js.map