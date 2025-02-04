"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadOrder_1 = require("./Queries/loadOrder");
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const CreateContact_1 = require("../contact/Common/CreateContact");
const addGuestToOrder = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderId }) {
        (0, assert_1.default)(orderId, 'An Order id is required');
        return (0, loadOrder_1.loadOrder)(context, orderId).then(loadedOrder => {
            (0, assert_1.default)(loadedOrder, 'Order not found.');
            return context.$database.then(database => {
                const { document } = database;
                return document
                    .query('contacts', { filter: { _id: 'unknown_guest' } })
                    .then(loadedContact => {
                    const guestContact = loadedContact || {
                        _id: 'unknown_guest',
                        name: 'Unknown Guest',
                        firstName: 'Unknown',
                        lastName: 'Guest',
                    };
                    (0, lodash_1.assign)(loadedOrder, Object.assign(Object.assign({}, loadedOrder), { contact: guestContact, memberId: undefined }));
                    const events = [context.createEvent('GuestAddedToOrder', { guestContact })];
                    return context.$database.then(database => {
                        const { document, startTransaction } = database;
                        return startTransaction(session => {
                            return document
                                .saveWithEvents('orders', loadedOrder, events, { session })
                                .then(() => {
                                if (loadedContact)
                                    return;
                                return (0, CreateContact_1.createContactAndPublish)(Object.assign(Object.assign({}, context), { document }), guestContact, session);
                            });
                        });
                    });
                });
            });
        });
    },
};
exports.default = addGuestToOrder;
//# sourceMappingURL=addGuestToOrder.js.map