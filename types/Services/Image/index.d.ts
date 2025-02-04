import { WhpptConfig } from '../Config';
import { WhpptDatabase } from '../Database';
import { IdService } from '../Id';
import { StorageService } from '../Storage';
export declare type ImageService = {
    upload: (file: any) => Promise<any>;
    fetchOriginal: (args: {
        id: string;
    }) => Promise<any>;
    fetch: (args: {
        format: any;
        id: any;
        accept: string;
    }) => Promise<any>;
    remove: (id: string) => Promise<void>;
};
export declare type ImageServiceConstructor = ($id: IdService, $database: Promise<WhpptDatabase>, $storage: StorageService, config: WhpptConfig) => ImageService;
/**
 * @deprecated use gallery
 */
export declare const Image: ImageServiceConstructor;
