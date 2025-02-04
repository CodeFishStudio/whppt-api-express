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
const ToggleSubscription_1 = require("../contact/Common/ToggleSubscription");
const validations = __importStar(require("./Validations"));
const recordContactInformation = {
    exec(context, { orderId, contact }) {
        const { $database, createEvent } = context;
        (0, assert_1.default)(orderId, 'Order Id is required.');
        (0, assert_1.default)(contact.email, 'email is required.');
        return $database.then(({ document, startTransaction }) => {
            return document
                .query('orders', { filter: { _id: orderId } })
                .then(loadedOrder => {
                const _filter = contact._id ? { _id: contact._id } : { email: contact.email };
                return document
                    .query('contacts', { filter: _filter })
                    .then(loadedContact => {
                    (0, assert_1.default)(loadedOrder, 'Order not found.');
                    validations.canBeModified(loadedOrder);
                    if (detailsHaveNotChanged(loadedOrder, contact))
                        return;
                    const contactToUse = loadedContact
                        ? {
                            email: loadedContact.email,
                            firstName: loadedContact.firstName,
                            lastName: loadedContact.lastName,
                            _id: loadedContact._id,
                        }
                        : {
                            _id: context.$id.newId(),
                            firstName: (contact === null || contact === void 0 ? void 0 : contact.firstName) || 'Guest',
                            lastName: (contact === null || contact === void 0 ? void 0 : contact.lastName) || 'Website',
                            email: (contact === null || contact === void 0 ? void 0 : contact.email) || '',
                            isSubscribed: true,
                        };
                    const event = createEvent('OrderContactInformationUpdated', {
                        _id: loadedOrder._id,
                        contact: contactToUse,
                    });
                    (0, lodash_1.assign)(loadedOrder, Object.assign(Object.assign({}, loadedOrder), { contact: contactToUse }));
                    return startTransaction(session => {
                        return document
                            .saveWithEvents('orders', loadedOrder, [event], {
                            session,
                        })
                            .then(() => {
                            if (loadedContact === null || loadedContact === void 0 ? void 0 : loadedContact._id)
                                return (0, ToggleSubscription_1.ToggleSubscription)(Object.assign(Object.assign({}, context), { document }), {
                                    contact: contactToUse,
                                    isSubscribed: contact.isSubscribed,
                                }, session);
                            const contactEvents = [createEvent('ContactCreated', contactToUse)];
                            return document
                                .saveWithEvents('contacts', contactToUse, contactEvents, {
                                session,
                            })
                                .then(() => {
                                return (0, ToggleSubscription_1.ToggleSubscription)(Object.assign(Object.assign({}, context), { document }), {
                                    contact: contactToUse,
                                    isSubscribed: contact.isSubscribed,
                                }, session);
                            });
                        });
                    });
                });
            });
        });
    },
};
const detailsHaveNotChanged = (order, contact) => {
    var _a, _b;
    return ((_a = order.contact) === null || _a === void 0 ? void 0 : _a.email) === contact.email && ((_b = order.contact) === null || _b === void 0 ? void 0 : _b._id) === contact._id;
};
exports.default = recordContactInformation;
//# sourceMappingURL=recordContactInformation.js.map