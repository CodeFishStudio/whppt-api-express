"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const changeNote = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $database, createEvent }, { note, orderId }) {
        (0, assert_1.default)(orderId, 'Order Id is required.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('orders', orderId).then(loadedOrder => {
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                const events = [
                    createEvent('ChangedOrderNote', {
                        _id: loadedOrder._id,
                        note,
                        from: loadedOrder.note,
                    }),
                ];
                (0, lodash_1.assign)(loadedOrder, { note });
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, events, { session });
                });
            });
        });
    },
};
exports.default = changeNote;
//# sourceMappingURL=changeNote.js.map