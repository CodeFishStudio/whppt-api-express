"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const getNewOrderNumber_1 = require("./Queries/getNewOrderNumber");
const createOrderWithMember = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $id, $database, createEvent }, { memberId, orderId, fromPos = false }) {
        (0, assert_1.default)(!orderId, 'Order Id is not required.');
        (0, assert_1.default)(memberId, 'A member id is required');
        return $database.then(database => {
            const { db, document, startTransaction } = database;
            return document.fetch('members', memberId || '').then(member => {
                return document
                    .fetch('contacts', member.contactId || '')
                    .then(contact => {
                    const order = {
                        _id: $id.newId(),
                        items: [],
                        checkoutStatus: 'pending',
                        memberId: memberId,
                        fromPos,
                        contact: {
                            _id: contact._id,
                            email: contact.email || '',
                        },
                    };
                    return startTransaction(session => {
                        return (0, getNewOrderNumber_1.getNewOrderNumber)(db).then(orderNumber => {
                            order.orderNumber = orderNumber;
                            const events = [
                                createEvent('CreatedOrder', order),
                                createEvent('AddedMemberToOrder', { memberId, orderId }),
                                createEvent('AddedContactToOrder', {
                                    contactId: contact._id,
                                    orderId,
                                }),
                            ];
                            return document.saveWithEvents('orders', order, events, { session });
                        });
                    }).then(() => order);
                });
            });
        });
    },
};
exports.default = createOrderWithMember;
//# sourceMappingURL=createOrderWithMember.js.map