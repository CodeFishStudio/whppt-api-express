export declare const staff: {
    login: import("../HttpModule").HttpModule<{
        username: string;
        password: string;
    }, any>;
    getOrderFilters: import("../HttpModule").HttpModule<any, any>;
    listOrders: import("../HttpModule").HttpModule<any, any>;
    list: import("../HttpModule").HttpModule<{
        limit: string;
        currentPage: string;
        search: string;
    }, {
        staff: import("./Model").Staff[];
        total: number;
    }>;
    createFromContact: import("../HttpModule").HttpModule<{
        contactId: string;
        username: string;
        password: string;
        department: import("./Model").StaffDepartment;
        marketArea: import("./Model").MarketArea;
        xeroUser?: string | undefined;
        xeroServiceGroup?: string | undefined;
    }, import("./Model").Staff>;
    me: import("../HttpModule").HttpModule<any, any>;
    forgottenPassword: import("../HttpModule").HttpModule<{
        email: string;
    }, void>;
    resetPassword: import("../HttpModule").HttpModule<{
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }, void>;
    getMemberTier: import("../HttpModule").HttpModule<any, any>;
    save: import("../HttpModule").HttpModule<{
        _id: string;
        contactId: string;
        marketArea: import("./Model").MarketArea;
        department: import("./Model").StaffDepartment;
        firstName: string;
        lastName: string;
        isActive: boolean;
        xeroUser?: string | undefined;
        xeroServiceGroup?: string | undefined;
        unleashedServiceGroup: import("./Model").UnleashedServiceGroup;
        unleashedUser: import("./Model").UnleashedUser;
    }, import("./Model").Staff>;
    listSales: import("../HttpModule").HttpModule<any, any>;
    getStaffMembers: import("../HttpModule").HttpModule<any, any>;
    getXeroTrackingLists: import("../HttpModule").HttpModule<{
        memberId: string;
        domainId: string;
    }, any>;
    getUnleashedTrackingDetails: import("../HttpModule").HttpModule<{
        memberId: string;
        domainId: string;
    }, any>;
    queryDoesMemberHaveSavedCards: import("../HttpModule").HttpModule<any, any>;
};
