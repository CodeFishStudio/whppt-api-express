export declare const membershipTier: {
    save: import("../HttpModule").HttpModule<{
        domainId: string;
        membershipOptions: import("./Models/MembershipTier").MembershipOptions;
    }, void>;
    load: import("../HttpModule").HttpModule<{
        domainId: string;
    }, {} | import("./Models/MembershipTier").MembershipOptions>;
    getEntryLevelTier: import("../HttpModule").HttpModule<{
        domainId: string;
    }, import("./Models/MembershipTier").MembershipTier>;
};
