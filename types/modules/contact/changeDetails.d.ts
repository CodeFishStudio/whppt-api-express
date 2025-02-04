import { HttpModule } from '../HttpModule';
declare const changeDetails: HttpModule<{
    firstName: string;
    lastName: string;
    phone: string;
    mobile: string;
    contactId: string;
    company: string;
    email: string;
    isSubscribed: boolean;
}, void>;
export default changeDetails;
