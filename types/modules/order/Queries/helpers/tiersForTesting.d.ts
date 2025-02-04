export declare const tiers: ({
    _id: string;
    name: string;
    discounts: {
        _id: string;
        appliedTo: "total";
        type: "percentage";
        value: number;
        shipping: {};
        minItemsRequiredForDiscount: number;
    }[];
    level: number;
    entryLevelSpend: number;
    messageToMembers: {
        link: {
            type: "page";
            href: string;
            text: string;
        };
        _id: string;
        message: string;
        title: string;
    };
    shortName: string;
    amountSpentForYear: number;
    amountToSpendToNextTier: number;
} | {
    _id: string;
    name: string;
    discounts: ({
        _id: string;
        appliedTo: "total";
        type: "percentage";
        value: number;
        shipping: {
            text?: undefined;
            value?: undefined;
            constraint?: undefined;
        };
    } | {
        _id: string;
        appliedTo: "shipping";
        type: "percentage";
        value: number;
        shipping: {
            text: string;
            value: string;
            constraint: string;
        };
    } | {
        _id: string;
        appliedTo: "shipping";
        type: "flat";
        value: number;
        shipping: {
            text: string;
            value: string;
            constraint: string;
        };
    })[];
    level: number;
    entryLevelSpend: number;
    messageToMembers: {
        link: {
            type: "page";
            text: string;
            href: string;
        };
        _id: string;
        title: string;
        message: string;
    };
    shortName: string;
    amountSpentForYear: number;
    amountToSpendToNextTier: number;
})[];
