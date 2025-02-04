"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConfig = void 0;
const assert_1 = __importDefault(require("assert"));
exports.saveConfig = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { domainId, delivery }) {
        (0, assert_1.default)(domainId, 'DomainId is required');
        (0, assert_1.default)(delivery, 'Delivery is required');
        return $database.then(({ document, startTransaction }) => {
            const events = [];
            delivery._id = delivery._id || `delivery_${domainId}`;
            events.push(createEvent('DeliveryConfigSaved', { _id: delivery._id, delivery }));
            return startTransaction(session => {
                return document.saveWithEvents('site', delivery, events, { session }).then(() => {
                    return document.publishWithEvents('site', delivery, events, {
                        session,
                    });
                });
            });
        });
    },
};
exports.default = exports.saveConfig;
//# sourceMappingURL=save.js.map