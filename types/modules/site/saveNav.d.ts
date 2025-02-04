import { HttpModule } from '../HttpModule';
declare const saveNav: HttpModule<{
    nav: any;
    user: any;
    publish: boolean;
}>;
export default saveNav;
