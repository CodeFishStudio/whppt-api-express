import { ContextType } from 'src/context/Context';
import { Contact } from '../Models/Contact';
declare type SubscriptionArgs = (context: ContextType & {
    document: any;
}, args: {
    contact: Contact;
    isSubscribed: boolean;
}, session: any) => Promise<void>;
export declare const ToggleSubscription: SubscriptionArgs;
export {};
