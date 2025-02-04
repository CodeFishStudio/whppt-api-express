import { MongoDatabaseConnection } from '../Database/Mongo/Connection';
import { HostingMiddleware } from './middleware';
export declare type HostedMongoInstance = {
    _id: string;
    url: string;
};
export declare type DatabaseHostingConfig = {
    type: 'mongo';
    instance: HostedMongoInstance;
    db: string;
    pubDb: string;
};
export declare type SecurityHostingConfig = {
    appKey: string;
    audience: string;
};
export declare type StorageHostingConfig = {
    provider: string;
    aws?: {
        region: string;
        bucket: string;
        accessKeyId: string;
        secretAccessKey: string;
    };
};
export declare type EmailHostingConfig = {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    fromAddress: string;
    feedbackAddress: string;
};
export declare type AusPostConfig = {
    base_url: string;
    account_number: string;
    authorization: string;
    cookie: string;
};
export declare type HostingConfig = {
    apiKey: string;
    searchIndex: string;
    database: DatabaseHostingConfig;
    security: SecurityHostingConfig;
    storage: StorageHostingConfig;
    email: EmailHostingConfig;
    ausPost: AusPostConfig;
    cors: string[];
};
export declare type HostingService = {
    getConfig(apiKey: string): Promise<HostingConfig>;
    getConfiguredDatabase(apiKey: string): Promise<DatabaseHostingConfig>;
    middleware: HostingMiddleware;
};
export declare const HostingService: (database: Promise<MongoDatabaseConnection>) => HostingService;
