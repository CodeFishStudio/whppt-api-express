"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePaymentIntent = void 0;
const assert_1 = __importDefault(require("assert"));
const confirmStripePayment_1 = __importDefault(require("../../modules/order/confirmStripePayment"));
const capturePaymentIntent = ({ context, stripe }, { paymentId, orderId, domainId }) => {
    (0, assert_1.default)(orderId, 'Order Id not provided');
    (0, assert_1.default)(paymentId, 'Payment Id not provided');
    return stripe.paymentIntents.capture(paymentId).then(() => {
        return confirmStripePayment_1.default.exec(context, {
            paymentIntent: paymentId,
            orderId,
            domainId,
        });
    });
};
exports.capturePaymentIntent = capturePaymentIntent;
//# sourceMappingURL=capturePaymentIntent.js.map