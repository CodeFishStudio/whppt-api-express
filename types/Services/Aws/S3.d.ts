import { HostingConfig } from '../Hosting';
import { StorageService } from '../Storage';
export declare type S3Constructor = ($hosting: Promise<HostingConfig>) => StorageService;
export declare const S3: S3Constructor;
