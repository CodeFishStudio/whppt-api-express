"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongodb_1 = require("mongodb");
const { pick } = require('lodash');
const mongoUrl = process.env.MONGO_URL;
const db = process.env.MONGO_DB;
const pubDb = process.env.MONGO_DB_PUB;
/**
 * @deprecated use new database classes
 */
const Mongo = ({ $logger, $id }) => {
    if (!mongoUrl) {
        $logger.error('Mongo connection failed, missing URL ....');
        process.exit(1);
    }
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };
    return mongodb_1.MongoClient.connect(mongoUrl, options)
        .then(client => {
        if ($logger)
            $logger.info('Connected to mongo on:', mongoUrl);
        const $db = client.db(db);
        const $dbPub = client.db(pubDb);
        const $startTransaction = function (callback) {
            const transactionOptions = {
                readPreference: mongodb_1.ReadPreference.primary,
                readConcern: { level: 'local' },
                writeConcern: { w: 'majority' },
            };
            const session = client.startSession();
            let result;
            return session
                .withTransaction(() => {
                return callback(session).catch(error => {
                    $logger.error('An error occured when calling the database', error);
                    return Promise.reject({ error, status: 500 });
                });
            }, transactionOptions)
                .then(transactionResults => {
                if (transactionResults)
                    return Promise.resolve(result);
                $logger.error('An error caused the transaction to fail');
                return Promise.reject('An error caused the transaction to fail');
            })
                .finally(() => session.endSession());
        };
        const $list = function (collection, removed) {
            const cursor = $db.collection(collection);
            if (removed)
                return cursor.find().toArray();
            return cursor.find({ removed: { $ne: true } }).toArray();
        };
        const $fetch = function (collection, id) {
            return $db
                .collection(collection)
                .find({ _id: id })
                .toArray()
                .then(results => {
                if (!results.length)
                    throw new Error(`Could not find document for Id "${id}" in collection "${collection}"`);
                return results[0];
            });
        };
        const $save = function (collection, doc, { session } = {}) {
            doc = Object.assign(Object.assign({ _id: $id.newId() }, doc), { createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(), updatedAt: new Date() });
            return $db
                .collection(collection)
                .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
                .then(() => doc);
        };
        const $record = function (collection, action, doc, { session } = {}) {
            const historyCollection = collection + 'History';
            const { data, user } = doc;
            const record = {
                _id: $id.newId(),
                data,
                action,
                user: pick(user, [
                    '_id',
                    'username',
                    'email',
                    'firstName',
                    'lastName',
                    'roles',
                ]),
                date: new Date(),
            };
            return $db.collection(historyCollection).insertOne(record, { session });
        };
        const $remove = function (collection, id, { session } = {}) {
            return $db.collection(collection).updateOne({ _id: id }, {
                $set: {
                    removed: true,
                    removedAt: new Date(),
                },
            }, { session });
        };
        const $delete = function (collection, id, { session } = {}) {
            return $db
                .collection(collection)
                .deleteOne({ _id: id }, { session })
                .then(() => { });
        };
        const $publish = function (collection, doc, { session } = {}) {
            return $db
                .collection(collection)
                .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
                .then(() => {
                return $dbPub
                    .collection(collection)
                    .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
                    .then(() => doc);
            });
        };
        const $unpublish = function (collection, _id, { session } = {}) {
            return $db
                .collection(collection)
                .updateOne({ _id }, { $set: { published: false } }, { session })
                .then(() => {
                return $dbPub
                    .collection(collection)
                    .deleteOne({ _id }, { session })
                    .then(() => { });
            });
        };
        const devEnv = process.env.DRAFT === 'true' && !!process.env.MONGO_DB_PUB;
        return {
            $db,
            $dbPub,
            $list,
            $fetch,
            $save,
            $record,
            $publish,
            $unpublish,
            $remove,
            $delete,
            $startTransaction,
            ensureCollections: (collections) => Promise.all([
                createCollections($db, collections),
                devEnv ? createCollections($dbPub, collections) : Promise.resolve([]),
            ]).then(() => { }),
        };
    })
        .catch(err => {
        if ($logger) {
            $logger.error('Mongo Connection Failed ....');
            $logger.error(err);
        }
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    });
};
exports.Mongo = Mongo;
function createCollections(db, collections) {
    return db
        .listCollections()
        .toArray()
        .then(collectionsList => {
        const missingCollections = collections.filter(col => !collectionsList.find(cl => cl.name === col));
        if (!collectionsList.find(cl => cl.name === 'site'))
            missingCollections.push('site');
        if (!collectionsList.find(cl => cl.name === 'siteHistory'))
            missingCollections.push('siteHistory');
        return Promise.all(missingCollections.map(mc => db.createCollection(mc)));
    });
}
//# sourceMappingURL=index.js.map