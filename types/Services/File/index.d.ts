import { WhpptConfig } from '../Config';
import { WhpptDatabase } from '../Database';
import { IdService } from '../Id';
import { StorageService } from '../Storage';
export declare type FileService = {
    upload: (file: any, description: any) => Promise<void>;
    remove: (fileId: string) => Promise<void>;
    fetchOriginal: ({ id }: {
        id: string;
    }) => Promise<any>;
};
export declare type FileServiceConstructor = ($id: IdService, $database: Promise<WhpptDatabase>, $storage: StorageService, config: WhpptConfig) => FileService;
/**
 * @deprecated use gallery
 */
export declare const File: FileServiceConstructor;
