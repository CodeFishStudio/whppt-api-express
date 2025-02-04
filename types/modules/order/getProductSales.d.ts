import { HttpModule } from '../HttpModule';
declare const getProductSales: HttpModule<{
    dateFromYear?: number;
    dateFromMonth?: number;
    dateFromDay?: number;
    dateToYear?: number;
    dateToMonth?: number;
    dateToDay?: number;
    limit: string;
    currentPage: string;
    origin: string;
    marketArea: string;
    customerId: string;
}, any>;
export default getProductSales;
