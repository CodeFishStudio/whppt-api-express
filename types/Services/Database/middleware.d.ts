import { NextFunction, Response } from 'express';
import { MongoDatabaseConnection } from '../../Services/Database/Mongo/Connection';
import { LoggerService } from '../../Services/Logger';
import { DatabaseConnection } from '../../Services/Database';
export declare type DatabaseMiddleware = {
    waitForAdminDbConnection(req: any, res: Response, next: NextFunction): void;
    waitForApiDbConnection(req: any, res: Response, next: NextFunction): void;
};
export declare type DatabaseMiddlewareFactory = (logger: LoggerService, getConnection: (apiKey: string) => Promise<DatabaseConnection>, adminDb: Promise<MongoDatabaseConnection>) => DatabaseMiddleware;
export declare const DatabaseMiddleware: DatabaseMiddlewareFactory;
