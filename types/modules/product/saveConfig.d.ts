import { HttpModule } from '../HttpModule';
export declare type SaveConfigParams = {
    key: string;
    value: any;
    productId: string;
};
export declare const saveConfig: HttpModule<SaveConfigParams, void>;
export default saveConfig;
