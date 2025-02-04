import { HttpModule } from '../HttpModule';
declare const checkUsernameIsAvailable: HttpModule<{
    username: string;
}, void>;
export default checkUsernameIsAvailable;
