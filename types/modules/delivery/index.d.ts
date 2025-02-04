export declare const delivery: {
    save: import("../HttpModule").HttpModule<{
        domainId: string;
        delivery: import("./Models/Delivery").Delivery;
    }, void>;
    load: import("../HttpModule").HttpModule<{
        domainId: string;
    }, {} | import("./Models/Delivery").Delivery>;
    getPrice: import("../HttpModule").HttpModule<{
        domainId: string;
        postcode: string;
        country: string;
    }, {
        price: string | number | undefined;
        allowCheckout: boolean;
        message?: string | undefined;
    }>;
};
