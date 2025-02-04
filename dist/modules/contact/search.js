"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Secure_1 = require("../staff/Secure");
const search = {
    exec({ $database }, { searchBy }) {
        if (!searchBy)
            return Promise.resolve([]);
        const query = [
            {
                $or: [
                    { firstName: { $regex: searchBy, $options: 'i' } },
                    { lastName: { $regex: searchBy, $options: 'i' } },
                    {
                        $and: [
                            { firstName: { $regex: searchBy.split(' ')[0], $options: 'i' } },
                            { lastName: { $regex: searchBy.split(' ')[1] || '', $options: 'i' } },
                        ],
                    },
                    { email: { $regex: searchBy, $options: 'i' } },
                    { _id: searchBy },
                ],
            },
        ];
        return $database.then(database => {
            const { db } = database;
            return db
                .collection('contacts')
                .aggregate([
                {
                    $match: {
                        $or: query,
                    },
                },
                {
                    $limit: 50,
                },
            ])
                .toArray();
        });
    },
};
exports.default = (0, Secure_1.Secure)(search);
//# sourceMappingURL=search.js.map