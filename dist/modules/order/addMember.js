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
const addMember = {
    exec({ $database, createEvent }, { memberId, orderId }) {
        (0, assert_1.default)(memberId, 'A member id is required');
        (0, assert_1.default)(orderId, 'An Order id is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('orders', orderId).then(order => {
                validations.canBeModified(order);
                if (order.memberId === memberId)
                    return { memberId, contact: order.contact };
                (0, assert_1.default)(!order.memberId, 'A member has already been assigned to the order.');
                return document
                    .fetch('members', memberId || '')
                    .then(member => {
                    return document
                        .fetch('contacts', member.contactId || '')
                        .then(contact => {
                        var _a, _b;
                        const events = [
                            createEvent('AddedMemberToOrder', { memberId, orderId }),
                            createEvent('AddedContactToOrder', { contactId: contact._id, orderId }),
                        ];
                        order.memberId = memberId;
                        order.contact = {
                            _id: contact._id || ((_a = order === null || order === void 0 ? void 0 : order.contact) === null || _a === void 0 ? void 0 : _a._id),
                            email: contact.email || ((_b = order === null || order === void 0 ? void 0 : order.contact) === null || _b === void 0 ? void 0 : _b.email) || '',
                        };
                        return startTransaction(session => {
                            return document.saveWithEvents('orders', order, events, { session });
                        });
                    });
                })
                    .then(() => ({ memberId, contact: order.contact }));
            });
        });
    },
};
exports.default = addMember;
//# sourceMappingURL=addMember.js.map