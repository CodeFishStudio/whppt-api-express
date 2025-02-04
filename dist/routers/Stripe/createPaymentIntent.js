"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const assert_1 = __importDefault(require("assert"));
const calculateTotal_1 = require("../../modules/order/Queries/calculateTotal");
const loadOrder_1 = require("../../modules/order/Queries/loadOrder");
const Queries_1 = require("./Queries");
const createPaymentIntent = ({ context, stripe }, { cardType = 'card_present', orderId, saveCard, ageConfirmed, domainId }) => {
    (0, assert_1.default)(ageConfirmed, 'Must be over 18');
    (0, assert_1.default)(orderId, 'Order Id not provided');
    return (0, loadOrder_1.loadOrder)(context, orderId).then(order => {
        return (0, calculateTotal_1.calculateTotal)(context, { orderId, domainId, memberId: order.memberId }).then(({ shippingCost, total, subTotal, memberTotalDiscount, memberShippingDiscount, originalTotal, overrideTotalPrice, discountApplied, originalSubTotal, }) => {
            return (0, Queries_1.getStripCustomerIdFromMember)(context, stripe, order.memberId).then(customer => {
                return stripe.paymentIntents
                    .create({
                    amount: Math.round(total),
                    currency: 'aud',
                    payment_method_types: [cardType],
                    capture_method: cardType === 'card_present' ? 'manual' : 'automatic',
                    customer,
                    setup_future_usage: saveCard && customer ? 'off_session' : undefined,
                })
                    .then((intent) => {
                    return context.$database
                        .then(database => {
                        const { document, startTransaction } = database;
                        return startTransaction(session => {
                            Object.assign(order, {
                                stripe: { intentId: intent.id, status: 'pending', amount: total },
                                ageConfirmed,
                                shipping: Object.assign(Object.assign({}, order.shipping), { shippingCost }),
                                payment: {
                                    status: 'pending',
                                    amount: total,
                                    subTotal,
                                    memberTotalDiscount,
                                    memberShippingDiscount,
                                    shippingCost,
                                    originalTotal,
                                    overrideTotalPrice,
                                    discountApplied,
                                    originalSubTotal,
                                },
                            });
                            const events = [
                                context.createEvent('OrderShipingCalculated', {
                                    _id: order._id,
                                    shippingCost,
                                }),
                                context.createEvent('OrderCreatedPaymentIntent', {
                                    _id: order._id,
                                    stripe: {
                                        intentId: intent.id,
                                        status: 'pending',
                                        amount: total,
                                        originalTotal,
                                        overrideTotalPrice,
                                        discountApplied,
                                        originalSubTotal,
                                    },
                                    ageConfirmed,
                                }),
                            ];
                            return document.saveWithEvents('orders', order, events, {
                                session,
                            });
                        });
                    })
                        .then(() => {
                        return {
                            client_secret: intent.client_secret,
                            amount: total,
                            customer,
                        };
                    });
                });
            });
        });
    });
};
exports.createPaymentIntent = createPaymentIntent;
//# sourceMappingURL=createPaymentIntent.js.map