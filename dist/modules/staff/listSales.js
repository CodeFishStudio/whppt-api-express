"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secure_1 = require("./Secure");
const listSales = {
    exec({ $database }, { dateFromYear, dateFromMonth, dateFromDay, dateToYear, dateToMonth, dateToDay, limit = '10', currentPage = '0', origin, staffId, paymentType, status = 'paid', }) {
        return $database.then(database => {
            const { db } = database;
            const query = {
                $and: [
                    { _id: { $exists: true } },
                    { checkoutStatus: status ? status : { $exists: true } },
                ],
            };
            if (staffId) {
                query.$and.push({
                    'staff._id': staffId,
                });
            }
            if (dateFromYear && dateFromMonth && dateFromDay) {
                query.$and.push({
                    'payment.date': {
                        $gte: new Date(dateFromYear, dateFromMonth, dateFromDay, 0, 0, 0, 0),
                    },
                });
            }
            if (dateToYear && dateToMonth && dateToDay) {
                query.$and.push({
                    'payment.date': {
                        $lt: new Date(dateToYear, dateToMonth, dateToDay, 23, 59, 59, 0),
                    },
                });
            }
            if (origin) {
                query.$and.push({
                    fromPos: { $exists: origin === 'pos' },
                });
            }
            if (paymentType) {
                query.$and.push({
                    'payment.type': paymentType,
                });
            }
            return Promise.all([
                db
                    .collection('orders')
                    .aggregate([
                    {
                        $match: query,
                    },
                    {
                        $sort: {
                            updatedAt: -1,
                        },
                    },
                    {
                        $project: {
                            member: 0,
                            stripe: 0,
                        },
                    },
                    {
                        $skip: parseInt(limit) * parseInt(currentPage),
                    },
                    {
                        $limit: parseInt(limit),
                    },
                ])
                    .toArray(),
                db.collection('orders').countDocuments(query),
                db
                    .collection('orders')
                    .aggregate([
                    {
                        $match: query,
                    },
                    {
                        $project: {
                            quantities: { $sum: '$items.quantity' },
                            payment: 1,
                        },
                    },
                ])
                    .toArray(),
            ]).then(([orders, total = 0, orderAmounts]) => {
                const { salesTotal = 0, itemsTotal = 0 } = calulateAmounts(orderAmounts || []);
                return {
                    orders: removeShippingFromOrders(orders),
                    total,
                    salesTotal,
                    itemsTotal,
                };
            });
        });
    },
};
const removeShippingFromOrders = (orders) => {
    return orders.map((o) => (Object.assign(Object.assign({}, o), { payment: Object.assign(Object.assign({}, o.payment), { amount: o.payment.amount - calcShippingCost(o.payment) }) })));
};
const calulateAmounts = (orders) => {
    let salesTotal = 0;
    let itemsTotal = 0;
    orders.forEach((order) => {
        itemsTotal = order.quantities + itemsTotal;
        const shipping = calcShippingCost(order.payment);
        salesTotal = order.payment.amount - shipping + salesTotal;
    });
    return { salesTotal, itemsTotal };
};
const calcShippingCost = (payment) => {
    var _a, _b;
    return ((_a = payment === null || payment === void 0 ? void 0 : payment.shippingCost) === null || _a === void 0 ? void 0 : _a.type) === 'pickup'
        ? 0
        : (((_b = payment === null || payment === void 0 ? void 0 : payment.shippingCost) === null || _b === void 0 ? void 0 : _b.price) || 0) - ((payment === null || payment === void 0 ? void 0 : payment.memberShippingDiscount) || 0) || 0;
};
exports.default = (0, Secure_1.Secure)(listSales);
//# sourceMappingURL=listSales.js.map