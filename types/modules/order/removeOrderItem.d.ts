import { HttpModule } from '../HttpModule';
declare const removeOrderItem: HttpModule<{
    orderItemId: string;
    orderId: string;
}, void>;
export default removeOrderItem;
