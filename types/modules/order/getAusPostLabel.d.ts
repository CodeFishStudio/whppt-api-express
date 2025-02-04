import { HttpModule } from '../HttpModule';
declare const getAusPostLabel: HttpModule<{
    labelRequestId: string;
}, {
    url: string;
    labelStatus: string;
}>;
export default getAusPostLabel;
