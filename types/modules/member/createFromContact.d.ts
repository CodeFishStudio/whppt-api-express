import { HttpModule } from '../HttpModule';
import { Member } from './Model';
declare const createFromContact: HttpModule<{
    contactId: string;
    isSubscribed?: boolean;
}, Member>;
export default createFromContact;
