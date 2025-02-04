import { GalleryItem } from './GalleryItem';
import { IdService } from '../Id/index';
import { StorageService } from '../Storage';
import { WhpptDatabase } from '../Database';
export declare type UploadGaleryItemArgs = {
    file: any;
    domainId: string;
    type: string;
};
export declare type UploadGalleryItem = (args: UploadGaleryItemArgs) => Promise<GalleryItem>;
export declare type UploadGalleryItemContstructor = ($id: IdService, $database: Promise<WhpptDatabase>, $storage: StorageService) => UploadGalleryItem;
export declare const Upload: UploadGalleryItemContstructor;
