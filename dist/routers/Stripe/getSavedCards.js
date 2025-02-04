"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedCards = void 0;
const assert_1 = __importDefault(require("assert"));
const Queries_1 = require("./Queries");
const getSavedCards = ({ context, stripe }, { memberId }) => {
    (0, assert_1.default)(memberId, 'MemberId not provided');
    return (0, Queries_1.getStripCustomerIdFromMember)(context, stripe, memberId).then(customer => {
        return stripe.customers
            .listPaymentMethods(customer, { type: 'card' })
            .then((cards) => {
            return { customerId: customer, cards: cards.data };
        });
    });
};
exports.getSavedCards = getSavedCards;
//# sourceMappingURL=getSavedCards.js.map