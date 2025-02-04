import { ContextType } from 'src/context/Context';
import { Contact } from '../Models/Contact';
declare type CreateContactArgs = (context: ContextType, contact: {
    _id?: string;
    firstName: string;
    lastName: string;
    email?: string;
} | Contact, session: any) => Promise<{
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
}>;
export declare const createContactAndPublish: CreateContactArgs;
export {};
