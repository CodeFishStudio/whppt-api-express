import { HttpModule } from '../HttpModule';
declare const requestCall: HttpModule<{
    orderId: string;
    phone: string;
}, void>;
export default requestCall;
