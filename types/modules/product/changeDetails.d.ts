import { HttpModule } from '../HttpModule';
export declare type ChangeDetailsArgs = {
    product: {
        _id: string;
        domainId: string;
        name: string;
        productCode: string;
        description?: string;
        family?: string;
        quantityAvailable?: string;
        canPlaceOrderQuantity?: string;
        unitOfMeasure?: string;
        price?: string;
        isActive: boolean;
        customFields: {
            [key: string]: string | undefined;
        };
    };
    publish: boolean;
};
declare const changeDetails: HttpModule<ChangeDetailsArgs, void>;
export default changeDetails;
