import { HttpModule } from '../HttpModule';
export declare type ChangeOrderBillingArgs = {
    orderId: string;
    billing: {
        sameAsShipping: boolean;
        contactDetails: {
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
declare const changeOrderBilling: HttpModule<ChangeOrderBillingArgs, void>;
export default changeOrderBilling;
