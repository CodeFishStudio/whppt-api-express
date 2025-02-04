import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
export declare type ChangeOrderShippingArgs = {
    orderId: string;
    shipping: {
        pickup?: boolean;
        contactDetails?: {
            firstName?: string;
            lastName?: string;
            company?: string;
        };
        address: {
            number: string;
            street: string;
            suburb: string;
            city: string;
            state: string;
            country: string;
            postCode: string;
        };
    };
};
declare const changeOrderShippingDetails: HttpModule<ChangeOrderShippingArgs, Order>;
export default changeOrderShippingDetails;
