import { Request, Response, NextFunction } from 'express';
import { Strategy } from 'passport';
import { IdService, LoggerService, HostingService, WhpptSecurityConfig } from '../..';
export declare type SecurityProviderOptions = {
    $id: IdService;
    $logger: LoggerService;
    $hosting: HostingService;
    config: WhpptSecurityConfig;
};
export declare type SecurityProvider = {
    init: () => Strategy;
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    createToken: <T>(apiKey: string, user: T) => Promise<string>;
};
export declare type SecurityProviderConstructor = (options: SecurityProviderOptions) => SecurityProvider;
