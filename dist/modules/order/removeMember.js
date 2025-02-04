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
const validations = __importStar(require("./Validations"));
const removeMember = {
    exec({ $database, createEvent }, { orderId }) {
        (0, assert_1.default)(orderId, 'An Order id is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('orders', orderId).then(order => {
                if (!order.memberId)
                    return;
                validations.canBeModified(order);
                const events = [createEvent('RemovedMemberFromOrder', { orderId })];
                order.memberId = undefined;
                return startTransaction(session => {
                    return document.saveWithEvents('orders', order, events, { session });
                });
            });
        });
    },
};
exports.default = removeMember;
//# sourceMappingURL=removeMember.js.map