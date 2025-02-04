import { Order, ShippingCost } from '../../Models/Order';
import { MembershipTier } from 'src/modules/membershipTier/Models/MembershipTier';
export declare const calculateOrderCosts: ([shippingCost, memberTier, order]: [
    ShippingCost,
    MembershipTier,
    Order
]) => {
    total: number;
    subTotal: number;
    originalSubTotal: number;
    shippingCost: ShippingCost;
    memberTotalDiscount: any;
    memberShippingDiscount: number;
    originalTotal: number;
    overrideTotalPrice: number | undefined;
    discountApplied: number;
};
