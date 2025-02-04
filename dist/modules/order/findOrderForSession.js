"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const findOrderForSession = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderId, memberId }) {
        if (!orderId && !memberId)
            return Promise.resolve({});
        return findOrder(context, orderId, memberId).then(orderIdToQuery => {
            if (!orderIdToQuery)
                return {};
            return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderIdToQuery }).catch(err => {
                if (err.status === 404)
                    return {};
                throw err;
            });
        });
    },
};
const findOrder = (context, orderId, memberId) => {
    return context.$database.then(database => {
        const { document, db } = database;
        const _idQuery = { _id: orderId };
        const _memberIdQuery = {
            $or: [{ fromPos: { $exists: false } }, { fromPos: { $eq: false } }],
            checkoutStatus: 'pending',
            memberId,
        };
        return Promise.all([
            document.query('orders', { filter: _idQuery }),
            db.collection('orders').find(_memberIdQuery).sort({ updatedAt: -1 }).toArray(),
        ]).then(([mainOrder, memberOrders]) => {
            const _memberOrder = memberOrders.length && memberOrders[0];
            return mainOrder ? orderId : _memberOrder ? _memberOrder === null || _memberOrder === void 0 ? void 0 : _memberOrder._id : undefined;
        });
    });
};
exports.default = findOrderForSession;
//# sourceMappingURL=findOrderForSession.js.map