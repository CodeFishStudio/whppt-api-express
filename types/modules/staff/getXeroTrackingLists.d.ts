import { HttpModule } from '../HttpModule';
declare const getXeroTrackingLists: HttpModule<{
    memberId: string;
    domainId: string;
}, any>;
export default getXeroTrackingLists;
