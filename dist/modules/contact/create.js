"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const ToggleSubscription_1 = require("./Common/ToggleSubscription");
const create = {
    exec(context, { firstName, lastName, email, isSubscribed, phone, mobile, company }) {
        (0, assert_1.default)(email, 'An email is required');
        (0, assert_1.default)(firstName, 'A first name is required');
        (0, assert_1.default)(lastName, 'A last name is required');
        const { $database, $id, createEvent } = context;
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document
                .query('contacts', { filter: { email } })
                .then(usedEmail => {
                (0, assert_1.default)(!usedEmail, 'Email already in use.');
                const contact = {
                    _id: $id.newId(),
                    firstName,
                    lastName,
                    email,
                    phone,
                    mobile,
                    company,
                };
                const events = [createEvent('ContactCreated', contact)];
                return startTransaction(session => {
                    return document
                        .saveWithEvents('contacts', contact, events, { session })
                        .then(() => {
                        return (0, ToggleSubscription_1.ToggleSubscription)(Object.assign(Object.assign({}, context), { document }), { contact, isSubscribed }, session).then(() => {
                            if (process.env.DRAFT !== 'true')
                                return;
                            return document.publishWithEvents('contacts', contact, events, {
                                session,
                            });
                        });
                    });
                }).then(() => contact);
            });
        });
    },
};
exports.default = create;
//# sourceMappingURL=create.js.map