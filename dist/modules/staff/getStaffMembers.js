"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secure_1 = require("./Secure");
const getStaffMembers = {
    exec({ $database }, { username }) {
        return $database.then(database => {
            const { db } = database;
            const query = username
                ? {
                    username,
                }
                : {};
            return db
                .collection('staff')
                .aggregate([
                {
                    $match: query,
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
                .toArray();
        });
    },
};
exports.default = (0, Secure_1.Secure)(getStaffMembers);
//# sourceMappingURL=getStaffMembers.js.map