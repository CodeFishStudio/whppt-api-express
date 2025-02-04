import Sharp from 'sharp';
import { WhpptDatabase } from '../Database';
import { StorageService } from '../Storage';
import { FetchOriginal } from './FetchOriginal';
export declare type FetchImageFormat = {
    w: string;
    h: string;
    f: string;
    cx: string;
    cy: string;
    cw: string;
    ch: string;
    q: string;
    o: string;
    s: string;
    t: string;
};
export declare const parseImageFormat: (args: any) => FetchImageFormat;
export declare type FetchImageArgs = {
    format: FetchImageFormat;
    itemId: string;
    accept?: string;
};
export declare type FetchImage = (args: FetchImageArgs) => Promise<void>;
export declare type FetchImageConstructor = ($database: Promise<WhpptDatabase>, $storage: StorageService, fetchOriginal: FetchOriginal) => FetchImage;
export declare type OptimisedImage = {
    contentType: string;
    img: Sharp.Sharp;
};
export declare type OptimiseOptions = {
    [key: string]: (image: Sharp.Sharp, quality: number) => OptimisedImage;
};
export declare const FetchImage: FetchImageConstructor;
