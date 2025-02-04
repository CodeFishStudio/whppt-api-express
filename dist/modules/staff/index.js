"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staff = void 0;
const login_1 = __importDefault(require("./login"));
const getOrderFilters_1 = __importDefault(require("./getOrderFilters"));
const listOrders_1 = __importDefault(require("./listOrders"));
const createFromContact_1 = __importDefault(require("./createFromContact"));
const me_1 = __importDefault(require("./me"));
const list_1 = __importDefault(require("./list"));
const forgottenPassword_1 = __importDefault(require("./forgottenPassword"));
const resetPassword_1 = __importDefault(require("./resetPassword"));
const getMemberTier_1 = __importDefault(require("./getMemberTier"));
const save_1 = __importDefault(require("./save"));
const listSales_1 = __importDefault(require("./listSales"));
const getStaffMembers_1 = __importDefault(require("./getStaffMembers"));
const getXeroTrackingLists_1 = __importDefault(require("./getXeroTrackingLists"));
const getUnleashedTrackingDetails_1 = __importDefault(require("./getUnleashedTrackingDetails"));
const queryDoesMemberHaveSavedCards_1 = __importDefault(require("./queryDoesMemberHaveSavedCards"));
exports.staff = {
    login: login_1.default,
    getOrderFilters: getOrderFilters_1.default,
    listOrders: listOrders_1.default,
    list: list_1.default,
    createFromContact: createFromContact_1.default,
    me: me_1.default,
    forgottenPassword: forgottenPassword_1.default,
    resetPassword: resetPassword_1.default,
    getMemberTier: getMemberTier_1.default,
    save: save_1.default,
    listSales: listSales_1.default,
    getStaffMembers: getStaffMembers_1.default,
    getXeroTrackingLists: getXeroTrackingLists_1.default,
    getUnleashedTrackingDetails: getUnleashedTrackingDetails_1.default,
    queryDoesMemberHaveSavedCards: queryDoesMemberHaveSavedCards_1.default,
};
//# sourceMappingURL=index.js.map