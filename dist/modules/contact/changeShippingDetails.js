"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const SaveContact_1 = require("./Common/SaveContact");
const changeShippingDetails = {
    exec(context, { contactId, shipping }) {
        const { $database, createEvent } = context;
        (0, assert_1.default)(contactId, 'Contact Id is required.');
        (0, assert_1.default)(shipping.address, 'Address is required.');
        (0, assert_1.default)(shipping.address.number, 'Address number is required.');
        (0, assert_1.default)(shipping.address.street, 'Address street is required.');
        (0, assert_1.default)(shipping.address.suburb, 'Address suburb is required.');
        (0, assert_1.default)(shipping.address.state, 'Address state is required.');
        (0, assert_1.default)(shipping.address.country, 'Address country is required.');
        (0, assert_1.default)(shipping.address.postCode, 'Address postCode is required.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('contacts', contactId).then(contact => {
                (0, assert_1.default)(contact, 'Contact not found.');
                const event = createEvent('ContactShippingDetailsUpdated', {
                    contactId,
                    shipping,
                    from: Object.assign({}, contact.shipping),
                });
                (0, lodash_1.assign)(contact, {
                    shipping: Object.assign(Object.assign({}, contact.shipping), { address: shipping.address, contactDetails: shipping.contactDetails || {
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            company: contact.company,
                        } }),
                });
                return startTransaction(session => {
                    return (0, SaveContact_1.saveContactAndPublish)(Object.assign(Object.assign({}, context), { document }), { contact, events: [event] }, session);
                    // return document.saveWithEvents('contacts', contact, [event], { session });
                });
            });
        });
    },
};
exports.default = changeShippingDetails;
//# sourceMappingURL=changeShippingDetails.js.map