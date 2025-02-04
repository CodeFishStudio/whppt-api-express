import { Delivery } from '../../../delivery/Models/Delivery';
import { OrderItemWithProduct, ShippingCost } from './../../Models/Order';
export declare type CalcShipingCost = (args: {
    postcode?: string;
    country?: string;
    delivery: Delivery;
    pickup?: boolean;
    override?: ShippingCost;
    items: OrderItemWithProduct[];
}) => ShippingCost;
export declare const calcShipingCost: CalcShipingCost;
