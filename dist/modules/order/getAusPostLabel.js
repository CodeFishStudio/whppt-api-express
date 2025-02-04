"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAusPostLabel = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec({ $auspost }, { labelRequestId }) {
        const { getLabel } = $auspost;
        return getLabel(labelRequestId);
    },
};
exports.default = getAusPostLabel;
//# sourceMappingURL=getAusPostLabel.js.map