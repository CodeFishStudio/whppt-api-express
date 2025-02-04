import { HttpModule } from '../HttpModule';
declare const getOrderTotalWithDiscounts: HttpModule<{
    orderId: string;
    domainId: string;
    memberId?: string;
}, any>;
export default getOrderTotalWithDiscounts;
