import { HttpModule } from '../HttpModule';
import { OrderContact } from './Models/Order';
export declare type OrderRecordContactInformationArgs = {
    orderId: string;
    contact: OrderContact & {
        isSubscribed: boolean;
    };
};
declare const recordContactInformation: HttpModule<OrderRecordContactInformationArgs, void>;
export default recordContactInformation;
