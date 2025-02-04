import { Router } from 'express';
import { LoggerService } from 'src/Services';
export declare type StripeRouterConstructor = ($logger: LoggerService, apiPrefix: string) => Router;
export declare type StripeToken = {
    object: string;
    secret: string;
};
export declare const StripeRouter: StripeRouterConstructor;
