import { WhpptDatabase } from '../Database';
import { StorageService } from '../Storage';
export declare type FetchOriginalArgs = {
    itemId: string;
    type: string;
};
export declare type FetchOriginal = (args: FetchOriginalArgs) => Promise<any>;
export declare type FetchOriginalConstructor = ($database: Promise<WhpptDatabase>, $storage: StorageService) => FetchOriginal;
export declare const FetchOriginal: FetchOriginalConstructor;
