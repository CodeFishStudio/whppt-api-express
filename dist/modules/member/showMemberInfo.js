"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const memberInfo = {
    //TODO Work out what auth is needed
    // authorise(context) {
    //   if (context.member) return Promise.resolve(true);
    //   return Promise.reject({ status: 401, message: 'Not Authrozided' });
    // },
    exec({ $database }, { memberId }) {
        return $database.then(database => {
            (0, assert_1.default)(memberId, 'Member Id required');
            const { db } = database;
            return db
                .collection('members')
                .aggregate([
                {
                    $match: {
                        _id: memberId,
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
                        notes: 0,
                    },
                },
            ])
                .toArray()
                .then(members => {
                (0, assert_1.default)(members.length, 'Member not found.');
                return members[0];
            });
        });
    },
};
exports.default = memberInfo;
//# sourceMappingURL=showMemberInfo.js.map