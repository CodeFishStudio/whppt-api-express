"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMemberAmountSpentForYear = void 0;
const queryMemberAmountSpentForYear = ({ $database }, { memberId }) => {
    if (!memberId)
        return Promise.resolve({
            currentYear: {
                amount: 0,
                discountApplied: 0,
            },
            previousYear: {
                amount: 0,
                discountApplied: 0,
            },
        });
    const year = new Date().getFullYear();
    const startOfLastYear = new Date(`1/1/${year - 1} 10:30`);
    const startOfThisYear = new Date(`1/1/${year} 10:30`);
    const endOfThisYear = new Date(`1/1/${year + 1} 10:30`);
    return $database.then(database => {
        const { db } = database;
        return Promise.all([
            db
                .collection('orders')
                .aggregate(buildQuery(memberId, startOfThisYear, endOfThisYear))
                .toArray(),
            db
                .collection('orders')
                .aggregate(buildQuery(memberId, startOfLastYear, startOfThisYear))
                .toArray(),
        ]).then(([thisYearsOrders, lastYearsOrders]) => {
            const amountSpentForYear = calcAmountSpentTowardsMembership(thisYearsOrders);
            const discountAppliedForYear = calcDiscount(thisYearsOrders);
            const amountSpentForLastYear = calcAmountSpentTowardsMembership(lastYearsOrders);
            const discountAppliedForLastYear = calcDiscount(lastYearsOrders);
            return {
                currentYear: {
                    amount: amountSpentForYear,
                    discountApplied: discountAppliedForYear,
                },
                previousYear: {
                    amount: amountSpentForLastYear,
                    discountApplied: discountAppliedForLastYear,
                },
            };
        });
    });
};
exports.queryMemberAmountSpentForYear = queryMemberAmountSpentForYear;
const calcAmountSpentTowardsMembership = (orders) => {
    return orders.reduce((partialSum, _order) => {
        var _a, _b, _c, _d, _e, _f;
        const amount = ((_a = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _a === void 0 ? void 0 : _a.amount) || 0;
        const shippingCostPreDiscount = Number(((_c = (_b = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _b === void 0 ? void 0 : _b.shippingCost) === null || _c === void 0 ? void 0 : _c.price) || ((_e = (_d = _order === null || _order === void 0 ? void 0 : _order.shipping) === null || _d === void 0 ? void 0 : _d.shippingCost) === null || _e === void 0 ? void 0 : _e.price) || 0);
        const memberShippingDiscount = Number(((_f = _order === null || _order === void 0 ? void 0 : _order.payment) === null || _f === void 0 ? void 0 : _f.memberShippingDiscount) || 0);
        const shippingCost = shippingCostPreDiscount - memberShippingDiscount > 0
            ? shippingCostPreDiscount - memberShippingDiscount
            : 0;
        return partialSum + (amount - shippingCost);
    }, 0);
};
const calcDiscount = (orders) => {
    return orders.reduce((partialSum, a) => {
        var _a, _b;
        return partialSum +
            (((_a = a === null || a === void 0 ? void 0 : a.payment) === null || _a === void 0 ? void 0 : _a.memberTotalDiscount) ? (_b = a === null || a === void 0 ? void 0 : a.payment) === null || _b === void 0 ? void 0 : _b.memberTotalDiscount : 0);
    }, 0);
};
const buildQuery = (memberId, start, end) => [
    {
        $match: {
            memberId: memberId,
            'payment.status': 'paid',
            checkoutStatus: 'paid',
            $and: [
                {
                    updatedAt: {
                        $gte: start,
                    },
                },
                {
                    updatedAt: { $lt: end },
                },
            ],
        },
    },
    {
        $project: {
            payment: 1,
        },
    },
];
//# sourceMappingURL=queryMemberAmountSpentForYear.js.map