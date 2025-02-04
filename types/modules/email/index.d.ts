export declare const email: {
    sendContactEmail: import("../HttpModule").HttpModule<{
        to: string;
        subject: string;
        data: string;
        content: import("./sendContactEmail").ContactEmailContent;
        clientKey: string;
    }, void>;
};
