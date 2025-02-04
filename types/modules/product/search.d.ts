import { HttpModule } from '../HttpModule';
import { Product } from './Models/Product';
declare const search: HttpModule<{
    domainId: string;
    search: string;
}, {
    products: Product[];
}>;
export default search;
