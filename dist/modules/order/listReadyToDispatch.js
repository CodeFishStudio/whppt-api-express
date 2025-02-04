"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secure_1 = require("../staff/Secure");
const date_fns_1 = require("date-fns");
const listReadyToDispatch = {
    exec({ $database }, { currentPage = '1', size = '10' }) {
        return $database.then(database => {
            const { db } = database;
            const forteenDaysAgo = (0, date_fns_1.sub)(new Date(), {
                days: 14,
            });
            return Promise.all([
                db
                    .collection('orders')
                    .aggregate([
                    {
                        $match: {
                            checkoutStatus: 'paid',
                            'payment.status': 'paid',
                            'shipping.pickup': { $ne: true },
                            legacyOrder: { $exists: false },
                        },
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    'payment.date': { $gte: forteenDaysAgo },
                                    dispatchedStatus: { $ne: 'dispatched' },
                                },
                            ],
                        },
                    },
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m-%d', date: '$payment.date' } },
                            orders: {
                                $push: {
                                    _id: '$_id',
                                    date: '$payment.date',
                                    checkoutStatus: '$checkoutStatus',
                                    orderNumber: '$orderNumber',
                                    dispatchedStatus: '$dispatchedStatus',
                                    shipmentId: '$shipping.ausPost.shipmentId',
                                    payment: {
                                        amount: '$payment.amount',
                                    },
                                },
                            },
                        },
                    },
                    {
                        $sort: {
                            _id: -1,
                        },
                    },
                    {
                        $skip: parseInt(size) * parseInt(currentPage),
                    },
                    {
                        $limit: parseInt(size),
                    },
                ], { allowDiskUse: true })
                    .toArray(),
                db
                    .collection('orders')
                    .aggregate([
                    {
                        $match: {
                            checkoutStatus: 'paid',
                            'payment.status': 'paid',
                            'shipping.pickup': { $ne: true },
                            legacyOrder: { $exists: false },
                        },
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    'payment.date': { $gte: forteenDaysAgo },
                                    dispatchedStatus: { $ne: 'dispatched' },
                                },
                            ],
                        },
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: '%Y-%m-%d',
                                    date: '$payment.date',
                                },
                            },
                        },
                    },
                ], { allowDiskUse: true })
                    .toArray(),
            ]).then(([orders, total]) => {
                return { orders, total: total.length };
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(listReadyToDispatch);
//# sourceMappingURL=listReadyToDispatch.js.map