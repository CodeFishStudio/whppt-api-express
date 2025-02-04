import { ContextType } from 'src/context/Context';
declare type MembershipYearlyCalc = {
    amount: number;
    discountApplied: number;
};
export declare type QueryMemberAmountSpentForYear = (context: ContextType, args: {
    memberId?: string;
}) => Promise<{
    currentYear: MembershipYearlyCalc;
    previousYear: MembershipYearlyCalc;
}>;
export declare const queryMemberAmountSpentForYear: QueryMemberAmountSpentForYear;
export {};
