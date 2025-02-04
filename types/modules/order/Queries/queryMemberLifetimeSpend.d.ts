import { ContextType } from 'src/context/Context';
export declare type QueryMemberLifetimeSpend = (context: ContextType, args: {
    memberId?: string;
}) => Promise<number>;
export declare const queryMemberLifetimeSpend: QueryMemberLifetimeSpend;
