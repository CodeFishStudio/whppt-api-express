import { ClientSession, Db } from 'mongodb';
import { LoggerService } from '../Logger';
import { IdService } from '../Id';
import { WhpptConfig } from '../Config';
/**
 * @deprecated use new database classes
 */
export declare type WhpptMongoArgs = {
    $logger: LoggerService;
    $id: IdService;
    config: WhpptConfig;
};
/**
 * @deprecated use document.save
 */
export declare type MongoServiceSave = <T>(collection: string, doc: T, options?: {
    session?: ClientSession;
}) => Promise<T>;
/**
 * @deprecated use document.delete
 */
export declare type MongoServiceDelete = (collection: string, id: string, options?: {
    session?: ClientSession;
}) => Promise<any>;
/**
 * @deprecated use startTransaction
 */
export declare type MongoServiceStartTransaction = (callback: (session: ClientSession) => Promise<any>) => Promise<any>;
/**
 * @deprecated use database
 */
export declare type MongoService = {
    $db: Db;
    $dbPub: Db;
    $save: MongoServiceSave;
    $delete: MongoServiceDelete;
    $startTransaction: MongoServiceStartTransaction;
    $unpublish: (collection: string, _id: string, options?: {
        session?: ClientSession;
    }) => Promise<void>;
    ensureCollections: (collections: string[]) => Promise<void>;
};
/**
 * @deprecated use new database classes
 */
export declare type MongoServiceConstructor = (args: WhpptMongoArgs) => Promise<MongoService>;
/**
 * @deprecated use new database classes
 */
export declare const Mongo: MongoServiceConstructor;
