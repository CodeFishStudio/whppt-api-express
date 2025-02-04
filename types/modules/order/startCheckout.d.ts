import { HttpModule } from '../HttpModule';
declare const startCheckout: HttpModule<{
    status: number;
}>;
export default startCheckout;
