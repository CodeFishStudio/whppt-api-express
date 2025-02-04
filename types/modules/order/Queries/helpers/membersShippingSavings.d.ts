import { MembershipTier } from 'src/modules/membershipTier/Models/MembershipTier';
import { ShippingCost } from '../../Models/Order';
export declare const calculateMemberShippingSavings: (tier: MembershipTier, shippingCost: ShippingCost, itemsCostInCents: number, purchaseTotalDiscount: number, amountOfProducts: number, amountSpentForYear: number) => number;
