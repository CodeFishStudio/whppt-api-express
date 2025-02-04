import { HttpModule } from '../HttpModule';
import { Member } from './Model';
declare const memberInfo: HttpModule<{
    memberId: string;
}, Member>;
export default memberInfo;
