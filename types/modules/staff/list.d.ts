import { HttpModule } from '../HttpModule';
import { Staff } from './Model';
declare const list: HttpModule<{
    limit: string;
    currentPage: string;
    search: string;
}, {
    staff: Staff[];
    total: number;
}>;
export default list;
