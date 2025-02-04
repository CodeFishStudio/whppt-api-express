"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact = void 0;
const create_1 = __importDefault(require("./create"));
const canBeLinkedToMember_1 = __importDefault(require("./canBeLinkedToMember"));
const changeDetails_1 = __importDefault(require("./changeDetails"));
const changeBillingDetails_1 = __importDefault(require("./changeBillingDetails"));
const changeShippingDetails_1 = __importDefault(require("./changeShippingDetails"));
const checkEmailAvailability_1 = __importDefault(require("./checkEmailAvailability"));
const canBeLinkedToStaff_1 = __importDefault(require("./canBeLinkedToStaff"));
const search_1 = __importDefault(require("./search"));
exports.contact = {
    create: create_1.default,
    canBeLinkedToMember: canBeLinkedToMember_1.default,
    changeDetails: changeDetails_1.default,
    changeBillingDetails: changeBillingDetails_1.default,
    changeShippingDetails: changeShippingDetails_1.default,
    checkEmailAvailability: checkEmailAvailability_1.default,
    canBeLinkedToStaff: canBeLinkedToStaff_1.default,
    search: search_1.default,
};
//# sourceMappingURL=index.js.map