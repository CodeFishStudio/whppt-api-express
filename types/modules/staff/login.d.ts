import { HttpModule } from '../HttpModule';
import { Staff } from './Model';
import { WhpptDatabase } from 'src/Services';
declare const login: HttpModule<{
    username: string;
    password: string;
}, any>;
export declare const findActiveStaff: (db: WhpptDatabase, username: string) => Promise<Staff>;
export default login;
