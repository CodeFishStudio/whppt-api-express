import { Request } from 'express';
import { WhpptConfig } from './Services/Config';
import { ContextType } from './context/Context';
export * from './Services/Config';
export * from './modules/HttpModule';
export * from './replaceInList';
export declare type WhpptRequest = Request & {
    moduleContext: Promise<ContextType>;
};
export declare const Whppt: (config: WhpptConfig) => import("express-serve-static-core").Router;
