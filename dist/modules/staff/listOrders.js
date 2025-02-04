"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Secure_1 = require("./Secure");
const listOrders = {
    exec({ $database }, { search, dateFromYear, dateFromMonth, dateFromDay, dateToYear, dateToMonth, dateToDay, limit = '10', currentPage = '0', status, origin, }) {
        return $database.then(database => {
            const { db, queryDocuments } = database;
            const query = {
                _id: { $exists: true },
                checkoutStatus: status ? status : { $exists: true },
            };
            const querySecondPart = {};
            if (search && search !== 'undefined') {
                querySecondPart.$or = [
                    {
                        _id: {
                            $regex: search,
                        },
                    },
                    {
                        orderNumber: Number(search),
                    },
                    {
                        orderNumber: {
                            $regex: search,
                        },
                    },
                    {
                        'contact.email': {
                            $regex: search,
                        },
                    },
                ];
            }
            if (dateFromYear &&
                dateFromMonth &&
                dateFromDay &&
                dateToYear &&
                dateToMonth &&
                dateToDay) {
                querySecondPart.$and = [
                    {
                        'payment.date': {
                            $gte: new Date(dateFromYear, dateFromMonth, dateFromDay, 0, 0, 0, 0),
                        },
                    },
                    {
                        'payment.date': {
                            $lt: new Date(dateToYear, dateToMonth, dateToDay, 0, 0, 0, 0),
                        },
                    },
                ];
            }
            else {
                if (dateFromYear && dateFromMonth && dateFromDay) {
                    querySecondPart['payment.date'] = {
                        $gte: new Date(dateFromYear, dateFromMonth, dateFromDay, 0, 0, 0, 0),
                    };
                }
                if (dateToYear && dateToMonth && dateToDay) {
                    querySecondPart['payment.date'] = {
                        $lt: new Date(dateToYear, dateToMonth, dateToDay, 0, 0, 0, 0),
                    };
                }
            }
            //TODO Some reason unwind is limiting results/
            const queryOrder = [
                {
                    $match: query,
                },
            ];
            if (origin) {
                // queryOrder.push({ $match: { fromPos: { $exists: origin === 'pos' } } });
                if (origin === 'pos') {
                    queryOrder.push({ $match: { fromPos: true } });
                }
                else {
                    queryOrder.push({
                        $match: {
                            $or: [{ fromPos: { $exists: false } }, { fromPos: false }],
                        },
                    });
                }
            }
            if (!(0, lodash_1.isEmpty)(querySecondPart))
                queryOrder.push({ $match: querySecondPart });
            return Promise.all([
                db
                    .collection('orders')
                    .aggregate([
                    ...queryOrder,
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
                db
                    .collection('orders')
                    .aggregate([
                    ...queryOrder,
                    {
                        $project: {
                            _id: 1,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                        },
                    },
                ])
                    .toArray(),
                // db.collection('orders').countDocuments(query),
            ]).then(([orders, total = []]) => {
                const _total = total[0] ? total[0].count || 0 : 0;
                const contactIds = orders.map(o => { var _a; return (_a = o.contact) === null || _a === void 0 ? void 0 : _a._id; });
                return queryDocuments('contacts', {
                    filter: { _id: { $in: contactIds } },
                }).then(contacts => {
                    return {
                        orders: orders.map(order => {
                            var _a, _b, _c;
                            const _contactId = (_a = order === null || order === void 0 ? void 0 : order.contact) === null || _a === void 0 ? void 0 : _a._id;
                            const _contact = contacts.find(c => c._id === _contactId);
                            return Object.assign(Object.assign({}, order), { contact: {
                                    _id: (_b = order === null || order === void 0 ? void 0 : order.contact) === null || _b === void 0 ? void 0 : _b._id,
                                    firstName: _contact === null || _contact === void 0 ? void 0 : _contact.firstName,
                                    lastName: _contact === null || _contact === void 0 ? void 0 : _contact.lastName,
                                    email: (_c = order === null || order === void 0 ? void 0 : order.contact) === null || _c === void 0 ? void 0 : _c.email,
                                } });
                        }),
                        total: _total,
                    };
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(listOrders);
//# sourceMappingURL=listOrders.js.map