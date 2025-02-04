import { ContextType } from 'src/context/Context';
import { ShippingCost } from '../Models/Order';
export declare type CalculateTotalArgs = (context: ContextType, args: {
    orderId: string;
    domainId: string;
    memberId?: string;
}) => Promise<{
    total: number;
    subTotal: number;
    originalSubTotal?: number;
    memberTotalDiscount: number;
    memberShippingDiscount: number;
    shippingCost: ShippingCost;
    originalTotal: number;
    overrideTotalPrice: number | undefined;
    discountApplied: number | undefined;
}>;
export declare const calculateTotal: CalculateTotalArgs;
