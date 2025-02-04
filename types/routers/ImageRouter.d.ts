import { Router } from 'express';
import { LoggerService } from 'src/Services';
export declare type ImageRouterConstructor = ($logger: LoggerService) => Router;
export declare const ImageRouter: ImageRouterConstructor;
