"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateTotal_1 = require("./Queries/calculateTotal");
const getOrderTotalWithDiscounts = {
    exec(context, { orderId, domainId, memberId }) {
        return (0, calculateTotal_1.calculateTotal)(context, {
            orderId,
            domainId,
            memberId,
        });
    },
};
exports.default = getOrderTotalWithDiscounts;
//# sourceMappingURL=getOrderTotalWithDiscounts.js.map