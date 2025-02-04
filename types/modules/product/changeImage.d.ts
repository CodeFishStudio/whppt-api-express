import { HttpModule } from '../HttpModule';
import { WhpptProductImageData } from './Models/Product';
export declare type ChangeProductImageArgs = {
    domainId: string;
    productId: string;
    featureImageId?: string;
    image: WhpptProductImageData;
};
declare const changeImage: HttpModule<ChangeProductImageArgs, void>;
export default changeImage;
