"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prepareOrder = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events: [
        //     orderPrepared,
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = prepareOrder;
//# sourceMappingURL=prepareOrder.js.map