import { NextFunction, Request, Response } from 'express';
import type { WhpptSecurityConfig } from '../Config';
import type { IdService } from '../Id';
import type { LoggerService } from '../Logger';
import { HostingService } from '../Hosting';
export declare type SecurityServiceArgs = {
    $id: IdService;
    $logger: LoggerService;
    $hosting: HostingService;
    config: WhpptSecurityConfig;
};
export declare type SecurityService = {
    encrypt: (password: string) => Promise<string>;
    compare: (password: string, hash: string) => Promise<boolean>;
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    createToken: <T>(apiKey: string, user: T) => Promise<string>;
    generateAccessToken: (apiKey: string, userId: string, expiryInMinutes: number) => Promise<{
        token: string;
        tokenExpiry: Date;
        valid: boolean;
    }>;
};
export declare type SecurityServiceConstructor = (args: SecurityServiceArgs) => SecurityService;
export declare const Security: SecurityServiceConstructor;
