"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const save = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { _id, contactId, department, firstName, lastName, isActive, marketArea, xeroUser, xeroServiceGroup, unleashedServiceGroup, unleashedUser, }) {
        (0, assert_1.default)(_id, 'A Staff Id is required');
        (0, assert_1.default)(contactId, 'A contact Id is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return Promise.all([
                document.query('contacts', { filter: { _id: contactId } }),
                document.query('staff', { filter: { _id } }),
            ]).then(([contact, staffMember]) => {
                (0, assert_1.default)(contact, 'Could not find contact.');
                (0, assert_1.default)(staffMember, 'Could not find staffMember.');
                staffMember.isActive = isActive;
                staffMember.department = department;
                staffMember.marketArea = marketArea;
                staffMember.xeroUser = xeroUser;
                staffMember.unleashedServiceGroup = unleashedServiceGroup;
                staffMember.unleashedUser = unleashedUser;
                staffMember.xeroServiceGroup = xeroServiceGroup;
                contact.firstName = firstName;
                contact.lastName = lastName;
                const staffEvents = [
                    createEvent('StaffMemberDetailsChanged', {
                        staffId: staffMember._id,
                        staffMember,
                    }),
                ];
                const contactEvents = [
                    createEvent('ContactDetailsChanged', {
                        contactId: contact._id,
                        firstName,
                        lastName,
                        phone: contact.phone,
                        company: contact.company,
                        email: contact.email,
                        from: {
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phone: contact.phone,
                            company: contact.company,
                            email: contact.email,
                        },
                    }),
                ];
                return startTransaction(session => {
                    return document
                        .saveWithEvents('staff', staffMember, staffEvents, { session })
                        .then(() => document.publishWithEvents('staff', staffMember, staffEvents, { session }))
                        .then(() => document.saveWithEvents('contacts', contact, contactEvents, { session }))
                        .then(() => document.publishWithEvents('contacts', contact, contactEvents, { session }));
                }).then(() => staffMember);
            });
        });
    },
};
exports.default = save;
//# sourceMappingURL=save.js.map