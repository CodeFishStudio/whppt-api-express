"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const middleware_1 = require("./middleware");
const Connection_1 = require("./Mongo/Connection");
const DatabaseService = (logger, id, hosting, config, adminDb) => {
    const connections = {};
    const getConnection = (apiKey) => {
        const configPromise = hosting.getConfiguredDatabase(apiKey);
        return configPromise.then(dbConfig => {
            const connectionKey = `${dbConfig.type}_${dbConfig.instance._id}`;
            if (connections[connectionKey])
                return Promise.resolve(connections[connectionKey]);
            switch (dbConfig.type) {
                case 'mongo':
                    return (0, Connection_1.MongoDatabaseConnection)(logger, id, dbConfig, config.runtime.collections).then(connection => {
                        return connection.getDatabase(configPromise).then(() => {
                            // TODO: hook up disconnection events so that we can remove the connection
                            connections[connectionKey] = connection;
                            return connection;
                        });
                    });
                default:
                    throw new Error('Database connection could not be created');
            }
        });
    };
    const middleware = (0, middleware_1.DatabaseMiddleware)(logger, getConnection, adminDb);
    return {
        adminDb,
        getConnection,
        middleware,
    };
};
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=index.js.map