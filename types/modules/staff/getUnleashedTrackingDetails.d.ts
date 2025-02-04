import { HttpModule } from '../HttpModule';
declare const getUnleashedTrackingDetails: HttpModule<{
    memberId: string;
    domainId: string;
}, any>;
export default getUnleashedTrackingDetails;
