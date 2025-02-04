import { HttpModule } from '../HttpModule';
import { Tag } from './models';
export declare type SaveArgs = {
    domainId: string;
    tags: Tag[];
};
declare const save: HttpModule<SaveArgs, {}>;
export default save;
