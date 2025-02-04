"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database }, { limit, currentPage, search }) {
        let query = {};
        if (search)
            query.name = { $regex: search, $options: 'i' };
        return $database.then(database => {
            const { db, countDocuments } = database;
            const _limit = parseInt(limit);
            const _currentPage = parseInt(currentPage) - 1;
            return Promise.all([
                db
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
                    .skip(_limit * _currentPage)
                    .limit(_limit)
                    .toArray(),
                countDocuments('staff', { filter: query }),
            ]).then(([staff, total]) => {
                return { staff, total };
            });
        });
    },
};
exports.default = list;
//# sourceMappingURL=list.js.map