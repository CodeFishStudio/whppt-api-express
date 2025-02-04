"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvRouter = void 0;
const express_1 = require("express");
const csv = __importStar(require("fast-csv"));
const loadOrderWithProducts_1 = require("../../modules/order/Queries/loadOrderWithProducts");
const AddUnitDiscounts_1 = require("../../modules/order/Helpers/AddUnitDiscounts");
const router = (0, express_1.Router)();
const CsvRouter = (apiPrefix) => {
    router.get(`/${apiPrefix}/csv/productSales`, (req, res) => {
        return req.moduleContext
            .then(context => {
            return context.$database.then(database => {
                const { db } = database;
                const { dateFromYear, dateFromMonth, dateFromDay, dateToYear, dateToMonth, dateToDay, origin, marketArea, customerId, } = req.query;
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
                return db
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
                })
                    .then(orders => {
                    const headers = [
                        'CODE',
                        'PRODUCT NAME',
                        'PRICE',
                        'TOTAL DISCOUNT %',
                        '# SOLD',
                        'REVENUE(S)',
                        'SOURCE',
                        'DINER',
                        'ORDER #',
                        'DISPATCH',
                        'SHIPPING PRICE',
                    ];
                    res.setHeader('Content-disposition', 'attachment; filename=Product-sales.csv');
                    res.type('Content-Type', 'text/csv');
                    const csvStream = csv.format({ headers });
                    orders.forEach((order) => {
                        order.items.forEach((item) => {
                            var _a, _b, _c;
                            csvStream.write([
                                (_a = item.product) === null || _a === void 0 ? void 0 : _a.productCode,
                                (_b = item.product) === null || _b === void 0 ? void 0 : _b.name,
                                item.originalPrice / 100,
                                item.totalDiscountApplied,
                                item.quantity,
                                item.revenue / 100,
                                order.fromPos ? 'POS' : 'Web',
                                order.isDiner ? 'Yes' : 'No',
                                order.orderNumber || order._id,
                                ((_c = order.shipping) === null || _c === void 0 ? void 0 : _c.pickup) ? 'No' : 'Yes',
                                item.shippingCostPrice / 100,
                            ]);
                        });
                    });
                    csvStream.end();
                    csvStream.pipe(res);
                });
            });
        })
            .catch(err => {
            console.log('🚀  err csv:', err);
            return res.status(500).send(err);
        });
    });
    return router;
};
exports.CsvRouter = CsvRouter;
//# sourceMappingURL=index.js.map