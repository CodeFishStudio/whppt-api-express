"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCardOnContact = void 0;
const saveCardOnContact = (stripe, { paymentMethod, customerId }) => {
    return stripe.paymentMethods
        .attach(paymentMethod, { customer: customerId })
        .catch((err) => {
        if (err.raw.message ===
            'The payment method you provided has already been attached to a customer.')
            return;
        throw Error(err);
    });
};
exports.saveCardOnContact = saveCardOnContact;
//# sourceMappingURL=saveCardOnContact.js.map