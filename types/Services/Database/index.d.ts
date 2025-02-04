import { DomainEvent } from '../Events/CreateEvent';
import { DatabaseHostingConfig, HostingService } from '../Hosting';
import { IdService } from '../Id';
import { LoggerService } from '../Logger';
import { DatabaseMiddleware } from './middleware';
import { MongoDatabaseConnection } from './Mongo/Connection';
import { ConfigService } from '../Config';
export declare type DatabaseConnection = {
    getDatabase(configPromise: Promise<DatabaseHostingConfig>): Promise<WhpptDatabase>;
};
export declare type StartTransaction = (callback: (session: any) => Promise<any>) => Promise<any>;
export declare type DatabaseDocument = {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastPublished?: Date;
    published?: boolean;
    [field: string]: any;
};
export declare type FetchAllDocuments = <T extends DatabaseDocument>(collection: string, removed: boolean) => Promise<T[]>;
export declare type QueryDocuments = <T extends DatabaseDocument>(collection: string, query: {
    filter: {
        [key: string]: any;
    };
    projection?: {
        [key: string]: any;
    };
    limit?: number;
    skip?: number;
    sort?: {
        [key: string]: any;
    };
}, options?: {
    session?: any;
}) => Promise<T[]>;
export declare type CountDocuments = (collection: string, query: {
    filter: {
        [key: string]: any;
    };
}, options?: {
    session?: any;
}) => Promise<number>;
export declare type FetchDocument = <T extends DatabaseDocument>(collection: string, id: string) => Promise<T>;
export declare type QueryDocument = <T extends DatabaseDocument>(collection: string, query: {
    filter: {
        [key: string]: any;
    };
}) => Promise<T | null>;
export declare type SaveDocument = <T extends DatabaseDocument>(collection: string, doc: T, options?: {
    session?: any;
}) => Promise<T>;
export declare type QueryDistinct = (collection: string, query: {
    distinct: string;
}) => Promise<string[]>;
export declare type SaveDocumentWithEvents = <T extends DatabaseDocument>(collection: string, doc: T, events: DomainEvent[], options: {
    session: any;
}) => Promise<T>;
export declare type PublishDocumentWithEvents = <T extends DatabaseDocument>(collection: string, doc: T, events: DomainEvent[], options: {
    session: any;
}) => Promise<T>;
export declare type SaveDocumentToPubWithEvents = <T extends DatabaseDocument>(collection: string, doc: T, events: DomainEvent[], options: {
    session: any;
}) => Promise<T>;
export declare type RecordHistory = <T extends {
    data: DatabaseDocument;
    user: any;
}>(collection: string, action: string, value: T, options: {
    session?: any;
}) => Promise<void>;
export declare type RemoveDocument = (collection: string, id: string, options: {
    session?: any;
}) => Promise<void>;
export declare type DeleteDocument = (collection: string, id: string, options?: {
    session?: any;
}) => Promise<any>;
export declare type PublishDocument = (collection: string, doc: any, options: {
    session?: any;
}) => Promise<void>;
export declare type UnpublishDocument = (collection: string, _id: string, options?: {
    session?: any;
}) => Promise<void>;
export declare type EnsureCollections = (collections: string[]) => Promise<void>;
export declare type WhpptDatabase = {
    startTransaction: StartTransaction;
    fetchAllDocuments: FetchAllDocuments;
    queryDocuments: QueryDocuments;
    countDocuments: CountDocuments;
    queryDistinct: QueryDistinct;
    document: {
        fetch: FetchDocument;
        query: QueryDocument;
        save: SaveDocument;
        saveWithEvents: SaveDocumentWithEvents;
        recordHistory: RecordHistory;
        delete: DeleteDocument;
        remove: RemoveDocument;
        publish: PublishDocument;
        publishWithEvents: PublishDocumentWithEvents;
        unpublish: UnpublishDocument;
    };
    /**
     * @deprecated use startTransaction
     */
    $startTransaction: StartTransaction;
    /**
     * @deprecated use fetchAllDocuments
     */
    $list: FetchAllDocuments;
    /**
     * @deprecated use document.fetch
     */
    $fetch: FetchDocument;
    /**
     * @deprecated use document.save
     */
    $save: SaveDocument;
    /**
     * @deprecated use document.recordHistory
     */
    $record: RecordHistory;
    /**
     * @deprecated use document.delete
     */
    $delete: DeleteDocument;
    /**
     * @deprecated use document.remove
     */
    $remove: RemoveDocument;
    /**
     * @deprecated use document.publish
     */
    $publish: PublishDocument;
    /**
     * @deprecated use document.unpublish
     */
    $unpublish: UnpublishDocument;
    ensureCollections: (collections: string[]) => Promise<void>;
};
export declare type DatabaseServiceFactory = (logger: LoggerService, id: IdService, hosting: HostingService, config: ConfigService, adminDb: Promise<MongoDatabaseConnection>) => DatabaseService;
export declare type DatabaseService = {
    adminDb: Promise<MongoDatabaseConnection>;
    getConnection(apiKey: string): Promise<DatabaseConnection>;
    middleware: DatabaseMiddleware;
};
export declare const DatabaseService: DatabaseServiceFactory;
