"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const signUp = {
    exec(context, { address, email, firstName, lastName, password, termsAndConditions, contactId }) {
        (0, assert_1.default)(email, 'An email is required');
        (0, assert_1.default)(firstName, 'First Name is required');
        (0, assert_1.default)(lastName, 'Last Name is required');
        (0, assert_1.default)(password, 'Password is required');
        (0, assert_1.default)(termsAndConditions, 'Terms And Conditions must be accepted');
        const { $database, $id, createEvent, $security } = context;
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.query('contacts', { filter: { email } }).then(contact => {
                (0, assert_1.default)(!contact || contact._id === contactId, 'Contact already Exists');
                const newContact = {
                    _id: (contact === null || contact === void 0 ? void 0 : contact._id) || $id.newId(),
                    firstName,
                    lastName,
                    email,
                    shipping: { address },
                    billing: { address },
                    isSubscribed: true,
                };
                return $security.encrypt(password).then(hashedPassword => {
                    const member = {
                        _id: $id.newId(),
                        contactId: newContact._id,
                        password: hashedPassword,
                    };
                    const events = [
                        createEvent((contact === null || contact === void 0 ? void 0 : contact._id) ? 'ContactDetailsUpdated' : 'ContactCreated', newContact),
                    ];
                    if (!(contact === null || contact === void 0 ? void 0 : contact._id))
                        events.push(createEvent('ContactOptedInForMarketing', {
                            contactId: newContact._id,
                            isSubscribed: true,
                        }));
                    const memberEvents = [createEvent('MemberCreated', member)];
                    return startTransaction(session => {
                        return document
                            .saveWithEvents('contacts', newContact, events, { session })
                            .then(() => {
                            return document
                                .saveWithEvents('members', member, memberEvents, {
                                session,
                            })
                                .then(() => {
                                if (process.env.DRAFT !== 'true')
                                    return;
                                return document
                                    .publishWithEvents('contacts', newContact, events, {
                                    session,
                                })
                                    .then(() => {
                                    return document.publishWithEvents('members', member, memberEvents, {
                                        session,
                                    });
                                });
                            });
                        });
                    }).then(() => member);
                });
            });
        });
    },
};
exports.default = signUp;
//# sourceMappingURL=signUp.js.map