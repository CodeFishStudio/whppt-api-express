import { HttpModule } from '../HttpModule';
declare const publishAll: HttpModule<{
    domainId: string;
}, void>;
export default publishAll;
