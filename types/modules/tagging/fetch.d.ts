import { HttpModule } from '../HttpModule';
declare const fetch: HttpModule<{
    domainId: string;
}, any>;
export default fetch;
