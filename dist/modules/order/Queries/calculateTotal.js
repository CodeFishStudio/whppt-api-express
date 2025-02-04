"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = void 0;
const getShippingCost_1 = require("./getShippingCost");
const loadOrderWithProducts_1 = require("./loadOrderWithProducts");
const queryMemberTier_1 = require("./queryMemberTier");
const calculateOrderCosts_1 = require("./helpers/calculateOrderCosts");
const calculateTotal = (ctx, { orderId, domainId, memberId }) => {
    return (0, loadOrderWithProducts_1.loadOrderWithProducts)(ctx, { _id: orderId }).then(order => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return Promise.all([
            (0, getShippingCost_1.getShippingCost)(ctx, {
                items: order.items,
                postcode: (_b = (_a = order.shipping) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.postCode,
                country: (_d = (_c = order.shipping) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.country,
                pickup: ((_e = order.shipping) === null || _e === void 0 ? void 0 : _e.pickup) || false,
                domainId,
                override: ((_g = (_f = order === null || order === void 0 ? void 0 : order.shipping) === null || _f === void 0 ? void 0 : _f.shippingCost) === null || _g === void 0 ? void 0 : _g.override)
                    ? (_h = order === null || order === void 0 ? void 0 : order.shipping) === null || _h === void 0 ? void 0 : _h.shippingCost
                    : {},
            }),
            (0, queryMemberTier_1.queryMemberTier)(ctx, { domainId, memberId, orderId }),
        ]).then(([shippingCost, memberTier]) => {
            return (0, calculateOrderCosts_1.calculateOrderCosts)([shippingCost, memberTier, order]);
        });
    });
};
exports.calculateTotal = calculateTotal;
//# sourceMappingURL=calculateTotal.js.map