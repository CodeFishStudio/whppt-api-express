import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
declare const findOrderForSession: HttpModule<{
    orderId?: string;
    memberId?: string;
}, Order | {}>;
export default findOrderForSession;
