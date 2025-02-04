"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shipOrder = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events: [
        //     orderShipped,
        //     shippingEmailQueued,
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = shipOrder;
//# sourceMappingURL=shipOrder.js.map