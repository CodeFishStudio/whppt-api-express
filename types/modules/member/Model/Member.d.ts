import { Contact } from 'src/modules/contact/Models/Contact';
export declare type Member = {
    _id: string;
    contactId: string;
    username: string;
    password?: string;
    lockToTier?: string;
    createdAt?: Date;
    notes?: Note[];
    isArchived?: boolean;
};
export declare type Note = {
    _id: string;
    note: string;
    author: {
        _id: string;
        name: string;
    } | string;
    date: Date;
};
export declare type MemberContact = Member & {
    contact: Contact;
};
