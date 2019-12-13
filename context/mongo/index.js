const MongoClient = require('mongodb').MongoClient;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017?retryWrites=false&replicaSet=rs';
const _db = process.env.MONGO_DB || 'dev_sam';

module.exports = ({ $logger }) => {
  const $mongo = MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(client => {
      const $db = client.db(_db);

      const $startTransaction = function(callback) {
        const session = client.startSession();
        return session.withTransaction(() => callback(session));
      };

      const $fetch = function(collection, id) {
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

      const $save = function(collection, doc, { session } = {}) {
        return $db.collection(collection).updateOne({ _id: doc._id }, { $set: doc }, { session, upsert: true });
      };

      const $remove = function(collection, id, { session } = {}) {
        return $db.collection(collection).updateOne({ _id: id }, { $set: { removed: true } }, { session });
      };

      const $delete = function(collection, id, { session } = {}) {
        return $db.collection(collection).deleteOne({ _id: id }, { session });
      };

      return {
        client,
        $db,
        $fetch,
        $save,
        $remove,
        $delete,
        $startTransaction,
      };
    })
    .catch(err => {
      $logger.error('Mongo Connection Failed ....');
      $logger.error(err);
      process.exit(1);
    });

  return $mongo;
};
