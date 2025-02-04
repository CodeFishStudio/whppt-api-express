"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const getNewOrderNumber_1 = require("./Queries/getNewOrderNumber");
const validations = __importStar(require("./Validations"));
const createOrderWithProduct = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $id, $database, createEvent }, { productId, quantity, orderId, fromPos = false, fromWebsite = false }) {
        (0, assert_1.default)(!orderId, 'Order Id is not required.');
        (0, assert_1.default)(productId, 'Product Id is required.');
        (0, assert_1.default)(quantity, 'Product quantity is required.');
        const quantityAsNumber = Number(quantity);
        (0, assert_1.default)(quantityAsNumber > 0, 'Product quantity must be higher than 0.');
        return $database.then(database => {
            const { db, document, startTransaction } = database;
            return document
                .query('products', { filter: { _id: productId } })
                .then(product => {
                (0, assert_1.default)(product, 'Product not found.');
                validations.productAvailbleForSale({ product, fromWebsite });
                const order = {
                    _id: $id.newId(),
                    items: [],
                    checkoutStatus: 'pending',
                    fromPos,
                };
                const events = [];
                const orderItem = { _id: $id.newId(), productId, quantity: quantityAsNumber };
                Object.assign(order.items, [orderItem]);
                return startTransaction(session => {
                    return (0, getNewOrderNumber_1.getNewOrderNumber)(db).then(orderNumber => {
                        order.orderNumber = orderNumber;
                        events.push(createEvent('CreatedOrder', order));
                        events.push(createEvent('OrderItemAddedToOrder', { _id: order._id, orderItem }));
                        return document.saveWithEvents('orders', order, events, { session });
                    });
                }).then(() => order);
            });
        });
    },
};
exports.default = createOrderWithProduct;
//# sourceMappingURL=createOrderWithProduct.js.map