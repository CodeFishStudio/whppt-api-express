import { HttpModule } from '../HttpModule';
import { Note } from './Model';
declare const getNotes: HttpModule<{
    memberId: string;
}, Note[] | undefined>;
export default getNotes;
