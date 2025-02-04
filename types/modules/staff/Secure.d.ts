import { HttpModule } from '../HttpModule';
export declare type SecureModule = (module: HttpModule<any, any>) => HttpModule<any, any>;
export declare type LoggedInMemberInfo = {
    username: string;
    name: string;
};
export declare const Secure: SecureModule;
