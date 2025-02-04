"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("./Secure");
const authMember = {
    authorise(context) {
        if (context.staff)
            return Promise.resolve(true);
        return Promise.reject({ status: 401, message: 'Not Authrozided' });
    },
    exec({ $database, staff }) {
        return $database.then(database => {
            (0, assert_1.default)(staff.sub, 'Staff Id required');
            const { db } = database;
            return db
                .collection('staff')
                .aggregate([
                {
                    $match: {
                        _id: staff.sub._id,
                    },
                },
                {
                    $lookup: {
                        from: 'contacts',
                        localField: 'contactId',
                        foreignField: '_id',
                        as: 'contact',
                    },
                },
                {
                    $unwind: {
                        path: '$contact',
                    },
                },
                {
                    $project: {
                        password: 0,
                    },
                },
            ])
                .toArray()
                .then(staffMembers => {
                (0, assert_1.default)(staffMembers.length, 'Staff Member not found.');
                return staffMembers[0];
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(authMember);
//# sourceMappingURL=me.js.map