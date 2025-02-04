import { HttpModule } from '../HttpModule';
import { MembershipOptions } from './Models/MembershipTier';
declare const load: HttpModule<{
    domainId: string;
}, MembershipOptions | {}>;
export default load;
