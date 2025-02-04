"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productAvailbleForSale = exports.itemExists = exports.hasBeenPaid = exports.canBeModified = void 0;
const assert_1 = __importDefault(require("assert"));
const canBeModified = (order) => (0, assert_1.default)((order === null || order === void 0 ? void 0 : order.checkoutStatus) === 'pending' || (order === null || order === void 0 ? void 0 : order.checkoutStatus) === 'requestingACall', 'Only pending orders can be modified.');
exports.canBeModified = canBeModified;
const hasBeenPaid = (order) => {
    var _a;
    return (0, assert_1.default)((order === null || order === void 0 ? void 0 : order.checkoutStatus) === 'paid' && ((_a = order === null || order === void 0 ? void 0 : order.payment) === null || _a === void 0 ? void 0 : _a.status) === 'paid', `Order has not been paid for. ${order._id}`);
};
exports.hasBeenPaid = hasBeenPaid;
const itemExists = (order, orderItemId) => (0, assert_1.default)(order.items.filter(i => i._id === orderItemId), 'Order Item was not found on order.');
exports.itemExists = itemExists;
const productAvailbleForSale = ({ product, fromWebsite = false, }) => {
    (0, assert_1.default)(product.isActive, 'Product not available.');
    if (fromWebsite)
        (0, assert_1.default)(product.forSaleOnWebsite, 'Product not available.');
};
exports.productAvailbleForSale = productAvailbleForSale;
//# sourceMappingURL=index.js.map