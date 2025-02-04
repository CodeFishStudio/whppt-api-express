import { HttpModule } from '../HttpModule';
declare const forgottenPassword: HttpModule<{
    email: string;
}, void>;
export default forgottenPassword;
