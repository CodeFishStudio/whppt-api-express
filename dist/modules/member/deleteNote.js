"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const deleteNote = {
    exec({ $database }, { memberId, noteId }) {
        (0, assert_1.default)(memberId, 'A contact Id is required');
        return $database.then(database => {
            const { document, db /*, startTransaction*/ } = database;
            return document.fetch('members', memberId).then(loadedMember => {
                (0, assert_1.default)(loadedMember, 'Could not find member.');
                const recordId = loadedMember._id; // Assuming _id is a property of the Member interface
                const noteToRemoveId = noteId; // Replace with the actual _id of the note to remove
                return db
                    .collection('members')
                    .updateOne({ _id: recordId }, { $pull: { notes: { _id: noteToRemoveId } } })
                    .then(result => {
                    if (result.modifiedCount === 1) {
                        console.log(`Note with _id ${noteToRemoveId} removed successfully.`);
                    }
                    else {
                        console.log(`Note with _id ${noteToRemoveId} not found.`);
                    }
                    return loadedMember;
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(deleteNote);
//# sourceMappingURL=deleteNote.js.map