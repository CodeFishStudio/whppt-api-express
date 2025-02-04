"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const editNote = {
    exec({ $database }, { memberId, noteId, note }) {
        (0, assert_1.default)(memberId, 'A contact Id is required');
        return $database.then(database => {
            const { document, startTransaction } = database;
            return document.fetch('members', memberId).then(loadedMember => {
                var _a;
                (0, assert_1.default)(loadedMember, 'Could not find member.');
                // const recordId = loadedMember._id; // Assuming _id is a property of the Member interface
                const noteIndex = (_a = loadedMember.notes) === null || _a === void 0 ? void 0 : _a.findIndex(note => note._id === noteId);
                if (noteIndex !== undefined && noteIndex !== -1) {
                    // Update the note content
                    if (loadedMember.notes) {
                        loadedMember.notes[noteIndex].note = note;
                    }
                    return startTransaction(session => {
                        return document.save('members', loadedMember, { session }).then(() => {
                            console.log(`Note with _id ${noteId} edited successfully.`);
                            return loadedMember;
                        });
                    });
                }
                else {
                    console.log(`Note with _id ${noteId} not found.`);
                    return loadedMember;
                }
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(editNote);
//# sourceMappingURL=editNote.js.map