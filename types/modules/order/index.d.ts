export declare const order: {
    createOrderWithProduct: import("../HttpModule").HttpModule<{
        productId: string;
        quantity: number;
        orderId?: string | undefined;
        fromPos?: boolean | undefined;
        fromWebsite?: boolean | undefined;
    }, import("./Models/Order").Order>;
    createOrderWithMember: import("../HttpModule").HttpModule<{
        memberId: string;
        orderId?: string | undefined;
        fromPos?: boolean | undefined;
    }, import("./Models/Order").Order>;
    changeOrderItemQuantity: import("../HttpModule").HttpModule<{
        orderItemId: string;
        quantity: number;
        orderId?: string | undefined;
    }, void>;
    addGiftCard: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    removeGiftCard: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    addDiscountCode: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    removeDiscountCode: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    startCheckout: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    confirmStripePayment: import("../HttpModule").HttpModule<{
        orderId: string;
        paymentIntent: string;
        domainId: string;
    }, void>;
    cancelOrder: import("../HttpModule").HttpModule<{
        orderId: string;
    }, void>;
    prepareOrder: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    shipOrder: import("../HttpModule").HttpModule<{
        status: number;
    }, {
        status: number;
    }>;
    findOrderForSession: import("../HttpModule").HttpModule<{
        orderId?: string | undefined;
        memberId?: string | undefined;
    }, {} | import("./Models/Order").Order>;
    loadCart: import("../HttpModule").HttpModule<{
        orderId: string;
    }, import("./Models/Order").Order>;
    removeOrderItem: import("../HttpModule").HttpModule<{
        orderItemId: string;
        orderId: string;
    }, void>;
    addOrderItem: import("../HttpModule").HttpModule<{
        productId: string;
        orderId: string;
        quantity: number;
        fromWebsite: boolean;
        maxQuantity?: number | undefined;
    }, void>;
    recordContactInformation: import("../HttpModule").HttpModule<import("./recordContactInformation").OrderRecordContactInformationArgs, void>;
    changeOrderShippingDetails: import("../HttpModule").HttpModule<import("./changeOrderShippingDetails").ChangeOrderShippingArgs, import("./Models/Order").Order>;
    changeOrderBilling: import("../HttpModule").HttpModule<import("./changeOrderBilling").ChangeOrderBillingArgs, void>;
    changeNote: import("../HttpModule").HttpModule<{
        note: string;
        orderId: string;
    }, void>;
    addMember: import("../HttpModule").HttpModule<{
        memberId: string;
        orderId: string;
    }, {
        memberId: string;
        contact: import("./Models/Order").OrderContact | undefined;
    }>;
    removeMember: import("../HttpModule").HttpModule<{
        orderId: string;
    }, void>;
    refund: import("../HttpModule").HttpModule<any, any>;
    sendReceipt: import("../HttpModule").HttpModule<{
        orderId: string;
        email: string;
        domainId: string;
    }, void>;
    refundViaCash: import("../HttpModule").HttpModule<any, any>;
    createAuspostShipment: import("../HttpModule").HttpModule<any, any>;
    getAusPostLabel: import("../HttpModule").HttpModule<{
        labelRequestId: string;
    }, {
        url: string;
        labelStatus: string;
    }>;
    confirmCashPayment: import("../HttpModule").HttpModule<any, any>;
    markOrderAsPointOfSale: import("../HttpModule").HttpModule<{
        orderId: string;
        staffId: string;
    }, import("./Models/Order").Order>;
    addGuestToOrder: import("../HttpModule").HttpModule<{
        orderId: string;
    }, import("./Models/Order").Order>;
    setDiner: import("../HttpModule").HttpModule<any, any>;
    listReadyToDispatch: import("../HttpModule").HttpModule<any, any>;
    dispatch: import("../HttpModule").HttpModule<any, any>;
    getProductSales: import("../HttpModule").HttpModule<{
        dateFromYear?: number | undefined;
        dateFromMonth?: number | undefined;
        dateFromDay?: number | undefined;
        dateToYear?: number | undefined;
        dateToMonth?: number | undefined;
        dateToDay?: number | undefined;
        limit: string;
        currentPage: string;
        origin: string;
        marketArea: string;
        customerId: string;
    }, any>;
    requestCall: import("../HttpModule").HttpModule<{
        orderId: string;
        phone: string;
    }, void>;
    overrideShippingCost: import("../HttpModule").HttpModule<any, any>;
    changeItemPrice: import("../HttpModule").HttpModule<any, any>;
    overrideTotalPrice: import("../HttpModule").HttpModule<any, any>;
    getOrderTotalWithDiscounts: import("../HttpModule").HttpModule<{
        orderId: string;
        domainId: string;
        memberId?: string | undefined;
    }, any>;
    cancelOverrideTotalPrice: import("../HttpModule").HttpModule<any, any>;
};
