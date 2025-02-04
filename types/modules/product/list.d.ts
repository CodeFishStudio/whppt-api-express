import { HttpModule } from '../HttpModule';
import { Product } from './Models/Product';
declare const list: HttpModule<{
    domainId: string;
    limit: string;
    currentPage: string;
    search: string;
    statusFilter: string;
    sellableFilter: string;
    family: string;
    vintage: string;
}, {
    products: Product[];
    total: number;
}>;
export default list;
