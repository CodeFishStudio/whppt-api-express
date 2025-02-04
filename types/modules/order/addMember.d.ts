import { HttpModule } from '../HttpModule';
import { OrderContact } from './Models/Order';
declare const addMember: HttpModule<{
    memberId: string;
    orderId: string;
}, {
    memberId: string;
    contact: OrderContact | undefined;
}>;
export default addMember;
