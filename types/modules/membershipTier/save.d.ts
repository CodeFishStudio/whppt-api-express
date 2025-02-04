import { HttpModule } from '../HttpModule';
import { MembershipOptions } from './Models/MembershipTier';
export declare const saveConfig: HttpModule<{
    domainId: string;
    membershipOptions: MembershipOptions;
}, void>;
export default saveConfig;
