import { Contact } from 'src/modules/contact/Models/Contact';
export declare type StaffLoginArgs = {
    username: string;
    password: string;
};
export declare const emptyStaffLoginArgs: {
    username: string;
    password: string;
};
export declare type Staff = {
    _id: string;
    contactId: string;
    username: string;
    password?: string;
    createdAt?: Date;
    department?: StaffDepartment;
    marketArea?: MarketArea;
    isActive?: boolean;
    xeroUser?: string;
    xeroServiceGroup?: string;
    unleashedUser?: UnleashedUser;
    unleashedServiceGroup?: UnleashedServiceGroup;
};
export declare type StaffContact = Staff & {
    contact: Contact;
};
export declare type StaffDepartment = 'Cellar Door' | 'Office' | 'Restaurant';
export declare type MarketArea = 'Cellar Door' | 'Restaurant' | 'Cellar Door – Direct' | 'Direct';
export declare type UnleashedServiceGroup = {
    name: string;
    _id: string;
    guid: string;
};
export declare type UnleashedUser = {
    FullName: string;
    Email: string;
    Guid: string;
};
