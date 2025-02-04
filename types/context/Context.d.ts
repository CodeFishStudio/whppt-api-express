import { HostingConfig, IdService, LoggerService, SecurityService, StorageService, WhpptDatabase } from '../Services';
import { EventSessionFactory } from './events/Session';
import { GalleryService, MongoService, ImageService, FileService } from '../Services';
export declare type ContextType = {
    $id: IdService;
    $logger: LoggerService;
    $security: SecurityService;
    /**
     * @deprecated use $database
     */
    $mongo: MongoService;
    $database: Promise<WhpptDatabase>;
    $hosting: Promise<HostingConfig>;
    /**
     * @deprecated use $database
     */
    $aws: StorageService;
    $storage: StorageService;
    $image?: ImageService;
    $file?: FileService;
    $salesForce?: any;
    $unleashed?: any;
    $modules?: any;
    $pageTypes?: any;
    $fullUrl?: any;
    $sitemap?: any;
    $roles: {
        validate: (user: any, roles: any[]) => Promise<void>;
        isGuest: (user: any) => boolean;
    };
    $env?: any;
    $publishing?: any;
    $gallery?: GalleryService;
    EventSession: EventSessionFactory;
    useService: UseService;
    apiKey: string;
    [key: string]: any;
};
export declare type ContextService<T> = (context: ContextType) => T;
export declare type UseService = <T>(serviceName: string) => T | undefined;
export declare type ContextOptions = {
    disablePublishing?: boolean;
    onPublish?: (page: any) => void;
    onUnPublish?: (page: any) => void;
};
