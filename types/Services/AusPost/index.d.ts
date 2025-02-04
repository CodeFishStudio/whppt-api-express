import { Order } from 'src/modules/order/Models/Order';
import { ContextType } from 'src/context/Context';
export declare type AusPostService = (context: ContextType) => Promise<{
    createShipment: (args: {
        order: Order;
        shippingDetails: {
            firstName?: string;
            lastName?: string;
            number?: string;
            company?: string;
            street?: string;
            suburb?: string;
            postCode?: string;
            state?: string;
            country?: string;
        };
        length: number;
        width: number;
        height: number;
        weight: number;
    }) => Promise<string>;
    getLabel: (labelRequestId: string) => Promise<{
        url: string;
        labelStatus: string;
    }>;
}>;
export declare const AusPost: AusPostService;
