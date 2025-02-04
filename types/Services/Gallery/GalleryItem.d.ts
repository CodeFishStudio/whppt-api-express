import { DataDocument } from '../../modules/DataDocument';
import { DomainDocument } from '../../modules/DomainDocument';
import { FileExtension, MimeType } from 'file-type';
export declare type GalleryFileInfo = {
    originalname: string;
    ext?: FileExtension;
    mime?: MimeType;
    type: string;
};
export declare type GalleryItem = DataDocument & DomainDocument & {
    type: string;
    defaultAltText?: string;
    defaultCaption?: string;
    tags: string[];
    suggestedTags?: string[];
    fileInfo?: GalleryFileInfo;
    date: Date;
    uploadedOn?: Date;
};
