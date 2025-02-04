import { ContextType } from '../../context/Context';
export declare type XeroService = (context: ContextType) => {
    getXeroTrackingDetails: () => Promise<{
        salesGroups: string[];
        salesPersons: string[];
    }>;
};
export declare const Xero: XeroService;
