import { WhpptUser } from '../../Services/Security/User';
import { HttpModule } from '../HttpModule';
import { Product } from './Models/Product';
export declare type CreateProductArgs = {
    domainId: string;
    name: string;
    productCode: string;
    user: WhpptUser;
};
declare const create: HttpModule<CreateProductArgs, Product>;
export default create;
