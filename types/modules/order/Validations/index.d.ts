import { Order } from '../Models/Order';
import { Product } from 'src/modules/product/Models/Product';
export declare const canBeModified: (order: Order) => void;
export declare const hasBeenPaid: (order: Order) => void;
export declare const itemExists: (order: Order, orderItemId: string) => void;
export declare const productAvailbleForSale: ({ product, fromWebsite, }: {
    product: Product;
    fromWebsite?: boolean | undefined;
}) => void;
