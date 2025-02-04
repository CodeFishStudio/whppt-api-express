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
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const Secure_1 = require("../staff/Secure");
const changeItemPrice = {
    exec(context, { orderItemId, overidedPrice, orderId }) {
        const { $database, createEvent } = context;
        (0, assert_1.default)(orderId, 'Order Id is required.');
        (0, assert_1.default)(orderItemId, 'Order Item Id is required.');
        (0, assert_1.default)(overidedPrice || overidedPrice === 0, 'Product Override price is required.');
        const overidedPriceAsNumber = Number(overidedPrice);
        (0, assert_1.default)(overidedPriceAsNumber >= 0, 'Product Price must be 0 or higher.');
        return $database
            .then(({ document, startTransaction }) => {
            return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(loadedOrder => {
                var _a;
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                validations.canBeModified(loadedOrder);
                validations.itemExists(loadedOrder, orderItemId);
                const productItem = loadedOrder.items.find(i => i._id === orderItemId);
                (0, assert_1.default)(productItem, 'Order Item not found on Order');
                const events = [];
                if (Number((_a = productItem === null || productItem === void 0 ? void 0 : productItem.product) === null || _a === void 0 ? void 0 : _a.price) === overidedPrice) {
                    if (productItem.overidedPrice === undefined)
                        return;
                    events.push(createEvent('OrderItemCanceledOveridedPrice', {
                        _id: loadedOrder._id,
                        productOrderId: productItem._id,
                        productId: productItem.productId,
                        overidedPrice,
                        previousQuantity: productItem.overidedPrice,
                    }));
                    productItem.overidedPrice = undefined;
                }
                else {
                    if (productItem.overidedPrice === overidedPrice)
                        return;
                    events.push(createEvent('OrderItemOveridedPrice', {
                        _id: loadedOrder._id,
                        productOrderId: productItem._id,
                        productId: productItem.productId,
                        overidedPrice,
                        previousQuantity: productItem.overidedPrice,
                    }));
                    productItem.overidedPrice = overidedPrice;
                }
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, events, {
                        session,
                    });
                });
            });
        })
            .then(() => { });
    },
};
exports.default = (0, Secure_1.Secure)(changeItemPrice);
//# sourceMappingURL=changeItemPrice.js.map