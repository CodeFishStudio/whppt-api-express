"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const createFromContact = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, $id, createEvent, $security }, { contactId, username, password, department, marketArea, xeroUser, xeroServiceGroup }) {
        (0, assert_1.default)(contactId, 'A contact Id is required');
        return $database.then(database => {
            return $security.encrypt(password).then(hashedPassword => {
                const { document, startTransaction } = database;
                return Promise.all([
                    document.query('contacts', { filter: { _id: contactId } }),
                    document.query('staff', { filter: { contactId } }),
                ]).then(([contact, alreadyAStaffMember]) => {
                    (0, assert_1.default)(contact, 'Could not find contact.');
                    (0, assert_1.default)(!alreadyAStaffMember, 'Contact is already a staff member.');
                    const staff = {
                        _id: $id.newId(),
                        contactId,
                        username,
                        department,
                        marketArea,
                        password: hashedPassword,
                        xeroUser,
                        xeroServiceGroup,
                    };
                    const staffEvents = [
                        createEvent('StaffMemberCreated', {
                            staffId: staff._id,
                            contactId,
                            username,
                            department,
                            marketArea,
                            xeroUser,
                            xeroServiceGroup,
                        }),
                    ];
                    return startTransaction(session => {
                        return document
                            .saveWithEvents('staff', staff, staffEvents, { session })
                            .then(() => {
                            return document.publishWithEvents('staff', staff, staffEvents, {
                                session,
                            });
                        });
                    }).then(() => staff);
                });
            });
        });
    },
};
exports.default = createFromContact;
//# sourceMappingURL=createFromContact.js.map