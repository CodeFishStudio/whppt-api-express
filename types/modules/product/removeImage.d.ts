import { HttpModule } from '../HttpModule';
export declare type RemoveImageArgs = {
    domainId: string;
    productId: string;
    imageId: string;
};
declare const removeImage: HttpModule<RemoveImageArgs, void>;
export default removeImage;
