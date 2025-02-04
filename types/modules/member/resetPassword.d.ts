import { HttpModule } from '../HttpModule';
declare const resetPassword: HttpModule<{
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
}, void>;
export default resetPassword;
