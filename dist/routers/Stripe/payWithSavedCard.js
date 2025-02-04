"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWithSavedCard = void 0;
const assert_1 = __importDefault(require("assert"));
const calculateTotal_1 = require("../../modules/order/Queries/calculateTotal");
const loadOrder_1 = require("../../modules/order/Queries/loadOrder");
const payWithSavedCard = ({ context, stripe }, { customerId, cardId, orderId, ageConfirmed, domainId }) => {
    (0, assert_1.default)(orderId, 'Order Id not provided');
    return (0, loadOrder_1.loadOrder)(context, orderId).then(order => {
        return (0, calculateTotal_1.calculateTotal)(context, { orderId, domainId, memberId: order.memberId }).then(({ shippingCost, total, subTotal, memberTotalDiscount, memberShippingDiscount, originalTotal, originalSubTotal, overrideTotalPrice, discountApplied, }) => {
            return stripe.paymentIntents
                .create({
                amount: Math.round(total),
                currency: 'aud',
                payment_method_types: ['card'],
                capture_method: 'automatic',
                customer: customerId,
                payment_method: cardId,
                setup_future_usage: 'off_session',
                confirm: true,
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
                            context.createEvent('OrderCreatedPaymentIntentForSavedCard', {
                                _id: order._id,
                                stripe: {
                                    intentId: intent.id,
                                    status: 'pending',
                                    amount: total,
                                    customerId,
                                    cardId,
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
                    .then(() => intent.id);
            });
        });
    });
};
exports.payWithSavedCard = payWithSavedCard;
//# sourceMappingURL=payWithSavedCard.js.map