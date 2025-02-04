export declare const product: {
    list: import("../HttpModule").HttpModule<{
        domainId: string;
        limit: string;
        currentPage: string;
        search: string;
        statusFilter: string;
        sellableFilter: string;
        family: string;
        vintage: string;
    }, {
        products: import("./Models/Product").Product[];
        total: number;
    }>;
    filter: import("../HttpModule").HttpModule<{
        domainId: string;
        limit: string;
        currentPage: string;
        forViewingOn?: "pos" | "website" | undefined;
        filters: import("./filter").ProductListFilters;
    }, {
        products: import("./Models/Product").Product[];
        total: number;
    }>;
    create: import("../HttpModule").HttpModule<import("./create").CreateProductArgs, import("./Models/Product").Product>;
    changeDetails: import("../HttpModule").HttpModule<import("./changeDetails").ChangeDetailsArgs, void>;
    changeImage: import("../HttpModule").HttpModule<import("./changeImage").ChangeProductImageArgs, void>;
    addImage: import("../HttpModule").HttpModule<import("./addImage").AddProductImageArgs, import("./Models/Product").WhpptProductImageData>;
    removeImage: import("../HttpModule").HttpModule<import("./removeImage").RemoveImageArgs, void>;
    getFilters: import("../HttpModule").HttpModule<{
        collections: string[];
        styles: string[];
        vintages: string[];
    }, {
        collections: string[];
        styles: string[];
        vintages: string[];
    }>;
    saveConfig: import("../HttpModule").HttpModule<import("./saveConfig").SaveConfigParams, void>;
    publish: import("../HttpModule").HttpModule<{
        productId: string;
    }, void>;
    load: import("../HttpModule").HttpModule<{
        productId: string;
    }, import("./Models/Product").Product>;
    loadProducts: import("../HttpModule").HttpModule<{
        productIds: string;
        activeOnly?: string | boolean | undefined;
    }, import("./Models/Product").Product[]>;
};
