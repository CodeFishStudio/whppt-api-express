"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("./Secure");
const queryMemberTier_1 = require("../order/Queries/queryMemberTier");
const authMember = {
    authorise(context) {
        if (context.member)
            return Promise.resolve(true);
        return Promise.reject({ status: 401, message: 'Not Authrozided' });
    },
    exec(context, { domainId }) {
        const { $database, member } = context;
        return $database.then(database => {
            (0, assert_1.default)(member.sub, 'Member Id required');
            const { db } = database;
            return db
                .collection('members')
                .aggregate([
                {
                    $match: {
                        _id: member.sub._id,
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
                const member = members[0];
                (0, assert_1.default)(member && member._id, 'Member not found.');
                if (!domainId)
                    return Object.assign(Object.assign({}, member), { memberTier: {} });
                return (0, queryMemberTier_1.queryMemberTier)(context, { memberId: member._id, domainId }).then(memberTier => {
                    return Object.assign(Object.assign({}, member), { memberTier });
                });
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(authMember);
//# sourceMappingURL=me.js.map