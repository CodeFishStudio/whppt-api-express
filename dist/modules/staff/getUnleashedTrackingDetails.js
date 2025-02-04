"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUnleashedTrackingDetails = {
    authorise({ $roles }, { user }) {
        return Promise.resolve(!$roles.isGuest(user));
    },
    exec(context, __) {
        return context.$unleashed.$getTrackingDetails();
    },
};
exports.default = getUnleashedTrackingDetails;
//# sourceMappingURL=getUnleashedTrackingDetails.js.map