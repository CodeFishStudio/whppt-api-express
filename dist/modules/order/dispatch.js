"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const validations = __importStar(require("./Validations"));
const dispatch = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderIds, staffId }) {
        (0, assert_1.default)(orderIds.length, 'At least one order Id is required');
        return context.$database.then(database => {
            const { db, document, startTransaction } = database;
            return db
                .collection('orders')
                .aggregate([
                {
                    $match: { _id: { $in: orderIds }, dispatchedStatus: { $ne: 'dispatched' } },
                },
            ])
                .toArray()
                .then(orders => {
                if (!orders.length)
                    return Promise.resolve();
                orders.forEach(order => {
                    validations.hasBeenPaid(order);
                    order.dispatchedStatus = 'dispatched';
                });
                return startTransaction(session => {
                    const promiseChain = orders.reduce((prev, e) => {
                        return prev.then(() => {
                            const events = [
                                context.createEvent('OrderDispatched', {
                                    orderId: e._id,
                                    staffId,
                                }),
                            ];
                            return document.saveWithEvents('orders', e, events, { session });
                        });
                    }, Promise.resolve());
                    return promiseChain;
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(dispatch);
//# sourceMappingURL=dispatch.js.map