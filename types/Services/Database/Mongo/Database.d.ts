import { Db, MongoClient } from 'mongodb';
import { LoggerService } from '../../Logger';
import { WhpptDatabase } from '..';
import { IdService } from '../../Id/index';
export declare type WhpptMongoDatabase = WhpptDatabase & {
    client: MongoClient;
    db: Db;
    pubDb?: Db;
    /**
     * @deprecated avoid using db directly. If you need to use db.
     */
    $db: Db;
    /**
     * @deprecated avoid using dbPub directly. If you need to use pubDb.
     */
    $dbPub?: Db;
};
export declare type MongoDabaseFactory = (logger: LoggerService, id: IdService, client: MongoClient, db: Db, pubDb?: Db) => WhpptMongoDatabase;
export declare const WhpptMongoDatabase: MongoDabaseFactory;
