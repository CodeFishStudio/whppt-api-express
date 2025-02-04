export declare const tagging: {
    fetch: import("../HttpModule").HttpModule<{
        domainId: string;
    }, any>;
    filterList: import("../HttpModule").HttpModule<import("./filterList").FilterList, any>;
    filterListSelected: import("../HttpModule").HttpModule<import("./filterListSelected").FilterListSelected, any>;
    filterListUserSelected: import("../HttpModule").HttpModule<import("./filterListUserSelected").FilterListUserSelected, any>;
    save: import("../HttpModule").HttpModule<import("./save").SaveArgs, {}>;
};
