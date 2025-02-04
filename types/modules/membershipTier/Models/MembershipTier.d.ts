export declare type MembershipDiscount = {
    appliedTo: 'total' | 'shipping';
    type: 'percentage' | 'flat';
    value: number;
    shipping?: {
        constraint?: string;
        value?: string;
        text?: string;
    };
    _id: string;
    minItemsRequiredForDiscount?: number;
};
export declare type MembershipTier = {
    _id: string;
    name: string;
    shortName?: string;
    discounts: MembershipDiscount[];
    level: number;
    entryLevelSpend: number;
    messageToMembers: {
        _id: string;
        message: string;
        link: {
            _id?: string;
            type: 'file' | 'anchor' | 'page' | 'external';
            text: any;
            href: any;
        };
    };
    nextTiers?: MembershipTier[];
    amountSpentForYear?: number;
    discountAppliedForYear?: number;
    amountToSpendToNextTier?: number;
    amountSpentWithDiscount?: number;
    lockToTier?: string;
};
export declare type MembershipOptions = {
    _id: string;
    membershipTiers: MembershipTier[];
};
