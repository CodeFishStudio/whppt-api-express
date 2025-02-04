import { ContextType } from 'src/context/Context';
import { OrderWithProducts } from 'src/modules/order/Models/Order';
export declare type LoadOrderWithProductsArgs = (context: ContextType, matchQuery: any) => Promise<OrderWithProducts>;
export declare const loadOrderWithProducts: LoadOrderWithProductsArgs;
