export declare type DomainEvent = {
    eventType: string;
    timestamp: Date;
    user: any;
    data: any;
};
export declare const CreateEvent: (user: any) => (type: string, data: any) => {
    eventType: string;
    timestamp: Date;
    user: any;
    data: any;
};
