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
const lodash_1 = require("lodash");
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const emailReceipt_1 = require("../email/Templates/emailReceipt");
const validations = __importStar(require("./Validations"));
const UpdateProductQuantityAfterSale_1 = require("../product/Helpers/UpdateProductQuantityAfterSale");
const confirmStripePayment = {
    exec(context, { orderId, paymentIntent, domainId }) {
        (0, assert_1.default)(orderId, 'Order Id not found');
        (0, assert_1.default)(paymentIntent, 'Payment Intent not provided');
        return context.$database.then(({ document, startTransaction }) => {
            return document.fetch('orders', orderId).then(loadedOrder => {
                return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(orderWithProducts => {
                    var _a;
                    (0, assert_1.default)(loadedOrder, 'Order not found');
                    validations.canBeModified(loadedOrder);
                    (0, assert_1.default)(((_a = loadedOrder.stripe) === null || _a === void 0 ? void 0 : _a.intentId) === paymentIntent, 'Payment Intent Id doesnt not match');
                    (0, lodash_1.assign)(loadedOrder, Object.assign(Object.assign({}, loadedOrder), { stripe: Object.assign(Object.assign({}, loadedOrder.stripe), { status: 'paid', intentId: loadedOrder.stripe.intentId || paymentIntent, date: new Date() }), payment: Object.assign(Object.assign({}, loadedOrder.payment), { status: 'paid', date: new Date(), type: 'card' }), checkoutStatus: 'paid', items: orderWithProducts.items.map((item) => {
                            var _a, _b;
                            return (0, lodash_1.omit)(Object.assign(Object.assign({}, item), { purchasedPrice: item.overidedPrice || ((_a = item.product) === null || _a === void 0 ? void 0 : _a.price), originalPrice: (_b = item.product) === null || _b === void 0 ? void 0 : _b.price }), 'product');
                        }) }));
                    const events = [
                        context.createEvent('OrderPaymentConfirmedThroughStripe', {
                            _id: orderId,
                            paymentIntent,
                        }),
                        context.createEvent('ProductsConfirmedToOrder', {
                            _id: orderId,
                            items: loadedOrder.items,
                        }),
                    ];
                    //TODO add these events
                    //   events: [
                    //     giftCardUsed,
                    // ]
                    return startTransaction(session => {
                        return document.saveWithEvents('orders', loadedOrder, events, {
                            session,
                        });
                    })
                        .then(() => (0, UpdateProductQuantityAfterSale_1.updateProductQuantityAfterSale)(context, loadedOrder.items))
                        .then(() => {
                        var _a;
                        const email = (_a = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.contact) === null || _a === void 0 ? void 0 : _a.email;
                        if (!email)
                            return Promise.resolve();
                        const paidOrderWithProducts = Object.assign(Object.assign({}, loadedOrder), { items: loadedOrder.items.map(lo => {
                                const orderItem = orderWithProducts.items.find(i => i._id === lo._id);
                                return Object.assign(Object.assign({}, lo), { product: orderItem.product || {} });
                            }) });
                        return context.$email
                            .send({
                            to: email,
                            subject: `Hentley Farm receipt${paidOrderWithProducts.orderNumber || paidOrderWithProducts._id
                                ? ` for order #${paidOrderWithProducts.orderNumber || paidOrderWithProducts._id}`
                                : ''}`,
                            html: (0, emailReceipt_1.getOrderTemplate)(paidOrderWithProducts, domainId),
                        })
                            .catch(() => {
                            throw new Error('Confirmation email sending failed. Order was processed and paid for.');
                        });
                    });
                });
            });
        });
    },
};
exports.default = confirmStripePayment;
//# sourceMappingURL=confirmStripePayment.js.map