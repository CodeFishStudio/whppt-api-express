import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const createOrderWithProduct: HttpModule<{
    productId: string;
    quantity: number;
    orderId?: string | undefined;
    fromPos?: boolean;
    fromWebsite?: boolean;
}, Order>;
export default createOrderWithProduct;
