"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMemberLifetimeSpend = void 0;
const queryMemberLifetimeSpend = ({ $database }, { memberId }) => {
    if (!memberId)
        return Promise.resolve(0);
    return $database.then(database => {
        const { db } = database;
        return db
            .collection('orders')
            .aggregate([
            {
                $match: {
                    memberId: memberId,
                    checkoutStatus: 'paid',
                    'payment.status': 'paid',
                },
            },
            {
                $project: {
                    payment: 1,
                },
            },
        ])
            .toArray()
            .then(orders => {
            if (!orders || !orders.length)
                return 0;
            // const totalAmount = orders.reduce((partialSum, a) => {
            //   const _subtotal = a?.payment?.amount
            //     ? a?.payment?.amount - Number(a?.payment?.shippingCost?.price || 0)
            //     : 0;
            //   const subtotal = _subtotal >= 0 ? _subtotal : 0;
            //   return partialSum + subtotal;
            // }, 0);
            const totalAmount = orders.reduce((partialSum, _order) => {
                var _a, _b, _c, _d, _e, _f;
                const amount = ((_a = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _a === void 0 ? void 0 : _a.amount) || 0;
                const shippingCostPreDiscount = Number(((_c = (_b = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _b === void 0 ? void 0 : _b.shippingCost) === null || _c === void 0 ? void 0 : _c.price) ||
                    ((_e = (_d = _order === null || _order === void 0 ? void 0 : _order.shipping) === null || _d === void 0 ? void 0 : _d.shippingCost) === null || _e === void 0 ? void 0 : _e.price) ||
                    0);
                const memberShippingDiscount = Number(((_f = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _f === void 0 ? void 0 : _f.memberShippingDiscount) || 0);
                const shippingCost = shippingCostPreDiscount - memberShippingDiscount > 0
                    ? shippingCostPreDiscount - memberShippingDiscount
                    : 0;
                return partialSum + (amount - shippingCost);
            }, 0);
            return totalAmount;
        });
    });
};
exports.queryMemberLifetimeSpend = queryMemberLifetimeSpend;
//# sourceMappingURL=queryMemberLifetimeSpend.js.map