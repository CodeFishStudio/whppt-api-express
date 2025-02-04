import { MembershipOptions, MembershipTier } from '../../../membershipTier/Models/MembershipTier';
declare type MembershipYearlyCalc = {
    amount: number;
    discountApplied: number;
};
export declare type CalculateMembershipTier = (membershipOptions: MembershipOptions, currentYear: MembershipYearlyCalc, previousYear: MembershipYearlyCalc) => MembershipTier;
export declare const calculateMembershipTier: CalculateMembershipTier;
export {};
