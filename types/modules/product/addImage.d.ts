import { HttpModule } from '../HttpModule';
import { WhpptImageData } from '../image/Models';
import { WhpptProductImageData } from './Models/Product';
export declare type AddProductImageArgs = {
    domainId: string;
    productId: string;
    featureImageId?: string;
    image: WhpptImageData;
};
declare const addImage: HttpModule<AddProductImageArgs, WhpptProductImageData>;
export default addImage;
