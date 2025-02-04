import { HttpModule } from '../HttpModule';
import { ContactShipping } from './Models/Contact';
export declare type ChangeContactShippingArgs = {
    contactId: string;
    shipping: ContactShipping;
};
declare const changeShippingDetails: HttpModule<ChangeContactShippingArgs, void>;
export default changeShippingDetails;
