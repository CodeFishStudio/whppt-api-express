import { HttpModule } from '../HttpModule';
declare const addOrderItem: HttpModule<{
    productId: string;
    orderId: string;
    quantity: number;
    fromWebsite: boolean;
    maxQuantity?: number;
}, void>;
export default addOrderItem;
