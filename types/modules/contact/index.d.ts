export declare const contact: {
    create: import("../HttpModule").HttpModule<{
        firstName: string;
        lastName: string;
        email: string;
        isSubscribed: boolean;
        phone?: string | undefined;
        mobile?: string | undefined;
        company?: string | undefined;
    }, import("./Models/Contact").Contact>;
    canBeLinkedToMember: import("../HttpModule").HttpModule<{
        email: string;
    }, boolean | import("./Models/Contact").Contact>;
    changeDetails: import("../HttpModule").HttpModule<{
        firstName: string;
        lastName: string;
        phone: string;
        mobile: string;
        contactId: string;
        company: string;
        email: string;
        isSubscribed: boolean;
    }, void>;
    changeBillingDetails: import("../HttpModule").HttpModule<import("./changeBillingDetails").ChangeContactBillingArgs, void>;
    changeShippingDetails: import("../HttpModule").HttpModule<import("./changeShippingDetails").ChangeContactShippingArgs, void>;
    checkEmailAvailability: import("../HttpModule").HttpModule<{
        email: string;
        contactId?: string | undefined;
    }, boolean>;
    canBeLinkedToStaff: import("../HttpModule").HttpModule<{
        email: string;
    }, boolean | import("./Models/Contact").Contact>;
    search: import("../HttpModule").HttpModule<any, any>;
};
