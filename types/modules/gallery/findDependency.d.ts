import { HttpModule } from '../HttpModule';
declare type Dependency = {
    _id: string;
    parentId: string;
    slug: string;
    type: string;
    galleryItemId: string;
};
declare const load: HttpModule<{
    itemId: string;
    parentId: string;
}, Dependency | undefined>;
export default load;
