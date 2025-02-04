import { HttpModule } from '../HttpModule';
import { ContactBilling } from './Models/Contact';
export declare type ChangeContactBillingArgs = {
    contactId: string;
    billing: ContactBilling;
};
declare const changeBillingDetails: HttpModule<ChangeContactBillingArgs, void>;
export default changeBillingDetails;
