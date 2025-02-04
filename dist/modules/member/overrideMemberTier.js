"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const overrideMemberTier = {
    exec({ $database, createEvent }, { domainId, membershipTierId, memberId }) {
        return $database.then(({ document, startTransaction }) => {
            return Promise.all([
                document.fetch('site', `membershipOptions_${domainId}`),
                document.fetch('members', memberId),
            ]).then(([membershipOptions, member]) => {
                (0, assert_1.default)(membershipOptions, 'Membership Tiers not set up');
                const foundTier = membershipOptions.membershipTiers.find(i => i._id === membershipTierId);
                member.lockToTier = foundTier ? membershipTierId : undefined;
                const memberEvents = [
                    foundTier
                        ? createEvent('MembersTierLocked', { _id: member._id, membershipTierId })
                        : createEvent('MembersTierUnlocked', { _id: member._id }),
                ];
                return startTransaction(session => {
                    return document.saveWithEvents('members', member, memberEvents, {
                        session,
                    });
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(overrideMemberTier);
//# sourceMappingURL=overrideMemberTier.js.map