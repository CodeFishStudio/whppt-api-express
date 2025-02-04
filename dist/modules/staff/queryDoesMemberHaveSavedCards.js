"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe = require('stripe')(process.env.STRIPE_KEY);
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("./Secure");
const Queries_1 = require("../../routers/Stripe/Queries");
const queryDoesMemberHaveSavedCards = {
    exec(context, { memberId }) {
        (0, assert_1.default)(memberId, 'A memberId is required');
        return (0, Queries_1.getStripCustomerIdFromMember)(context, stripe, memberId).then(customer => {
            return stripe.customers
                .listPaymentMethods(customer, { type: 'card' })
                .then((cards) => {
                var _a;
                if (!((_a = cards === null || cards === void 0 ? void 0 : cards.data) === null || _a === void 0 ? void 0 : _a.length))
                    return { hasCards: false, cardStatus: 'expired' };
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
                const currentYear = currentDate.getFullYear();
                let cardStatus = 'expired';
                cards.data.forEach((details) => {
                    const cardMonth = details.card.exp_month;
                    const cardYear = details.card.exp_year;
                    if (cardYear < currentYear)
                        return;
                    if (cardYear > currentYear) {
                        cardStatus = 'current';
                        return;
                    }
                    if (cardMonth < currentMonth)
                        return;
                    cardStatus = 'current';
                });
                return { hasCards: true, cardStatus };
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(queryDoesMemberHaveSavedCards);
//# sourceMappingURL=queryDoesMemberHaveSavedCards.js.map