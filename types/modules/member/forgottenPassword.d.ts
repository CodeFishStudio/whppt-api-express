import { HttpModule } from '../HttpModule';
declare const forgottenPassword: HttpModule<{
    email: string;
}, any>;
export default forgottenPassword;
