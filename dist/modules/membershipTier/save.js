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
    exec({ $database, createEvent }, { domainId, membershipOptions }) {
        (0, assert_1.default)(domainId, 'DomainId is required');
        (0, assert_1.default)(membershipOptions, 'Membership Options is required');
        return $database.then(({ document, startTransaction }) => {
            const events = [];
            membershipOptions._id = membershipOptions._id || `membershipOptions_${domainId}`;
            events.push(createEvent('MembershipOptionsSaved', {
                _id: membershipOptions._id,
                membershipOptions,
            }));
            return startTransaction(session => {
                return document
                    .saveWithEvents('site', membershipOptions, events, { session })
                    .then(() => {
                    return document.publishWithEvents('site', membershipOptions, events, {
                        session,
                    });
                });
            });
        });
    },
};
exports.default = exports.saveConfig;
//# sourceMappingURL=save.js.map