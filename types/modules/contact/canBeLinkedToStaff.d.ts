import { HttpModule } from '../HttpModule';
import { Contact } from './Models/Contact';
declare const canBeLinkedToStaff: HttpModule<{
    email: string;
}, Contact | boolean>;
export default canBeLinkedToStaff;
