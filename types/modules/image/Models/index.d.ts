export declare type WhpptImageData = {
    [key: string]: WhpptImageCrop;
};
export declare type WhpptImageCrop = {
    altText?: string;
    caption?: string;
    galleryItemId: string;
    aspectRatio: {
        label: string;
        ratio: {
            w: Number;
            h: number;
        };
    };
    orientation: 'landscape' | 'portrait' | undefined;
    coords?: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
};
