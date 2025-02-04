import { ContextType } from 'src/context/Context';
import { Order } from 'src/modules/order/Models/Order';
export declare type LoadOrderArgs = (context: ContextType, orderId: string) => Promise<Order>;
export declare const loadOrder: LoadOrderArgs;
