import { HttpModule } from '../HttpModule';
declare const confirmStripePayment: HttpModule<{
    orderId: string;
    paymentIntent: string;
    domainId: string;
}, void>;
export default confirmStripePayment;
