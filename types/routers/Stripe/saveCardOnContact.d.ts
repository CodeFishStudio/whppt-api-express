import { Router } from 'express';
import { ContextType } from 'src/context/Context';
export declare type StripeRouterConstructor = () => Router;
export declare type StripeToken = {
    object: string;
    secret: string;
};
export declare type SaveCardOnContactArgs = (context: ContextType, args: {
    paymentMethod: string;
    customerId: string;
}) => Promise<void>;
export declare const saveCardOnContact: SaveCardOnContactArgs;
