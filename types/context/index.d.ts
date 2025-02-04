import { FileService, GalleryService, IdService, ImageService, LoggerService, ConfigService, SecurityService, WhpptDatabase, HostingConfig, StorageService, EmailServiceConstructor, AusPostService, XeroService } from '../Services';
declare const Context: ($id: IdService, $logger: LoggerService, $security: SecurityService, $database: Promise<WhpptDatabase>, $config: ConfigService, $hosting: Promise<HostingConfig>, $email: EmailServiceConstructor, $storage: StorageService, $gallery: GalleryService, $image: ImageService, $file: FileService, apiKey: string, $auspost: AusPostService, $xero: XeroService) => Promise<{
    $email: import("../Services").EmailService;
    $auspost: {
        createShipment: (args: {
            order: import("../modules/order/Models/Order").Order;
            shippingDetails: {
                firstName?: string | undefined;
                lastName?: string | undefined;
                number?: string | undefined;
                company?: string | undefined;
                street?: string | undefined;
                suburb?: string | undefined;
                postCode?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            };
            length: number;
            width: number;
            height: number;
            weight: number;
        }) => Promise<string>;
        getLabel: (labelRequestId: string) => Promise<{
            url: string;
            labelStatus: string;
        }>;
    };
    $id: IdService;
    $logger: LoggerService;
    $security: SecurityService;
    $mongo: import("../Services").MongoService;
    $database: Promise<WhpptDatabase>;
    $hosting: Promise<HostingConfig>;
    $aws: StorageService;
    $storage: StorageService;
    $image?: ImageService | undefined;
    $file?: FileService | undefined;
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
    $gallery?: GalleryService | undefined;
    EventSession: import("./events/Session").EventSessionFactory;
    useService: import("./Context").UseService;
    apiKey: string;
}>;
export default Context;
export { Context };
