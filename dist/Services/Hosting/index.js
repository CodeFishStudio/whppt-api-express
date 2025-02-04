"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostingService = void 0;
const assert_1 = __importDefault(require("assert"));
const adminDbConfig_1 = require("./adminDbConfig");
const middleware_1 = require("./middleware");
const HostingService = (database) => {
    const middleware = (0, middleware_1.HostingMiddleware)();
    return {
        getConfig(apiKey) {
            if (apiKey === 'legacy') {
                return Promise.resolve().then(() => {
                    (0, assert_1.default)(process.env.MONGO_URL, 'MONGO_URL env variable is required');
                    (0, assert_1.default)(process.env.MONGO_DB, 'MONGO_DB env variable is required');
                    (0, assert_1.default)(process.env.MONGO_DB_PUB, 'MONGO_DB_PUB env variable is required');
                    (0, assert_1.default)(process.env.APP_KEY, 'APP_KEY env variable is required');
                    (0, assert_1.default)(process.env.JWT_AUDIENCE, 'JWT_AUDIENCE env variable is required');
                    (0, assert_1.default)(process.env.S3_BUCKET, 'S3_BUCKET env variable is required');
                    (0, assert_1.default)(process.env.S3_ACCESS_KEY_ID, 'S3_ACCESS_KEY_ID env variable is required');
                    (0, assert_1.default)(process.env.S3_SECRET_ACCESS_KEY, 'S3_SECRET_ACCESS_KEY env variable is required');
                    return {
                        apiKey: 'legacy',
                        database: {
                            type: 'mongo',
                            instance: {
                                _id: 'legacy',
                                url: process.env.MONGO_URL,
                            },
                            db: process.env.MONGO_DB,
                            pubDb: process.env.MONGO_DB_PUB,
                        },
                        security: { appKey: process.env.APP_KEY, audience: process.env.JWT_AUDIENCE },
                        storage: {
                            provider: 'aws',
                            aws: {
                                region: 'ap-southeast-2',
                                bucket: process.env.S3_BUCKET,
                                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                            },
                        },
                        email: {
                            region: process.env.EMAIL_AWS_REGION || '',
                            accessKeyId: process.env.EMAIL_AWS_ACCESS_KEYID || '',
                            secretAccessKey: process.env.EMAIL_AWS_SECRET_ACCESS_KEY || '',
                            fromAddress: process.env.EMAIL_FROM_ADDRESS || '',
                            feedbackAddress: process.env.EMAIL_FEEDBACK_ADDRESS || '',
                        },
                        ausPost: {
                            base_url: process.env.AUS_POST_BASE_URL || '',
                            account_number: process.env.AUS_POST_ACCOUNT_NUMBER || '',
                            authorization: process.env.AUS_POST_AUTH || '',
                            cookie: process.env.AUS_POST_COOKIE || '',
                        },
                        searchIndex: process.env.SEARCH_INDEX || '',
                        cors: [],
                    };
                });
            }
            return database.then(connection => {
                return connection
                    .getMongoDatabase(Promise.resolve(adminDbConfig_1.adminDbConfig))
                    .then(({ db: adminDb }) => {
                    return adminDb
                        .collection('hosting')
                        .findOne({ apiKey })
                        .then(config => {
                        if (!config)
                            throw new Error(`Database config not found for api key: ${apiKey}`);
                        // TODO: Support database types. Currently only support mongo instances
                        return adminDb
                            .collection('mongoInstances')
                            .findOne({ _id: config.database.instanceId })
                            .then(instance => {
                            if (!instance)
                                throw new Error(`Database instance not found for api key: ${apiKey}`);
                            return Object.assign(Object.assign({}, config), { database: Object.assign(Object.assign({}, config.database), { instance }) });
                        });
                    });
                });
            });
        },
        getConfiguredDatabase(apiKey) {
            return this.getConfig(apiKey).then(config => config.database);
        },
        middleware,
    };
};
exports.HostingService = HostingService;
//# sourceMappingURL=index.js.map