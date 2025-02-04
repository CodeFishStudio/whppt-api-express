import { ContactDetails } from 'src/modules/order/Models/Order';
export declare type Contact = {
    _id: string;
    email?: string;
    firstName?: string;
    company?: string;
    phone?: string;
    lastName?: string;
    stripeCustomerId?: string;
    mobile?: string;
    isSubscribed?: boolean;
    address?: Address;
    shipping: ContactShipping;
    billing: ContactBilling;
};
export declare type Address = {
    unit?: string;
    number: string;
    street: string;
    suburb: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
};
export declare type ContactShipping = {
    address: Address;
    contactDetails: ContactDetails;
};
export declare type ContactBilling = {
    address: Address;
    contactDetails: ContactDetails;
};
