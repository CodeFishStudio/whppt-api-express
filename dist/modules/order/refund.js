"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const Secure_1 = require("../staff/Secure");
const login_1 = require("../staff/login");
const stripe = require('stripe')(process.env.STRIPE_KEY);
const refund = {
    exec(context, { orderId, refundReason, username, password, incShipping = false }) {
        (0, assert_1.default)(orderId, 'Order Id not found');
        (0, assert_1.default)(refundReason, 'A Reason not provided');
        (0, assert_1.default)(username, 'A username or email address is required.');
        (0, assert_1.default)(password, 'A password is required.');
        return context.$database.then(db => {
            return (0, login_1.findActiveStaff)(db, username).then(staffMember => {
                return context.$security.encrypt(password).then(() => {
                    return context.$security
                        .compare(password, (staffMember === null || staffMember === void 0 ? void 0 : staffMember.password) || '')
                        .then(passwordMatches => {
                        if (!passwordMatches)
                            return Promise.reject(new Error("The password that you've entered is incorrect."));
                        return context.$database.then(({ document, startTransaction }) => {
                            return document.fetch('orders', orderId).then(loadedOrder => {
                                var _a, _b, _c, _d, _e;
                                (0, assert_1.default)(loadedOrder, 'Order not found');
                                (0, assert_1.default)(((_a = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.stripe) === null || _a === void 0 ? void 0 : _a.status) === 'paid', 'Order not in a paid status');
                                var amount = (((_b = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.payment) === null || _b === void 0 ? void 0 : _b.subTotal) || 0) -
                                    (((_c = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.payment) === null || _c === void 0 ? void 0 : _c.memberTotalDiscount) || 0);
                                if (incShipping) {
                                    amount += Number((_e = (_d = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.payment) === null || _d === void 0 ? void 0 : _d.shippingCost) === null || _e === void 0 ? void 0 : _e.price) || 0;
                                }
                                (0, lodash_1.assign)(loadedOrder, Object.assign(Object.assign({}, loadedOrder), { checkoutStatus: 'refunded', stripe: Object.assign(Object.assign({}, loadedOrder.stripe), { status: 'refunded', refund: {
                                            reason: refundReason,
                                            amount,
                                            by: {
                                                username: context.staff.sub.username,
                                                _id: context.staff.sub._id,
                                            },
                                        } }), payment: Object.assign(Object.assign({}, loadedOrder.payment), { status: 'refunded', refund: {
                                            amount,
                                            reason: refundReason,
                                            by: {
                                                username: context.staff.sub.username,
                                                _id: context.staff.sub._id,
                                            },
                                        } }) }));
                                const events = [
                                    context.createEvent('OrderPaymentRefundedThroughStripe', {
                                        _id: orderId,
                                        refundReason,
                                    }),
                                    context.createEvent('OrderPaymentRefunded', {
                                        _id: orderId,
                                        refundReason,
                                    }),
                                ];
                                return startTransaction(session => {
                                    var _a;
                                    return stripe.refunds
                                        .create({
                                        payment_intent: (_a = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.stripe) === null || _a === void 0 ? void 0 : _a.intentId,
                                        amount: Math.round(amount),
                                    })
                                        .then(() => {
                                        return document.saveWithEvents('orders', loadedOrder, events, {
                                            session,
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(refund);
//# sourceMappingURL=refund.js.map