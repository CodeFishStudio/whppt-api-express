import { OrderItemWithProduct } from '../../Models/Order';
import { ContextType } from 'src/context/Context';
import { ShippingCost } from '../../Models/Order';
export declare type LoadOrderWithProductsArgs = (context: ContextType, args: {
    postcode?: string;
    country?: string;
    domainId: string;
    pickup?: boolean;
    override?: ShippingCost;
    items: OrderItemWithProduct[];
}) => Promise<ShippingCost>;
export declare const getShippingCost: LoadOrderWithProductsArgs;
