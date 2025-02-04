import { HttpModule } from '../HttpModule';
declare const login: HttpModule<{
    username: string;
    password: string;
}, any>;
export default login;
