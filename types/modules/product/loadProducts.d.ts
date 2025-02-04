import { HttpModule } from '../HttpModule';
import { Product } from './Models/Product';
export declare type ProductLoadFilters = {
    collection: string;
    style: string;
    vintage: string;
    sortBy: string;
    search?: string;
};
declare const load: HttpModule<{
    productIds: string;
    activeOnly?: boolean | string;
}, Product[]>;
export default load;
