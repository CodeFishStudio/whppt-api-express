"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.member = void 0;
const createFromContact_1 = __importDefault(require("./createFromContact"));
const listPreviousOrders_1 = __importDefault(require("./listPreviousOrders"));
const login_1 = __importDefault(require("./login"));
const me_1 = __importDefault(require("./me"));
const showMemberInfo_1 = __importDefault(require("./showMemberInfo"));
const checkUsernameIsAvailable_1 = __importDefault(require("./checkUsernameIsAvailable"));
const changePassword_1 = __importDefault(require("./changePassword"));
const search_1 = __importDefault(require("./search"));
const getNotes_1 = __importDefault(require("./getNotes"));
const saveNote_1 = __importDefault(require("./saveNote"));
const editNote_1 = __importDefault(require("./editNote"));
const deleteNote_1 = __importDefault(require("./deleteNote"));
const forgottenPassword_1 = __importDefault(require("./forgottenPassword"));
const resetPassword_1 = __importDefault(require("./resetPassword"));
const signUp_1 = __importDefault(require("./signUp"));
const getMemberTier_1 = __importDefault(require("./getMemberTier"));
const overrideMemberTier_1 = __importDefault(require("./overrideMemberTier"));
const setArchive_1 = __importDefault(require("./setArchive"));
exports.member = {
    createFromContact: createFromContact_1.default,
    listPreviousOrders: listPreviousOrders_1.default,
    login: login_1.default,
    me: me_1.default,
    showMemberInfo: showMemberInfo_1.default,
    checkUsernameIsAvailable: checkUsernameIsAvailable_1.default,
    changePassword: changePassword_1.default,
    search: search_1.default,
    saveNote: saveNote_1.default,
    editNote: editNote_1.default,
    getNotes: getNotes_1.default,
    deleteNote: deleteNote_1.default,
    forgottenPassword: forgottenPassword_1.default,
    resetPassword: resetPassword_1.default,
    getMemberTier: getMemberTier_1.default,
    signUp: signUp_1.default,
    overrideMemberTier: overrideMemberTier_1.default,
    setArchive: setArchive_1.default,
};
//# sourceMappingURL=index.js.map