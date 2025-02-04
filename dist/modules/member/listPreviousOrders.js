"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const listPreviousOrders = {
    exec({ $database }, { memberId, currentPage, limit }) {
        (0, assert_1.default)(memberId, 'A memberId is required');
        const numLimit = Number(limit);
        const numCurrentPage = Number(currentPage);
        const query = { memberId, checkoutStatus: { $ne: 'pending' } };
        return $database.then(({ queryDocuments, countDocuments }) => {
            return Promise.all([
                queryDocuments('orders', {
                    filter: query,
                    sort: { updatedAt: -1 },
                    limit: numLimit,
                    skip: numLimit * numCurrentPage,
                }),
                countDocuments('orders', { filter: query }),
            ]).then(([orders, total]) => {
                return { orders, total };
            });
        });
    },
};
exports.default = listPreviousOrders;
//# sourceMappingURL=listPreviousOrders.js.map