import { HttpModule } from '../HttpModule';
declare const save: HttpModule<{
    page: any;
    collection?: string;
    user: any;
    publish: boolean;
}>;
export default save;
