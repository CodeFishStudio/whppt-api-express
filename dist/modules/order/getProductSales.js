"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddUnitDiscounts_1 = require("./Helpers/AddUnitDiscounts");
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const getProductSales = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { dateFromYear, dateFromMonth, dateFromDay, dateToYear, dateToMonth, dateToDay, limit = '10', currentPage = '0', origin, marketArea, customerId, }) {
        return context.$database.then(database => {
            const { db } = database;
            const query = {
                $and: [{ _id: { $exists: true }, checkoutStatus: 'paid' }],
            };
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
                        $lt: new Date(dateToYear, dateToMonth, dateToDay, 0, 0, 0, 0),
                    },
                });
            }
            if (origin) {
                query.$and.push({
                    fromPos: { $exists: origin === 'pos' },
                });
            }
            if (customerId) {
                query.$and.push({
                    'contact._id': customerId,
                });
            }
            if (marketArea) {
                query.$and.push({
                    'staff.marketArea': marketArea,
                });
            }
            return Promise.all([
                db
                    .collection('orders')
                    .aggregate([
                    {
                        $match: query,
                    },
                    { $project: { _id: 1 } },
                    {
                        $sort: {
                            updatedAt: -1,
                        },
                    },
                    {
                        $skip: parseInt(limit) * parseInt(currentPage),
                    },
                    {
                        $limit: parseInt(limit),
                    },
                ])
                    .toArray()
                    .then(orders => {
                    const ordersWithProductsPromises = [];
                    orders.forEach(order => {
                        ordersWithProductsPromises.push((0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: order._id }).then(_order => {
                            return (0, AddUnitDiscounts_1.addUnitDiscountsToOrder)(_order);
                        }));
                    });
                    return Promise.all(ordersWithProductsPromises).then(orders => orders);
                }),
                db.collection('orders').countDocuments(query),
            ]).then(([orders, total]) => {
                return { orders, total };
            });
        });
    },
};
exports.default = getProductSales;
//# sourceMappingURL=getProductSales.js.map