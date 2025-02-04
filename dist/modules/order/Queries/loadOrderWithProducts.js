"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOrderWithProducts = void 0;
const assert_1 = __importDefault(require("assert"));
const find_1 = __importDefault(require("lodash/find"));
const loadOrderWithProducts = ({ $database }, matchQuery) => {
    return $database.then(database => {
        (0, assert_1.default)(matchQuery, 'Match Query Required.');
        const { document, queryDocuments } = database;
        return document.query('orders', { filter: matchQuery }).then(order => {
            if (!order)
                return Promise.reject({ status: 404, message: 'Order Not Found.' });
            const productIds = order.items.map(i => i.productId);
            return queryDocuments('products', {
                filter: { _id: { $in: productIds } },
            }).then(products => {
                const _order = Object.assign(Object.assign({}, order), { items: order.items.map(i => {
                        const product = (0, find_1.default)(products, p => p._id === i.productId);
                        return Object.assign(Object.assign({}, i), { product });
                    }) });
                return _order;
            });
        });
    });
};
exports.loadOrderWithProducts = loadOrderWithProducts;
//# sourceMappingURL=loadOrderWithProducts.js.map