import { HttpModule } from '../HttpModule';
import { Delivery } from './Models/Delivery';
declare const load: HttpModule<{
    domainId: string;
}, Delivery | {}>;
export default load;
