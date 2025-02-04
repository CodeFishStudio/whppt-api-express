import { HttpModule } from '../HttpModule';
export declare type OrderFiltersRetured = {
    statuses: {
        _id: string;
        amount: number;
    }[];
};
declare const _default: HttpModule<any, any>;
export default _default;
