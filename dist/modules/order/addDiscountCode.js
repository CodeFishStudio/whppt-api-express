"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addDiscountCode = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        // events: [discountCodeAddedToOrder];
        return Promise.resolve({ status: 200 });
    },
};
exports.default = addDiscountCode;
//# sourceMappingURL=addDiscountCode.js.map