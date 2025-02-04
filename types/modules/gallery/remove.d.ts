import { HttpModule } from '../HttpModule';
declare const load: HttpModule<{
    itemId?: string;
    type: string;
}, void>;
export default load;
