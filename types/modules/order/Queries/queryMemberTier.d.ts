import { ContextType } from 'src/context/Context';
import { MembershipTier } from 'src/modules/membershipTier/Models/MembershipTier';
export declare type QueryMemberTier = (context: ContextType, args: {
    memberId?: string;
    domainId: string;
    orderId?: string;
}) => Promise<MembershipTier>;
export declare const queryMemberTier: QueryMemberTier;
