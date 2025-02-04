import { HttpModule } from '../HttpModule';
export declare type ContactEmailContent = {
    firstName: string;
    email: string;
    lastName: string;
    phone?: string;
    reason: string;
    comments: string;
};
declare const sendContactEmail: HttpModule<{
    to: string;
    subject: string;
    data: string;
    content: ContactEmailContent;
    clientKey: string;
}, void>;
export default sendContactEmail;
