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
const removeOrderItem = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $database, createEvent }, { orderItemId, orderId }) {
        (0, assert_1.default)(orderId, 'Order Id is required.');
        (0, assert_1.default)(orderItemId, 'Order Item Id is required.');
        return $database
            .then(({ document, startTransaction }) => {
            return document
                .query('orders', { filter: { _id: orderId } })
                .then(loadedOrder => {
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                validations.canBeModified(loadedOrder);
                validations.itemExists(loadedOrder, orderItemId);
                const events = [];
                loadedOrder.items = loadedOrder.items.filter(i => {
                    return i._id !== orderItemId;
                });
                events.push(createEvent('OrderItemRemovedFromOrder', {
                    _id: loadedOrder._id,
                    orderItemId,
                }));
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, events, { session });
                });
            });
        })
            .then(() => { });
    },
};
exports.default = removeOrderItem;
//# sourceMappingURL=removeOrderItem.js.map