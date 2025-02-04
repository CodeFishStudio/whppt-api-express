"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const publishAll = {
    authorise({ $roles }, { user }) {
        // TODO: Gallery Security
        const requiredRoles = [];
        return $roles.validate(user, [requiredRoles]);
    },
    exec({ $database }, { domainId }) {
        (0, assert_1.default)(domainId, 'Gallery requires a domain id');
        (0, assert_1.default)(domainId, 'Domain Id is required');
        return $database.then(database => {
            const { startTransaction, pubDb, db } = database;
            if (!pubDb)
                throw new Error('No Pub DB');
            return db
                .collection('gallery')
                .find({})
                .toArray()
                .then(items => {
                if (!(items && items.length))
                    return;
                return startTransaction(session => {
                    const promiseChain = items.reduce((prev, e) => {
                        return prev.then(() => pubDb
                            .collection('gallery')
                            .updateOne({ _id: e._id }, { $set: e }, { session, upsert: true }));
                    }, Promise.resolve());
                    return promiseChain.then(() => ({}));
                });
            });
        });
    },
};
exports.default = publishAll;
//# sourceMappingURL=publishAll.js.map