import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const loadCart: HttpModule<{
    orderId: string;
}, Order>;
export default loadCart;
