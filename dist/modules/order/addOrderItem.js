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
const validations = __importStar(require("./Validations"));
const addOrderItem = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $database, createEvent, $id }, { productId, orderId, quantity, fromWebsite = false, maxQuantity }) {
        (0, assert_1.default)(orderId, 'Order Id is required.');
        (0, assert_1.default)(productId, 'Product Id is required.');
        return $database
            .then(({ document, startTransaction }) => {
            return Promise.all([
                document.query('orders', { filter: { _id: orderId } }),
                document.query('products', { filter: { _id: productId } }),
            ]).then(([loadedOrder, product]) => {
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                (0, assert_1.default)(product, 'Product not found.');
                validations.canBeModified(loadedOrder);
                validations.productAvailbleForSale({ product, fromWebsite });
                (0, assert_1.default)(!loadedOrder.items.find(i => i.productId === productId), 'Product already on order.');
                const events = [];
                loadedOrder.items.push({ productId, quantity, _id: $id.newId(), maxQuantity });
                events.push(createEvent('OrderItemAddedToOrder', {
                    _id: loadedOrder._id,
                    productId,
                    quantity,
                }));
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, events, { session });
                });
            });
        })
            .then(() => { });
    },
};
exports.default = addOrderItem;
//# sourceMappingURL=addOrderItem.js.map