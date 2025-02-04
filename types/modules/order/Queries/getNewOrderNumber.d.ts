import { Db } from 'mongodb';
export declare type QueryMemberTier = (database: Db) => Promise<string>;
export declare const getNewOrderNumber: QueryMemberTier;
