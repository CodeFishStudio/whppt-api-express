import { NextFunction, Request, Response } from 'express';
export declare type HostingMiddleware = {
    checkForApiKey(req: Request, res: Response, next: NextFunction): void;
};
export declare type HostingMiddlewareFactory = () => HostingMiddleware;
export declare const HostingMiddleware: HostingMiddlewareFactory;
