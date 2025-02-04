import { HttpModule } from '../HttpModule';
import { GalleryItem } from '../../Services/Gallery/GalleryItem';
export declare type SearchParams = {
    domainId: string;
    type: string;
    page?: string;
    size?: string;
    queryTags?: string[];
    filterTag?: string;
};
declare const search: HttpModule<SearchParams, {
    items: GalleryItem[];
}>;
export default search;
