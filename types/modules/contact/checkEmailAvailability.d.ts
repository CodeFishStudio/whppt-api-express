import { HttpModule } from '../HttpModule';
declare const checkEmailAvailability: HttpModule<{
    email: string;
    contactId?: string;
}, boolean>;
export default checkEmailAvailability;
