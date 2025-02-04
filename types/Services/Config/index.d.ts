import { PageType } from './PageType';
import { WhpptModule } from '../../modules/HttpModule';
import { LoggerService } from '../Logger';
import { ConfigMiddleware } from './middleware';
import { ContextService, ContextType } from '../../context/Context';
export * from './PageType';
export declare type WhpptSecurityConfig = {
    provider: string;
    jwt?: {
        issuer: string;
    };
};
export declare type WhpptConfig = {
    security: WhpptSecurityConfig;
    modules?: {
        [key: string]: WhpptModule;
    };
    collections?: string[];
    services?: {
        [name: string]: ContextService<any>;
    };
    pageTypes?: PageType[];
    disablePublishing?: boolean;
    onPublish?: (context: ContextType, page: any, collection: string) => void;
    onUnPublish?: (context: ContextType, page: any, collection: string) => void;
    routers?: {
        path: string;
        routerFactory: any;
    }[];
    /**
     * @deprecated this options should not be used. The various routers will use their own prefixes.
     */
    apiPrefix?: string;
};
export declare type RuntimeConfig = {
    collections: string[];
    pageTypes: PageType[];
    modules: {
        [key: string]: WhpptModule;
    };
    services: {
        [name: string]: ContextService<any>;
    };
    onPublish: (context: ContextType, page: any, collection: string) => void;
    onUnPublish: (context: ContextType, page: any, collection: string) => void;
};
export declare type ConfigServiceFactory = (logger: LoggerService, config: WhpptConfig) => ConfigService;
export declare type ConfigService = {
    runtime: RuntimeConfig;
    middleware: ConfigMiddleware;
};
export declare const ConfigService: ConfigServiceFactory;
