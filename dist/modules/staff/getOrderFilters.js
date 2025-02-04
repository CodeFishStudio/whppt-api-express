"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secure_1 = require("./Secure");
const listOrders = {
    exec({ $database }) {
        return $database.then(database => {
            const { db } = database;
            return db
                .collection('orders')
                .aggregate([
                {
                    $group: {
                        _id: '$checkoutStatus',
                        amount: {
                            $sum: 1,
                        },
                    },
                },
            ])
                .toArray()
                .then(statuses => {
                return {
                    statuses,
                };
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(listOrders);
//# sourceMappingURL=getOrderFilters.js.map