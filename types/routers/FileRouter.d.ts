import { Router } from 'express';
import { LoggerService } from 'src/Services';
export declare type FileRouterConstructor = ($logger: LoggerService) => Router;
export declare const FileRouter: FileRouterConstructor;
