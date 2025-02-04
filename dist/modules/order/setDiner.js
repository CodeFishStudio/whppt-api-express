"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const Secure_1 = require("../staff/Secure");
const setDiner = {
    exec({ $database, createEvent }, { isDiner, orderId }) {
        (0, assert_1.default)(orderId, 'Order Id is required.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('orders', orderId).then(loadedOrder => {
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                const events = [
                    createEvent(isDiner ? 'OrderFlaggedAsDiner' : 'OrderFlaggedAsNonDiner', {
                        _id: loadedOrder._id,
                        isDiner,
                    }),
                ];
                (0, lodash_1.assign)(loadedOrder, { isDiner });
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, events, { session });
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(setDiner);
//# sourceMappingURL=setDiner.js.map