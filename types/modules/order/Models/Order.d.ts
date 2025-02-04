import { Address } from 'src/modules/contact/Models/Contact';
import { Product } from 'src/modules/product/Models/Product';
export declare type Order = {
    _id: string;
    orderNumber?: string;
    domainId?: string;
    contact?: OrderContact;
    memberId?: string;
    items: OrderItem[];
    billing?: Billing;
    shipping?: Shipping;
    discountIds?: string;
    checkoutStatus: 'pending' | 'paid' | 'refunded' | 'requestingACall' | 'cancelled';
    requestContactPhone?: string;
    dispatchedStatus?: 'pending' | 'packed' | 'dispatched';
    createdAt?: Date;
    payment?: Payment;
    updatedAt?: Date;
    note?: string;
    fromPos?: boolean;
    isDiner?: boolean;
    number?: string | number;
    stripe?: {
        intentId: string;
        status: 'pending' | 'paid';
        amount: number;
    };
    overrides?: {
        total: number;
    };
    staff?: {
        _id: string;
        username: string;
        marketArea: string;
    };
};
export declare type ShippingCost = {
    price: number | string | undefined;
    allowCheckout: boolean;
    message?: string;
    override?: boolean;
    type: 'aus_metro' | 'aus_regional' | 'international' | 'pickup';
};
export declare type Shipping = {
    address: Address;
    contactDetails: ContactDetails;
    shippingCost: ShippingCost;
    ausPost?: AusPostShipping;
    status: 'preparing' | 'dispatched' | 'delivered';
    pickup?: boolean;
};
export declare type Billing = {
    address: Address;
    contactDetails: ContactDetails;
};
export declare type ContactDetails = {
    firstName: string;
    lastName: string;
    company: string;
};
export declare type OrderItem = {
    _id: string;
    productId?: string;
    quantity: number;
    purchasedPrice?: number;
    overidedPrice?: number;
    originalPrice?: number;
    maxQuantity?: number;
};
export declare type OrderWithProducts = Order & {
    items?: OrderItemWithProduct[];
};
export declare type OrderWithProductsAndDiscounts = Order & {
    items?: OrderItemDiscountsWithProducts[];
};
export declare type OrderItemDiscountsWithProducts = OrderItemWithProduct & {
    totalDiscountApplied?: number | string;
    revenue?: number | string;
    shippingCostPrice?: number | string;
};
export declare type OrderItemWithProduct = OrderItem & {
    product?: Product;
    _id: string;
    productId?: string;
    quantity: number;
    purchasedPrice?: number;
    overidedPrice?: number;
    originalPrice?: number;
    productName?: string;
};
export declare type Payment = {
    status: 'pending' | 'refunded' | 'paid';
    type?: 'card' | 'cash';
    date: Date;
    amount: number;
    subTotal: number;
    memberTotalDiscount: number;
    memberShippingDiscount: number;
    discountApplied?: number;
    overrideTotalPrice?: number;
    originalSubTotal?: number;
    shippingCost?: ShippingCost;
};
export declare type AusPostShipping = {
    shipmentId: string;
    status: 'shipmentCreated';
};
export declare type OrderContact = {
    _id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
};
export declare type Member = {
    _id: string;
    loyaltyLevel: string;
    contactId: string;
    amountSpent: number;
};
export declare type Discount = {
    name: string;
    discountApplied: number;
    remainingSubtotal?: number;
};
