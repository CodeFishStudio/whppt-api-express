import { HttpModule } from '../HttpModule';
declare const sendReceipt: HttpModule<{
    orderId: string;
    email: string;
    domainId: string;
}, void>;
export default sendReceipt;
