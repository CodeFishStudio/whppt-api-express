import { Router } from 'express';
import { LoggerService } from '../Services';
export declare type ModulesRouter = ($logger: LoggerService, apiPrefix: string) => Router;
export declare const ModulesRouter: ModulesRouter;
