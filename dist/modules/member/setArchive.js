"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const setArchive = {
    exec({ $database, createEvent }, { memberId, isArchived }) {
        (0, assert_1.default)(memberId, 'A memberId is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('members', memberId).then(loadedMember => {
                (0, assert_1.default)(loadedMember, 'Could not find member.');
                const newArchiveState = isArchived;
                const memberEvents = [
                    createEvent('ArchiveMember', { memberId, newArchiveState }),
                ];
                loadedMember.isArchived = isArchived;
                return startTransaction(session => {
                    return document.saveWithEvents('members', loadedMember, memberEvents, {
                        session,
                    });
                }).then(() => loadedMember);
            });
        });
    },
};
//TODO add staff secure
exports.default = (0, Secure_1.Secure)(setArchive);
//# sourceMappingURL=setArchive.js.map