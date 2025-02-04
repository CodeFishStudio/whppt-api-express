import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const addGuestToOrder: HttpModule<{
    orderId: string;
}, Order>;
export default addGuestToOrder;
