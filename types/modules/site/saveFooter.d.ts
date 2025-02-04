import { HttpModule } from '../HttpModule';
declare const saveFooter: HttpModule<{
    footer: any;
    user: any;
    publish: boolean;
}>;
export default saveFooter;
