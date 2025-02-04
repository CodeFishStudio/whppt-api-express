import { MembershipTier } from 'src/modules/membershipTier/Models/MembershipTier';
export declare type CalculateMembersTotalSavingsArgs = (tiers: MembershipTier[], currentPurchaseAmount: number, spentThisPeriod: number, amountOfProducts: number, lockToTier?: string) => any[];
export declare const calculateMembersTotalSavings: CalculateMembersTotalSavingsArgs;
