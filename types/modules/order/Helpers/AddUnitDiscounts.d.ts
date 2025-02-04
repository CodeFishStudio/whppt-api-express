import { OrderWithProducts, OrderWithProductsAndDiscounts } from '../Models/Order';
export declare type AddUnitDiscountsToOrder = (order: OrderWithProducts) => OrderWithProductsAndDiscounts;
export declare const addUnitDiscountsToOrder: AddUnitDiscountsToOrder;
