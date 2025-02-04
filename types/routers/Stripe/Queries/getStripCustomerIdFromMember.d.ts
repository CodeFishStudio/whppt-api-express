import { ContextType } from 'src/context/Context';
import { Order } from 'src/modules/order/Models/Order';
export declare type GetStripCustomerIdFromMemberArgs = (context: ContextType, stripe: any, memberId: string | undefined) => Promise<Order>;
export declare const getStripCustomerIdFromMember: GetStripCustomerIdFromMemberArgs;
