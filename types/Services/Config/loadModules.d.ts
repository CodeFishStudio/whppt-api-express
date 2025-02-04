import { WhpptModule } from '../../modules/HttpModule';
export declare type LoadModules = (configModules: {
    [key: string]: WhpptModule;
}) => Promise<{
    [key: string]: WhpptModule;
}>;
export declare const loadModules: LoadModules;
