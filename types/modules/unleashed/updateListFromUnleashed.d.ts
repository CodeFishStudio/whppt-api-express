import { DatabaseDocument } from '../../Services';
import { HttpModule } from '../HttpModule';
export declare type UnleashedConfig = DatabaseDocument & {};
declare const updateListFromUnleashed: HttpModule<{}, void>;
export default updateListFromUnleashed;
