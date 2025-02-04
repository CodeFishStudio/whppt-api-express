import { HttpModule } from '../HttpModule';
declare const removeMember: HttpModule<{
    orderId: string;
}, void>;
export default removeMember;
