"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startCheckout = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events: [
        //     startedOrder,
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = startCheckout;
//# sourceMappingURL=startCheckout.js.map