import { HttpModule } from '../HttpModule';
export declare type FilterListUserSelected = {
    domainId: string;
    tagFilters: {
        selected: any[];
        include: any[];
        userIncluded: [];
        exclude: any[];
        ignoreSort: boolean;
        ignoreLimit: boolean;
        limit: number;
        currentPage: number;
        sort: any;
    };
};
declare const filterListUserSelected: HttpModule<FilterListUserSelected, any>;
export default filterListUserSelected;
