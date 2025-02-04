"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const saveNote = {
    exec({ $database, $id, createEvent, staff }, { memberId, note }) {
        (0, assert_1.default)(memberId, 'A contact Id is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('members', memberId).then(loadedMember => {
                var _a, _b;
                (0, assert_1.default)(loadedMember, 'Could not find member.');
                const memberNote = {
                    _id: $id.newId(),
                    note,
                    date: new Date(),
                    //TODO add staff SECURE
                    author: {
                        _id: (_a = staff === null || staff === void 0 ? void 0 : staff.sub) === null || _a === void 0 ? void 0 : _a._id,
                        name: (_b = staff === null || staff === void 0 ? void 0 : staff.sub) === null || _b === void 0 ? void 0 : _b.username,
                    },
                };
                const memberEvents = [createEvent('AddedNoteToMember', { memberId, memberNote })];
                loadedMember.notes = loadedMember.notes
                    ? [...loadedMember.notes, memberNote]
                    : [memberNote];
                return startTransaction(session => {
                    return document.saveWithEvents('members', loadedMember, memberEvents, {
                        session,
                    });
                }).then(() => memberNote);
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(saveNote);
//# sourceMappingURL=saveNote.js.map