"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUnitDiscountsToOrder = void 0;
const lodash_1 = require("lodash");
const addUnitDiscountsToOrder = order => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const orderLevelDiscountPercentage = ((_a = order.payment) === null || _a === void 0 ? void 0 : _a.originalSubTotal) && ((_b = order.payment) === null || _b === void 0 ? void 0 : _b.overrideTotalPrice)
        ? ((_c = order.payment) === null || _c === void 0 ? void 0 : _c.overrideTotalPrice) / order.payment.originalSubTotal
        : 0;
    const memberLevelDiscountPercentage = ((_d = order.payment) === null || _d === void 0 ? void 0 : _d.originalSubTotal) && ((_e = order.payment) === null || _e === void 0 ? void 0 : _e.memberTotalDiscount)
        ? ((_f = order.payment) === null || _f === void 0 ? void 0 : _f.memberTotalDiscount) / order.payment.originalSubTotal
        : 0;
    const memberShippingDiscount = Number((_g = order === null || order === void 0 ? void 0 : order.payment) === null || _g === void 0 ? void 0 : _g.memberShippingDiscount) || 0;
    const shippingCostWithDiscount = ((_j = (_h = order.payment) === null || _h === void 0 ? void 0 : _h.shippingCost) === null || _j === void 0 ? void 0 : _j.price)
        ? Number((_l = (_k = order.payment) === null || _k === void 0 ? void 0 : _k.shippingCost) === null || _l === void 0 ? void 0 : _l.price) - memberShippingDiscount
        : 0;
    const shippingCost = shippingCostWithDiscount > 0 ? shippingCostWithDiscount : 0;
    const amountOfItems = (0, lodash_1.sumBy)(order.items, (i) => i.quantity);
    const shippingCostPer = shippingCost / amountOfItems;
    return Object.assign(Object.assign({}, order), { items: order.items.map((item) => {
            var _a, _b;
            const purchasedPrice = Number(item.purchasedPrice);
            const unitPriceWithDiscount = orderLevelDiscountPercentage
                ? purchasedPrice * orderLevelDiscountPercentage
                : purchasedPrice;
            const unitPriceWithMemberDiscount = memberLevelDiscountPercentage
                ? purchasedPrice - purchasedPrice * memberLevelDiscountPercentage
                : 0;
            const orgPrice = Number(item.originalPrice || ((_a = item.product) === null || _a === void 0 ? void 0 : _a.price) || 0);
            const percentagePaidOnLineItem = orgPrice ? unitPriceWithDiscount / orgPrice : 0;
            const totalDiscountOnLineItem = percentagePaidOnLineItem !== 0 ? 1 - percentagePaidOnLineItem : 0;
            const totalDiscountApplied = Number(Number(totalDiscountOnLineItem
                ? totalDiscountOnLineItem * 100
                : memberLevelDiscountPercentage
                    ? memberLevelDiscountPercentage * 100
                    : 0).toFixed(2));
            const revenue = unitPriceWithMemberDiscount
                ? unitPriceWithMemberDiscount * item.quantity
                : unitPriceWithDiscount * item.quantity;
            return Object.assign(Object.assign({}, item), { productName: item.productName || ((_b = item.product) === null || _b === void 0 ? void 0 : _b.name), totalDiscountApplied, revenue: revenue, shippingCostPrice: shippingCostPer * item.quantity });
        }) });
};
exports.addUnitDiscountsToOrder = addUnitDiscountsToOrder;
//# sourceMappingURL=AddUnitDiscounts.js.map