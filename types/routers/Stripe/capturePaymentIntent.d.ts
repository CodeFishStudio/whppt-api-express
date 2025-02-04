import { ContextType } from 'src/context/Context';
export declare type CapturePaymentIntentArgs = (contextArgs: {
    context: ContextType;
    stripe: any;
}, args: {
    paymentId: string;
    orderId: string;
    domainId: string;
}) => Promise<void>;
export declare const capturePaymentIntent: CapturePaymentIntentArgs;
