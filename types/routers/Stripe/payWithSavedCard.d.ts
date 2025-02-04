import { ContextType } from 'src/context/Context';
export declare type StripeToken = {
    object: string;
    secret: string;
};
export declare type PayWithSavedCardArgs = (contextArgs: {
    context: ContextType;
    stripe: any;
}, args: {
    customerId: string;
    cardId: string;
    orderId: string;
    ageConfirmed: boolean;
    domainId: string;
}) => Promise<string>;
export declare const payWithSavedCard: PayWithSavedCardArgs;
