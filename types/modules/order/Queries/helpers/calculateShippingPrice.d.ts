import { OrderItemWithProduct } from '../../Models/Order';
declare type CalculateShippingPrice = (items: OrderItemWithProduct[], price?: number | string) => number | string | undefined;
export declare const calculateShippingPrice: CalculateShippingPrice;
export {};
