"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeDiscountCode = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events:[
        //     discountCodeRemovedFromOrder
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = removeDiscountCode;
//# sourceMappingURL=removeDiscountCode.js.map