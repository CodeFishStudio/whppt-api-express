"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getXeroTrackingLists = {
    authorise({ $roles }, { user }) {
        return Promise.resolve(!$roles.isGuest(user));
    },
    exec(context, __) {
        return context.$xero().getXeroTrackingDetails();
    },
};
exports.default = getXeroTrackingLists;
//# sourceMappingURL=getXeroTrackingLists.js.map