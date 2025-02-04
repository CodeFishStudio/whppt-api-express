import { ContextType } from 'src/context/Context';
export declare type Email = {
    to: string;
    subject: string;
    html: string;
};
export declare type EmailService = {
    send: (email: Email, attachments: any) => Promise<void>;
};
export declare type EmailServiceConstructor = (context: ContextType) => Promise<EmailService>;
export declare const EmailService: EmailServiceConstructor;
