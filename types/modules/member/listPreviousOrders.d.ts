import { HttpModule } from '../HttpModule';
import { Order } from '../order/Models/Order';
declare const listPreviousOrders: HttpModule<{
    memberId: string;
    currentPage: string;
    limit: string;
}, {
    orders: Order[];
    total: number;
}>;
export default listPreviousOrders;
