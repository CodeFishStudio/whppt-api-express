import { HttpModule } from '../HttpModule';
import { Product } from './Models/Product';
export declare type ProductListFilters = {
    collection: string;
    style: string;
    vintage: string;
    sortBy: string;
    filterNames: {
        label: string;
        value: string;
    }[];
    search?: string;
};
declare const filter: HttpModule<{
    domainId: string;
    limit: string;
    currentPage: string;
    forViewingOn?: 'website' | 'pos';
    filters: ProductListFilters;
}, {
    products: Product[];
    total: number;
}>;
export default filter;
