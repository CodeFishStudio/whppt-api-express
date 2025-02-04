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
const lodash_1 = require("lodash");
const validations = __importStar(require("./Validations"));
const changeOrderBilling = {
    exec(context, { orderId, billing }) {
        const { $database, createEvent } = context;
        (0, assert_1.default)(orderId, 'Order Id is required.');
        (0, assert_1.default)(billing.address, 'Address is required.');
        (0, assert_1.default)(billing.address.number, 'Address number is required.');
        (0, assert_1.default)(billing.address.street, 'Address street is required.');
        (0, assert_1.default)(billing.address.suburb, 'Address suburb is required.');
        (0, assert_1.default)(billing.address.state, 'Address state is required.');
        (0, assert_1.default)(billing.address.country, 'Address country is required.');
        (0, assert_1.default)(billing.address.postCode, 'Address postCode is required.');
        return $database.then(({ document, startTransaction }) => {
            return document
                .query('orders', { filter: { _id: orderId } })
                .then(loadedOrder => {
                (0, assert_1.default)(loadedOrder, 'Order not found.');
                validations.canBeModified(loadedOrder);
                const event = createEvent('OrderBillingDetailsUpdated', {
                    orderId: loadedOrder._id,
                    billing,
                });
                (0, lodash_1.assign)(loadedOrder, { billing });
                return startTransaction(session => {
                    return document.saveWithEvents('orders', loadedOrder, [event], { session });
                });
            });
        });
    },
};
exports.default = changeOrderBilling;
//# sourceMappingURL=changeOrderBilling.js.map