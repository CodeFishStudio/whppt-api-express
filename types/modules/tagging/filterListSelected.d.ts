import { HttpModule } from '../HttpModule';
export declare type FilterListSelected = {
    domainId: string;
    tagFilters: {
        selected: any[];
        include: any[];
        exclude: any[];
        ignoreSort: boolean;
        ignoreLimit: boolean;
        limit: number;
        sort: any;
    };
};
declare const filterListSelected: HttpModule<FilterListSelected, any>;
export default filterListSelected;
