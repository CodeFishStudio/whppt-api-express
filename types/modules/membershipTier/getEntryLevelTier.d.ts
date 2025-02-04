import { HttpModule } from '../HttpModule';
import { MembershipTier } from './Models/MembershipTier';
declare const getEntryLevelTier: HttpModule<{
    domainId: string;
}, MembershipTier>;
export default getEntryLevelTier;
