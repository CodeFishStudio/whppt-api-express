import { HttpModule } from '../HttpModule';
declare const load: HttpModule<{
    domainId: string;
    postcode: string;
    country: string;
}, {
    price: number | string | undefined;
    allowCheckout: boolean;
    message?: string;
}>;
export default load;
