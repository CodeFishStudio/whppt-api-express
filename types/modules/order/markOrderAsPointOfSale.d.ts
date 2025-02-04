import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const markOrderAsPointOfSale: HttpModule<{
    orderId: string;
    staffId: string;
}, Order>;
export default markOrderAsPointOfSale;
