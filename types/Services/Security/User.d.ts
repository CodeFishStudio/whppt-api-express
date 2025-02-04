export declare type WhpptUser = {
    _id: string;
    username: string;
    roles: string[];
    isGuest: boolean;
};
export declare const WhpptUser: (values: any) => WhpptUser;
