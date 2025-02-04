"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const getNotes = {
    exec({ $database }, { memberId }) {
        (0, assert_1.default)(memberId, 'A memberId is required');
        return $database.then(({ queryDocuments }) => {
            return queryDocuments('members', {
                filter: { _id: memberId },
                limit: 1,
                projection: { notes: 1 },
            }).then(members => {
                const member = members && members[0];
                if (!member)
                    return Promise.reject({ status: 404, message: 'Member Not Found.' });
                return member.notes || [];
            });
        });
    },
};
//TODO add staff secure
exports.default = getNotes;
//# sourceMappingURL=getNotes.js.map