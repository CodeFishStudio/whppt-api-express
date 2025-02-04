export declare const unleashed: {
    list: import("../HttpModule").HttpModule<{
        productGroup: string;
    }, import("./Models/UnleashedProduct").UnleashedProduct[]>;
    updateListFromUnleashed: import("../HttpModule").HttpModule<{}, void>;
    listProductGroups: import("../HttpModule").HttpModule<{}, {
        _id: string;
        amount: number;
    }[]>;
};
