"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStripCustomerIdFromMember = void 0;
const assert_1 = __importDefault(require("assert"));
const getStripCustomerIdFromMember = ({ $database }, stripe, memberId) => {
    if (!memberId)
        return Promise.resolve();
    return $database.then(database => {
        const { db, document } = database;
        return getMemberContact(db, memberId).then(({ contact }) => {
            (0, assert_1.default)(contact, 'Member Contact Not Found.');
            if (contact.stripeCustomerId)
                return contact.stripeCustomerId;
            const name = `${contact.firstName} ${contact.lastName}`;
            return stripe.customers.create({ name }).then((customer) => {
                contact.stripeCustomerId = customer.id;
                return document.save('contacts', contact).then(() => {
                    return contact.stripeCustomerId;
                });
            });
        });
    });
};
exports.getStripCustomerIdFromMember = getStripCustomerIdFromMember;
const getMemberContact = (db, memberId) => {
    return db
        .collection('members')
        .aggregate([
        {
            $match: {
                _id: memberId,
            },
        },
        {
            $lookup: {
                from: 'contacts',
                localField: 'contactId',
                foreignField: '_id',
                as: 'contact',
            },
        },
        {
            $unwind: {
                path: '$contact',
            },
        },
        {
            $project: {
                _id: 1,
                contact: 1,
                stripeCustomerId: 1,
            },
        },
    ])
        .toArray()
        .then(members => {
        return members[0] || {};
    });
};
//# sourceMappingURL=getStripCustomerIdFromMember.js.map