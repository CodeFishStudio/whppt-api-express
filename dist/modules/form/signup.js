"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const signUp = {
    exec({ $database, $id, createEvent }, { name, email }) {
        (0, assert_1.default)(name, 'A name is required');
        (0, assert_1.default)(email, 'An email is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document
                .query('contacts', { filter: { email } })
                .then(usedEmail => {
                if (usedEmail && usedEmail.isSubscribed)
                    return;
                const events = [];
                let contact = {};
                if (!usedEmail) {
                    let firstName;
                    let lastName;
                    let splitName;
                    if (name.includes(' ')) {
                        splitName = name.split(' ');
                        firstName = splitName[0];
                        lastName = splitName[1];
                    }
                    else {
                        firstName = name;
                    }
                    contact = {
                        _id: $id.newId(),
                        firstName,
                        lastName,
                        email,
                        isSubscribed: true,
                    };
                    events.push(createEvent('ContactCreated', contact));
                    events.push(createEvent('ContactOptedInForMarketing', {
                        contactId: contact._id,
                        isSubscribed: true,
                    }));
                }
                else {
                    contact = usedEmail;
                    contact.isSubscribed = true;
                    events.push(createEvent('ContactOptedInForMarketing', {
                        contactId: contact._id,
                        isSubscribed: true,
                    }));
                }
                return startTransaction(session => {
                    return document
                        .saveWithEvents('contacts', contact, events, { session })
                        .then(() => {
                        if (process.env.DRAFT !== 'true')
                            return;
                        return document.publishWithEvents('contacts', contact, events, {
                            session,
                        });
                    });
                });
            });
        });
    },
};
exports.default = signUp;
//# sourceMappingURL=signup.js.map