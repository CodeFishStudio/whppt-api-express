import { Address } from '../contact/Models/Contact';
import { HttpModule } from '../HttpModule';
import { Member } from './Model';
declare const signUp: HttpModule<{
    address: Address;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    termsAndConditions: boolean;
    contactId?: string;
}, Member>;
export default signUp;
