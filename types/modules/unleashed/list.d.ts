import { HttpModule } from '../HttpModule';
import { UnleashedProduct } from './Models/UnleashedProduct';
declare const list: HttpModule<{
    productGroup: string;
}, UnleashedProduct[]>;
export default list;
