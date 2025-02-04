import { Router } from 'express';
import { LoggerService } from '../Services';
export declare type GalleryRouterConstructor = ($logger: LoggerService, apiPrefix: string) => Router;
export declare const GalleryRouter: GalleryRouterConstructor;
