export declare const sanitizeAddressString: (item?: string) => string;
export declare const sanitizeUnitString: (item?: string) => string;
export declare const composeOrderData: (orderWithProducts: any, contact?: any) => {
    orderId: any;
    updatedAt: any;
    contact: {
        email: any;
        phoneNumber: any;
    };
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
