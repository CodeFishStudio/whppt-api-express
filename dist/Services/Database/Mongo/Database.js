"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhpptMongoDatabase = void 0;
const assert_1 = __importDefault(require("assert"));
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const WhpptMongoDatabase = (logger, id, client, db, pubDb) => {
    const startTransaction = function (callback) {
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
                logger.error('An error occured when calling the database', error);
                return Promise.reject({ error, status: 500 });
            });
        }, transactionOptions)
            .then(transactionResults => {
            if (transactionResults)
                return Promise.resolve(result);
            logger.error('An error caused the transaction to fail');
            return Promise.reject('An error caused the transaction to fail');
        })
            .finally(() => session.endSession());
    };
    const fetchAllDocuments = (collection, showRemoved) => {
        const _collection = db.collection(collection);
        const query = showRemoved
            ? _collection.find({})
            : _collection.find({ removed: { $ne: true } });
        return query.toArray();
    };
    const fetchDocument = (collection, id) => {
        return db
            .collection(collection)
            .find({ _id: id })
            .toArray()
            .then(results => {
            if (!results.length)
                throw new Error(`Could not find document for Id "${id}" in collection "${collection}"`);
            return results[0];
        });
    };
    const queryDocument = (collection, query) => {
        return db.collection(collection).findOne(query.filter);
    };
    const queryDocuments = (collection, query, options = {}) => {
        let _query = db.collection(collection).find(query.filter, options);
        if (query.projection)
            _query = _query.project(query.projection);
        if (query.sort)
            _query = _query.sort(query.sort);
        if (query.limit)
            _query = _query.limit(query.limit);
        if (query.skip)
            _query = _query.skip(query.skip);
        return _query.toArray();
    };
    const queryDistinct = (collection, query) => {
        return db.collection(collection).distinct(query.distinct);
    };
    const countDocuments = (collection, query, options = {}) => {
        return db.collection(collection).countDocuments(query.filter, options);
    };
    const saveDocument = (collection, doc, { session } = {}) => {
        doc = Object.assign(Object.assign({}, doc), { _id: doc._id || id.newId(), createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(), updatedAt: new Date() });
        return db
            .collection(collection)
            .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
            .then(() => doc);
    };
    const saveWithEvents = (collection, doc, events, { session }) => {
        doc = Object.assign(Object.assign({}, doc), { _id: doc._id || id.newId(), createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(), updatedAt: new Date() });
        const eventCollection = collection + 'Events';
        return db
            .collection(collection)
            .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
            .then(() => db.collection(eventCollection).insertMany(events, { session }))
            .then(() => doc);
    };
    const recordHistory = (collection, action, value, { session } = {}) => {
        const historyCollection = collection + 'History';
        const { data, user } = value;
        const record = {
            _id: id.newId(),
            data,
            action,
            user: (0, lodash_1.pick)(user, ['_id', 'username', 'email', 'firstName', 'lastName', 'roles']),
            date: new Date(),
        };
        return db
            .collection(historyCollection)
            .insertOne(record, { session })
            .then(() => { });
    };
    const removeDocument = (collection, id, { session } = {}) => {
        return db
            .collection(collection)
            .updateOne({ _id: id }, {
            $set: {
                removed: true,
                removedAt: new Date(),
            },
        }, { session })
            .then(() => { });
    };
    const deleteDocument = (collection, id, { session } = {}) => {
        return db
            .collection(collection)
            .deleteOne({ _id: id }, { session })
            .then(() => { });
    };
    const publishDocument = (collection, doc, { session } = {}) => {
        (0, assert_1.default)(pubDb, 'Publish database is not configured');
        doc.lastPublished = new Date();
        doc.published = true;
        return db
            .collection(collection)
            .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
            .then(() => {
            return pubDb
                .collection(collection)
                .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
                .then(() => doc);
        });
    };
    const unpublishDocument = (collection, _id, { session } = {}) => {
        (0, assert_1.default)(pubDb, 'Publish database is not configured');
        return db
            .collection(collection)
            .updateOne({ _id }, { $set: { published: false } }, { session })
            .then(() => {
            return pubDb
                .collection(collection)
                .deleteOne({ _id }, { session })
                .then(() => { });
        });
    };
    const publishDocumentWithEvents = (collection, doc, events, { session }) => {
        (0, assert_1.default)(pubDb, 'Publish database is not configured');
        doc = Object.assign(Object.assign({}, doc), { _id: doc._id || id.newId(), createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(), updatedAt: new Date() });
        const eventCollection = collection + 'Events';
        return db
            .collection(collection)
            .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
            .then(() => {
            return pubDb
                .collection(collection)
                .updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true })
                .then(() => pubDb.collection(eventCollection).insertMany(events, { session }));
        })
            .then(() => doc);
    };
    //TODO: Performance: EnsureCollections. Do this for each configured db when the app starts or a new api key is created. For now its done on each request.
    const ensureCollections = (collections) => {
        return Promise.all([
            createCollections(db, collections),
            pubDb ? createCollections(pubDb, collections) : Promise.resolve(),
        ]).then(() => { });
    };
    const database = {
        client,
        db,
        pubDb,
        $db: db,
        $dbPub: pubDb,
        startTransaction,
        $list: fetchAllDocuments,
        fetchAllDocuments,
        ensureCollections,
        queryDocuments,
        countDocuments,
        queryDistinct,
        document: {
            fetch: fetchDocument,
            query: queryDocument,
            save: saveDocument,
            saveWithEvents: saveWithEvents,
            recordHistory,
            remove: removeDocument,
            delete: deleteDocument,
            publish: publishDocument,
            publishWithEvents: publishDocumentWithEvents,
            unpublish: unpublishDocument,
        },
        $startTransaction: startTransaction,
        $fetch: fetchDocument,
        $save: saveDocument,
        $record: recordHistory,
        $remove: removeDocument,
        $delete: deleteDocument,
        $publish: publishDocument,
        $unpublish: unpublishDocument,
    };
    return database;
};
exports.WhpptMongoDatabase = WhpptMongoDatabase;
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
//# sourceMappingURL=Database.js.map