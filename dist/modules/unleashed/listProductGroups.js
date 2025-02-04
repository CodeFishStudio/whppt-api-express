"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listProductGroups = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database }) {
        return $database.then(database => {
            const { db } = database;
            return db
                .collection('unleashed')
                .aggregate([
                {
                    $group: {
                        _id: '$ProductGroup.GroupName',
                        amount: {
                            $sum: 1,
                        },
                    },
                },
            ])
                .toArray();
        });
    },
};
exports.default = listProductGroups;
//# sourceMappingURL=listProductGroups.js.map