import { HttpModule } from '../HttpModule';
import { Contact } from './Models/Contact';
declare const create: HttpModule<{
    firstName: string;
    lastName: string;
    email: string;
    isSubscribed: boolean;
    phone?: string;
    mobile?: string;
    company?: string;
}, Contact>;
export default create;
