import { ContextType } from 'src/context/Context';
import { Contact } from '../Models/Contact';
declare type SaveContactAndPublish = (context: ContextType, args: {
    contact: Contact;
    events: any[];
}, session: any) => Promise<{
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
}>;
export declare const saveContactAndPublish: SaveContactAndPublish;
export {};
