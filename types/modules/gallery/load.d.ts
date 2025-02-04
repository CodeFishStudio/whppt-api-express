import { HttpModule } from '../HttpModule';
import { GalleryItem } from '../../Services/Gallery/GalleryItem';
declare const load: HttpModule<{
    itemId?: string;
}, {
    item?: GalleryItem | null;
}>;
export default load;
