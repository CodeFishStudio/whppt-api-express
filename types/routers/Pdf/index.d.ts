export declare type OrderWithProductInfo = {
    orderId: any;
    updatedAt: any;
    shipping: {
        contact: any;
        street: string;
        state: string;
        country: string;
    };
    items: any;
    note: any;
    staff: any;
};
export declare const PdfRouter: (apiPrefix: string) => import("express-serve-static-core").Router;
export declare const createPdfBinary: (doc: any, callback: any) => void;
