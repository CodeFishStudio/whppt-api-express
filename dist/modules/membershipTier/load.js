"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load = {
    exec({ $database }, { domainId }) {
        return $database.then(({ document }) => {
            return document
                .query('site', {
                filter: { _id: `membershipOptions_${domainId}` },
            })
                .then(membershipOptions => {
                return membershipOptions || {};
            });
        });
    },
};
exports.default = load;
//# sourceMappingURL=load.js.map