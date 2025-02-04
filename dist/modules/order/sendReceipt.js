"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const emailReceipt_1 = require("../email/Templates/emailReceipt");
const loadOrderWithProducts_1 = require("./Queries/loadOrderWithProducts");
const sendReceipt = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec(context, { orderId, email, domainId }) {
        return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(order => {
            (0, assert_1.default)(order._id, 'OrderId is required');
            (0, assert_1.default)(email, 'Email is required');
            return context.$email.send({
                to: email,
                subject: `Hentley Farm receipt${order.orderNumber || order._id
                    ? ` for order #${order.orderNumber || order._id}`
                    : ''}`,
                html: (0, emailReceipt_1.getOrderTemplate)(order, domainId),
            });
        });
    },
};
exports.default = sendReceipt;
//# sourceMappingURL=sendReceipt.js.map