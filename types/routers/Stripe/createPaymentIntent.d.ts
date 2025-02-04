import { Router } from 'express';
import { ContextType } from 'src/context/Context';
export declare type StripeRouterConstructor = () => Router;
export declare type StripeToken = {
    object: string;
    secret: string;
};
export declare type CreatePaymentIntentArgs = (contextArgs: {
    context: ContextType;
    stripe: any;
}, args: {
    cardType: string;
    orderId: string;
    saveCard: boolean;
    ageConfirmed: boolean;
    domainId: string;
}) => Promise<{
    client_secret: string;
    amount: number;
    customer: string;
}>;
export declare const createPaymentIntent: CreatePaymentIntentArgs;
