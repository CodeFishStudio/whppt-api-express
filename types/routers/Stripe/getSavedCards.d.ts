import { ContextType } from 'src/context/Context';
export declare type StripeToken = {
    object: string;
    secret: string;
};
export declare type SaveCardOnContactArgs = (contextArgs: {
    context: ContextType;
    stripe: any;
}, args: {
    memberId: string;
}) => Promise<{
    customerId: string;
    cards: any[];
}>;
export declare const getSavedCards: SaveCardOnContactArgs;
