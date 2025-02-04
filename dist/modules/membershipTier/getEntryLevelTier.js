"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const getEntryLevelTier = {
    exec({ $database }, { domainId }) {
        return $database.then(({ document }) => {
            return document
                .query('site', {
                filter: { _id: `membershipOptions_${domainId}` },
            })
                .then(membershipOptions => {
                (0, assert_1.default)(membershipOptions, 'No tiers set up for this domain');
                const entryTier = membershipOptions === null || membershipOptions === void 0 ? void 0 : membershipOptions.membershipTiers.find(t => t.level === 1);
                (0, assert_1.default)(entryTier, 'No Entry tiers set up for this domain');
                return entryTier;
            });
        });
    },
};
exports.default = getEntryLevelTier;
//# sourceMappingURL=getEntryLevelTier.js.map