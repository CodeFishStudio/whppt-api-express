import { WhpptImageData } from '../../../modules/image/Models';
export declare type WhpptProductImageData = WhpptImageData & {
    _id: string;
};
export declare type Product = {
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
    forSaleOnWebsite?: boolean;
    forSaleOnPos?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    featureImageId?: string;
    images: WhpptProductImageData[];
    config?: {
        [key: string]: any;
    };
    customFields: {
        [key: string]: string | any | undefined;
    };
    freeDelivery?: boolean;
};
