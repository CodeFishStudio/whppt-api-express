export declare const member: {
    createFromContact: import("../HttpModule").HttpModule<{
        contactId: string;
        isSubscribed?: boolean | undefined;
    }, import("./Model").Member>;
    listPreviousOrders: import("../HttpModule").HttpModule<{
        memberId: string;
        currentPage: string;
        limit: string;
    }, {
        orders: import("../order/Models/Order").Order[];
        total: number;
    }>;
    login: import("../HttpModule").HttpModule<{
        username: string;
        password: string;
    }, any>;
    me: import("../HttpModule").HttpModule<any, any>;
    showMemberInfo: import("../HttpModule").HttpModule<{
        memberId: string;
    }, import("./Model").Member>;
    checkUsernameIsAvailable: import("../HttpModule").HttpModule<{
        username: string;
    }, void>;
    changePassword: import("../HttpModule").HttpModule<{
        memberId: string;
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }, void>;
    search: import("../HttpModule").HttpModule<any, any>;
    saveNote: import("../HttpModule").HttpModule<any, any>;
    editNote: import("../HttpModule").HttpModule<any, any>;
    getNotes: import("../HttpModule").HttpModule<{
        memberId: string;
    }, import("./Model").Note[] | undefined>;
    deleteNote: import("../HttpModule").HttpModule<any, any>;
    forgottenPassword: import("../HttpModule").HttpModule<{
        email: string;
    }, any>;
    resetPassword: import("../HttpModule").HttpModule<{
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }, void>;
    getMemberTier: import("../HttpModule").HttpModule<any, any>;
    signUp: import("../HttpModule").HttpModule<{
        address: import("../contact/Models/Contact").Address;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        termsAndConditions: boolean;
        contactId?: string | undefined;
    }, import("./Model").Member>;
    overrideMemberTier: import("../HttpModule").HttpModule<any, any>;
    setArchive: import("../HttpModule").HttpModule<any, any>;
};
