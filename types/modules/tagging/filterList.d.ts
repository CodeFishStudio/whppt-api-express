import { HttpModule } from '../HttpModule';
export declare type FilterList = {
    domainId: string;
    size: number;
    pageIndex: number;
    headerFilter: any;
    tagFilters: {
        selected: any[];
        include: any[];
        exclude: any[];
        ignoreSort: boolean;
        ignoreLimit: boolean;
        limit: number;
        sort: any;
    };
    queryInput?: string;
};
declare const filterList: HttpModule<FilterList, any>;
export default filterList;
