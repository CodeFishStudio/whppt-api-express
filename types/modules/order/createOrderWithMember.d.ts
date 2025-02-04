import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const createOrderWithMember: HttpModule<{
    memberId: string;
    orderId?: string | undefined;
    fromPos?: boolean;
}, Order>;
export default createOrderWithMember;
