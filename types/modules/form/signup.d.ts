import { HttpModule } from '../HttpModule';
declare const signUp: HttpModule<{
    name: string;
    email: string;
}, void>;
export default signUp;
