import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../Logger';
export declare type ConfigMiddleware = {
    waitForConfig(req: Request, res: Response, next: NextFunction): void;
};
export declare type ConfigMiddlewareFactory = (logger: LoggerService, loadModulePromise: Promise<void>) => ConfigMiddleware;
export declare const ConfigMiddleware: ConfigMiddlewareFactory;
