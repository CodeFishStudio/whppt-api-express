import { HttpModule } from '../HttpModule';
declare const getFilters: HttpModule<{
    collections: string[];
    styles: string[];
    vintages: string[];
}>;
export default getFilters;
