import { FetchImage } from './FetchImage';
import { FetchOriginal } from './FetchOriginal';
import { UploadGalleryItem } from './Upload';
import { IdService } from '../Id';
import { StorageService } from '../Storage';
import { WhpptDatabase } from '../Database';
export declare type GalleryService = {
    upload: UploadGalleryItem;
    fetchOriginal: FetchOriginal;
    fetchImage: FetchImage;
};
export declare type GalleryConstructor = ($id: IdService, $database: Promise<WhpptDatabase>, $storage: StorageService) => GalleryService;
export declare const Gallery: GalleryConstructor;
