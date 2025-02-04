"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const SaveContact_1 = require("./Common/SaveContact");
const changeBillingDetails = {
    exec(context, { contactId, billing }) {
        const { $database, createEvent } = context;
        (0, assert_1.default)(contactId, 'Contact Id is required.');
        (0, assert_1.default)(billing.address, 'Address is required.');
        (0, assert_1.default)(billing.address.number, 'Address number is required.');
        (0, assert_1.default)(billing.address.street, 'Address street is required.');
        (0, assert_1.default)(billing.address.suburb, 'Address suburb is required.');
        (0, assert_1.default)(billing.address.state, 'Address state is required.');
        (0, assert_1.default)(billing.address.country, 'Address country is required.');
        (0, assert_1.default)(billing.address.postCode, 'Address postCode is required.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('contacts', contactId).then(contact => {
                (0, assert_1.default)(contact, 'Contact not found.');
                const event = createEvent('ContactBillingDetailsUpdated', {
                    contactId,
                    billing,
                    from: Object.assign({}, contact.billing),
                });
                (0, lodash_1.assign)(contact, {
                    billing: Object.assign(Object.assign({}, contact.billing), { address: billing.address, contactDetails: billing.contactDetails || {
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            company: contact.company,
                        } }),
                });
                return startTransaction(session => {
                    return (0, SaveContact_1.saveContactAndPublish)(Object.assign(Object.assign({}, context), { document }), { contact, events: [event] }, session);
                });
            });
        });
    },
};
exports.default = changeBillingDetails;
//# sourceMappingURL=changeBillingDetails.js.map