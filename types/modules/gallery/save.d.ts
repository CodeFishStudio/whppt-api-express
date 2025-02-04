import { HttpModule } from '../HttpModule';
import { GalleryItem } from '../../Services/Gallery/GalleryItem';
declare const save: HttpModule<{
    item?: GalleryItem;
}>;
export default save;
