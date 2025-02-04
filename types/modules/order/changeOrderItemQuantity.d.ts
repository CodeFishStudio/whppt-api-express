import { HttpModule } from '../HttpModule';
declare const changeOrderItemQuantity: HttpModule<{
    orderItemId: string;
    quantity: number;
    orderId?: string | undefined;
}, void>;
export default changeOrderItemQuantity;
