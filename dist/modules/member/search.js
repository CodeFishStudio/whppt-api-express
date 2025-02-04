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
        //TODO make this a mongo search query
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
                {
                    $lookup: {
                        from: 'members',
                        localField: '_id',
                        foreignField: 'contactId',
                        as: 'member',
                    },
                },
                {
                    $unwind: {
                        path: '$member',
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            _id: '$member._id',
                            contactId: '$member.contactId',
                            username: '$member.username',
                            createdAt: '$member.createdAt',
                            isArchived: '$member.isArchived',
                            contact: {
                                _id: '$_id',
                                firstName: '$firstName',
                                lastName: '$lastName',
                                email: '$email',
                                phone: '$phone',
                                mobile: '$mobile',
                                company: '$company',
                                billing: '$billing',
                                shipping: '$shipping',
                                isSubscribed: '$isSubscribed',
                            },
                        },
                    },
                },
            ])
                .toArray();
        });
    },
};
exports.default = (0, Secure_1.Secure)(search);
//# sourceMappingURL=search.js.map