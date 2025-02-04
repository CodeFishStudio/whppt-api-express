import { HttpModule } from '../HttpModule';
import { Delivery } from './Models/Delivery';
export declare const saveConfig: HttpModule<{
    domainId: string;
    delivery: Delivery;
}, void>;
export default saveConfig;
