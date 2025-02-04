"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadOrder_1 = require("./Queries/loadOrder");
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const markOrderAsPointOfSale = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderId, staffId }) {
        (0, assert_1.default)(orderId, 'An Order id is required');
        return context.$database.then(database => {
            const { document, startTransaction } = database;
            return (0, loadOrder_1.loadOrder)(context, orderId).then(loadedOrder => {
                return document
                    .query('staff', { filter: { _id: staffId } })
                    .then(staff => {
                    (0, assert_1.default)(loadedOrder, 'Order not found.');
                    if (!loadedOrder._id)
                        return Promise.reject({ status: 404, message: 'Order not found' });
                    (0, lodash_1.assign)(loadedOrder, Object.assign(Object.assign({}, loadedOrder), { fromPos: true, staff: {
                            _id: staff && staff._id,
                            username: staff && staff.username,
                            marketArea: staff && staff.marketArea,
                        } }));
                    const events = [context.createEvent('MarkedOrderAsPos', loadedOrder)];
                    return startTransaction(session => {
                        return document.saveWithEvents('orders', loadedOrder, events, { session });
                    });
                });
            });
        });
    },
};
exports.default = markOrderAsPointOfSale;
//# sourceMappingURL=markOrderAsPointOfSale.js.map