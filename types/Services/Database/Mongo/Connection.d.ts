import { MongoClient } from 'mongodb';
import { DatabaseHostingConfig } from '../../Hosting';
import { DatabaseConnection } from '..';
import { WhpptMongoDatabase } from './Database';
import { LoggerService } from '../../Logger';
import { IdService } from '../../Id';
export declare type MongoDatabaseConnection = DatabaseConnection & {
    _connection: MongoClient;
    getMongoDatabase(configPromise: Promise<DatabaseHostingConfig>): Promise<WhpptMongoDatabase>;
};
export declare type MongoDatabaseConnectionFactory = (logger: LoggerService, id: IdService, config: DatabaseHostingConfig, collections?: string[]) => Promise<MongoDatabaseConnection>;
export declare const MongoDatabaseConnection: MongoDatabaseConnectionFactory;
