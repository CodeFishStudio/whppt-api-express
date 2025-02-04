import { HttpModule } from '../HttpModule';
declare const publish: HttpModule<{
    productId: string;
}, void>;
export default publish;
