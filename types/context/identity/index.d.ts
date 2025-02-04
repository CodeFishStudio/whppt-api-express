import { WhpptDatabase } from 'src/Services';
import { WhpptUser } from 'src/Services/Security/User';
export declare type Identity = {
    isUser: (user: WhpptUser) => Promise<void> | void;
};
export declare type IdentityConstructor = (database: WhpptDatabase) => Identity;
export declare const Identity: IdentityConstructor;
