"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
const createOrderWithProduct_1 = __importDefault(require("./createOrderWithProduct"));
const createOrderWithMember_1 = __importDefault(require("./createOrderWithMember"));
const changeOrderItemQuantity_1 = __importDefault(require("./changeOrderItemQuantity"));
const addGiftCard_1 = __importDefault(require("./addGiftCard"));
const removeGiftCard_1 = __importDefault(require("./removeGiftCard"));
const addDiscountCode_1 = __importDefault(require("./addDiscountCode"));
const removeDiscountCode_1 = __importDefault(require("./removeDiscountCode"));
const startCheckout_1 = __importDefault(require("./startCheckout"));
const confirmStripePayment_1 = __importDefault(require("./confirmStripePayment"));
const cancelOrder_1 = __importDefault(require("./cancelOrder"));
const prepareOrder_1 = __importDefault(require("./prepareOrder"));
const shipOrder_1 = __importDefault(require("./shipOrder"));
const findOrderForSession_1 = __importDefault(require("./findOrderForSession"));
const loadCart_1 = __importDefault(require("./loadCart"));
const removeOrderItem_1 = __importDefault(require("./removeOrderItem"));
const addOrderItem_1 = __importDefault(require("./addOrderItem"));
const recordContactInformation_1 = __importDefault(require("./recordContactInformation"));
const changeOrderShippingDetails_1 = __importDefault(require("./changeOrderShippingDetails"));
const changeOrderBilling_1 = __importDefault(require("./changeOrderBilling"));
const changeNote_1 = __importDefault(require("./changeNote"));
const addMember_1 = __importDefault(require("./addMember"));
const removeMember_1 = __importDefault(require("./removeMember"));
const refund_1 = __importDefault(require("./refund"));
const sendReceipt_1 = __importDefault(require("./sendReceipt"));
const refundViaCash_1 = __importDefault(require("./refundViaCash"));
const createAuspostShipment_1 = __importDefault(require("./createAuspostShipment"));
const getAusPostLabel_1 = __importDefault(require("./getAusPostLabel"));
const confirmCashPayment_1 = __importDefault(require("./confirmCashPayment"));
const markOrderAsPointOfSale_1 = __importDefault(require("./markOrderAsPointOfSale"));
const addGuestToOrder_1 = __importDefault(require("./addGuestToOrder"));
const setDiner_1 = __importDefault(require("./setDiner"));
const listReadyToDispatch_1 = __importDefault(require("./listReadyToDispatch"));
const dispatch_1 = __importDefault(require("./dispatch"));
const requestCall_1 = __importDefault(require("./requestCall"));
const getProductSales_1 = __importDefault(require("./getProductSales"));
const overrideShippingCost_1 = __importDefault(require("./overrideShippingCost"));
const changeItemPrice_1 = __importDefault(require("./changeItemPrice"));
const overrideTotalPrice_1 = __importDefault(require("./overrideTotalPrice"));
const cancelOverrideTotalPrice_1 = __importDefault(require("./cancelOverrideTotalPrice"));
const getOrderTotalWithDiscounts_1 = __importDefault(require("./getOrderTotalWithDiscounts"));
exports.order = {
    createOrderWithProduct: createOrderWithProduct_1.default,
    createOrderWithMember: createOrderWithMember_1.default,
    changeOrderItemQuantity: changeOrderItemQuantity_1.default,
    addGiftCard: addGiftCard_1.default,
    removeGiftCard: removeGiftCard_1.default,
    addDiscountCode: addDiscountCode_1.default,
    removeDiscountCode: removeDiscountCode_1.default,
    startCheckout: startCheckout_1.default,
    confirmStripePayment: confirmStripePayment_1.default,
    cancelOrder: cancelOrder_1.default,
    prepareOrder: prepareOrder_1.default,
    shipOrder: shipOrder_1.default,
    findOrderForSession: findOrderForSession_1.default,
    loadCart: loadCart_1.default,
    removeOrderItem: removeOrderItem_1.default,
    addOrderItem: addOrderItem_1.default,
    recordContactInformation: recordContactInformation_1.default,
    changeOrderShippingDetails: changeOrderShippingDetails_1.default,
    changeOrderBilling: changeOrderBilling_1.default,
    changeNote: changeNote_1.default,
    addMember: addMember_1.default,
    removeMember: removeMember_1.default,
    refund: refund_1.default,
    sendReceipt: sendReceipt_1.default,
    refundViaCash: refundViaCash_1.default,
    createAuspostShipment: createAuspostShipment_1.default,
    getAusPostLabel: getAusPostLabel_1.default,
    confirmCashPayment: confirmCashPayment_1.default,
    markOrderAsPointOfSale: markOrderAsPointOfSale_1.default,
    addGuestToOrder: addGuestToOrder_1.default,
    setDiner: setDiner_1.default,
    listReadyToDispatch: listReadyToDispatch_1.default,
    dispatch: dispatch_1.default,
    getProductSales: getProductSales_1.default,
    requestCall: requestCall_1.default,
    overrideShippingCost: overrideShippingCost_1.default,
    changeItemPrice: changeItemPrice_1.default,
    overrideTotalPrice: overrideTotalPrice_1.default,
    getOrderTotalWithDiscounts: getOrderTotalWithDiscounts_1.default,
    cancelOverrideTotalPrice: cancelOverrideTotalPrice_1.default,
};
//# sourceMappingURL=index.js.map