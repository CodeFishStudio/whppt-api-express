import { HttpModule } from '../HttpModule';
import { Contact } from './Models/Contact';
declare const canBeLinkedToMember: HttpModule<{
    email: string;
}, Contact | boolean>;
export default canBeLinkedToMember;
