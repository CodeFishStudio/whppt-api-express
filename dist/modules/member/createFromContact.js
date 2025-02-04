"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const ToggleSubscription_1 = require("../contact/Common/ToggleSubscription");
const createFromContact = {
    exec(context, { contactId, isSubscribed }) {
        (0, assert_1.default)(contactId, 'A contact Id is required');
        const { $database, $id, createEvent } = context;
        return $database.then(database => {
            const { document, startTransaction } = database;
            return Promise.all([
                document.query('contacts', { filter: { _id: contactId } }),
                document.query('members', { filter: { contactId } }),
            ]).then(([contact, alreadyAMember]) => {
                (0, assert_1.default)(contact, 'Could not find contact.');
                (0, assert_1.default)(!alreadyAMember, 'Contact is already a member.');
                const member = {
                    _id: $id.newId(),
                    contactId,
                };
                const memberEvents = [createEvent('MemberCreated', member)];
                return startTransaction(session => {
                    return document
                        .saveWithEvents('members', member, memberEvents, { session })
                        .then(() => {
                        return (0, ToggleSubscription_1.ToggleSubscription)(Object.assign(Object.assign({}, context), { document }), { contact, isSubscribed: isSubscribed || false }, session);
                    });
                }).then(() => member);
            });
        });
    },
};
exports.default = createFromContact;
//# sourceMappingURL=createFromContact.js.map