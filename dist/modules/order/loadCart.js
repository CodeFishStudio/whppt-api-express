"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const loadCart = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderId }) {
        return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(order => {
            if (!order._id)
                return Promise.reject({ status: 404, message: 'Order not found' });
            return order;
        });
    },
};
exports.default = loadCart;
//# sourceMappingURL=loadCart.js.map