import { HttpModule } from '../HttpModule';
declare const changeNote: HttpModule<{
    note: string;
    orderId: string;
}, void>;
export default changeNote;
