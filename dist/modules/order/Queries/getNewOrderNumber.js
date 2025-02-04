"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewOrderNumber = void 0;
const assert_1 = __importDefault(require("assert"));
const getNewOrderNumber = db => {
    return db
        .collection('counters')
        .findOneAndUpdate({ _id: 'order_count' }, { $inc: { sequence_value: 1 } }, { returnDocument: 'after' })
        .then(({ value }) => {
        (0, assert_1.default)(value === null || value === void 0 ? void 0 : value.sequence_value, 'Something went wrong getting new order number');
        return value.sequence_value;
    });
};
exports.getNewOrderNumber = getNewOrderNumber;
//# sourceMappingURL=getNewOrderNumber.js.map