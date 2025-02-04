"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchImage = exports.parseImageFormat = void 0;
const sharp_1 = __importDefault(require("sharp"));
const parseImageFormat = (args) => {
    const format = Object.assign({}, args);
    return format;
};
exports.parseImageFormat = parseImageFormat;
const baseImageScale = parseFloat(process.env.BASE_IMAGE_SCALE || '1') || 1;
const optimise = {
    jpg: (image, quality) => ({
        contentType: 'image/jpeg',
        img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
    }),
    jpeg: (image, quality) => ({
        contentType: 'image/jpeg',
        img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
    }),
    webp: (image, quality) => ({ contentType: 'image/webp', img: image.webp({ quality }) }),
    png: (image, quality) => ({ contentType: 'image/png', img: image.png({ quality }) }),
};
const pickFormat = function (format, accept, imageMeta) {
    if (!format.f)
        return accept.indexOf('image/webp') !== -1 ? 'webp' : format.t ? 'png' : 'jpg';
    if (format.f === 'orig')
        return imageMeta.type.split('/')[1];
    return format.f || imageMeta.type.split('/')[1] || format.t ? 'png' : 'jpg';
};
const FetchImage = ($database, $storage, fetchOriginal) => ({ format, itemId, accept = '' }) => {
    if (format.o)
        return fetchOriginal({ itemId, type: 'image' });
    return $database.then(({ document }) => {
        return Promise.all([
            document.fetch('gallery', itemId),
            $storage.fetch(itemId, 'image'),
        ]).then(([imageMeta, fileBuffer]) => {
            const _sharpImage = (0, sharp_1.default)(fileBuffer);
            let _extractedImage = _sharpImage;
            if (format.cx && format.cy && format.cw && format.ch) {
                _extractedImage = _sharpImage.extract({
                    left: parseInt(format.cx),
                    top: parseInt(format.cy),
                    width: parseInt(format.cw),
                    height: parseInt(format.ch),
                });
            }
            const scale = parseFloat(format.s) || baseImageScale;
            const _resizedImage = format.w || format.h
                ? _extractedImage.resize(format.w ? Math.ceil(parseFloat(format.w) * scale) : undefined, format.h ? Math.ceil(parseFloat(format.h) * scale) : undefined, {
                    withoutEnlargement: true,
                })
                : _extractedImage;
            const imageType = pickFormat(format, accept, imageMeta);
            const quality = parseInt(format.q) || 70;
            const { img: optimisedImage, contentType } = optimise[imageType](_resizedImage, quality);
            return optimisedImage.toBuffer().then(processedImageBuffer => {
                return {
                    Body: processedImageBuffer,
                    ContentType: contentType,
                };
            });
        });
    });
};
exports.FetchImage = FetchImage;
//# sourceMappingURL=FetchImage.js.map