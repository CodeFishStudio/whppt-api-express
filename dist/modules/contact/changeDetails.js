"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const SaveContact_1 = require("./Common/SaveContact");
const ToggleSubscription_1 = require("./Common/ToggleSubscription");
const changeDetails = {
    exec(context, { firstName, lastName, phone, company, contactId, email, isSubscribed = true, mobile }) {
        (0, assert_1.default)(firstName, 'A First name is required');
        (0, assert_1.default)(lastName, 'A last name is required');
        const { $database, createEvent } = context;
        return $database.then(database => {
            const { document, startTransaction } = database;
            return Promise.all([
                document.fetch('contacts', contactId),
                document.query('contacts', {
                    filter: { email, _id: { $ne: contactId } },
                }),
            ]).then(([contact, emailInUse]) => {
                (0, assert_1.default)(contact, 'Unable to find Contact.');
                if (email)
                    (0, assert_1.default)(!emailInUse, 'Email already in use.');
                if (noChanges(contact, {
                    firstName,
                    lastName,
                    phone,
                    company,
                    email,
                    mobile,
                    isSubscribed,
                }))
                    return;
                const newDetails = {
                    firstName: firstName || contact.firstName,
                    lastName: lastName || contact.lastName,
                    phone: phone || contact.phone,
                    mobile: mobile || contact.mobile,
                    company: company || contact.company,
                    email: email || contact.email,
                };
                const contactEvents = [
                    createEvent('ContactDetailsChanged', Object.assign(Object.assign({ contactId: contact._id }, newDetails), { from: {
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phone: contact.phone,
                            mobile: contact.mobile,
                            company: contact.company,
                            email: contact.email,
                        } })),
                ];
                (0, lodash_1.assign)(contact, newDetails);
                return startTransaction(session => {
                    return (0, SaveContact_1.saveContactAndPublish)(Object.assign(Object.assign({}, context), { document }), { contact, events: contactEvents }, session).then(() => {
                        return (0, ToggleSubscription_1.ToggleSubscription)(Object.assign(Object.assign({}, context), { document }), { contact, isSubscribed }, session);
                    });
                });
            });
        });
    },
};
const noChanges = (contact, { firstName, lastName, phone, mobile, company, email, isSubscribed, }) => {
    return (contact.firstName === firstName &&
        contact.lastName === lastName &&
        contact.company === company &&
        contact.email === email &&
        contact.phone === phone &&
        contact.mobile === mobile &&
        contact.isSubscribed === isSubscribed);
};
exports.default = changeDetails;
//# sourceMappingURL=changeDetails.js.map