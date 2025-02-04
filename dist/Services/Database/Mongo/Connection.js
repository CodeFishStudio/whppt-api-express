"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabaseConnection = void 0;
const mongodb_1 = require("mongodb");
const assert_1 = __importDefault(require("assert"));
const Database_1 = require("./Database");
const MongoDatabaseConnection = (logger, id, config, collections) => {
    return Promise.resolve().then(() => {
        (0, assert_1.default)(config.instance.url, 'Mongo url is required');
        (0, assert_1.default)(config.db, 'Mongo database is required');
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        return mongodb_1.MongoClient.connect(config.instance.url, options)
            .then(mongoClient => {
            const getDatabase = (configPromise) => {
                return configPromise.then(config => {
                    const db = mongoClient.db(config.db);
                    const pubDb = config.pubDb ? mongoClient.db(config.pubDb) : undefined;
                    const database = (0, Database_1.WhpptMongoDatabase)(logger, id, mongoClient, db, pubDb);
                    const ensureCollectionsPromise = collections
                        ? database.ensureCollections(collections)
                        : Promise.resolve();
                    return ensureCollectionsPromise.then(() => database);
                });
            };
            const connection = {
                _connection: mongoClient,
                getDatabase,
                getMongoDatabase: getDatabase,
            };
            return connection;
        })
            .catch(err => {
            logger.error('Mongo Connection Failed ....');
            logger.error(err);
            throw err;
        });
    });
};
exports.MongoDatabaseConnection = MongoDatabaseConnection;
//# sourceMappingURL=Connection.js.map