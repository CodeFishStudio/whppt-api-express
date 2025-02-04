import { HttpModule } from '../HttpModule';
declare const changePassword: HttpModule<{
    memberId: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}, void>;
export default changePassword;
