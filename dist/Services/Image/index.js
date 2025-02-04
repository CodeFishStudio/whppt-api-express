"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const assert_1 = __importDefault(require("assert"));
const sharp_1 = __importDefault(require("sharp"));
const optimise = {
    jpg: (image, quality) => ({
        contentType: 'image/jpeg',
        img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
    }),
    jpeg: (image, quality) => ({
        contentType: 'image/jpeg',
        img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
    }),
    webp: (image, quality) => ({
        contentType: 'image/webp',
        img: image.webp({ quality }),
    }),
    png: (image, quality) => ({
        contentType: 'image/png',
        img: image.png({ quality }),
    }),
};
const pickFormat = function (format, accept, imageMeta) {
    if (!format.f)
        return accept.indexOf('image/webp') !== -1 ? 'webp' : format.t ? 'png' : 'jpg';
    if (format.f === 'orig')
        return imageMeta.type.split('/')[1];
    return format.f || imageMeta.type.split('/')[1] || format.t ? 'png' : 'jpg';
};
/**
 * @deprecated use gallery
 */
const Image = ($id, $database, $storage, config) => {
    const disablePublishing = config.disablePublishing || false;
    const fetch = function ({ format, id, accept = '', }) {
        if (format.o)
            return fetchOriginal({ id });
        return $database.then(({ document }) => {
            return Promise.all([document.fetch('images', id), $storage.fetchImage(id)]).then(([imageMeta, imageBuffer]) => {
                const _sharpImage = (0, sharp_1.default)(imageBuffer);
                let _extractedImage = _sharpImage;
                if (format.cx && format.cy && format.cw && format.ch) {
                    _extractedImage = _sharpImage.extract({
                        left: parseInt(format.cx),
                        top: parseInt(format.cy),
                        width: parseInt(format.cw),
                        height: parseInt(format.ch),
                    });
                }
                const scale = parseFloat(format.s) || parseFloat(process.env.BASE_IMAGE_SCALE || '1') || 1;
                const _resizedImage = format.w || format.h
                    ? _extractedImage.resize(format.w ? Math.ceil(parseFloat(format.w) * scale) : undefined, format.h ? Math.ceil(parseFloat(format.h) * scale) : undefined, {
                        withoutEnlargement: true,
                    })
                    : _extractedImage;
                const imageType = pickFormat(format, accept, imageMeta);
                const quality = parseInt(format.q) || 70;
                const optimiser = optimise[imageType];
                const { img: optimisedImage, contentType } = optimiser(_resizedImage, quality);
                return optimisedImage.toBuffer().then((processedImageBuffer) => {
                    return {
                        Body: processedImageBuffer,
                        ContentType: contentType,
                    };
                });
            });
        });
    };
    const fetchOriginal = function ({ id }) {
        return $database.then(({ document }) => {
            return document.fetch('images', id).then((storedImage) => {
                return $storage.fetchImage(id).then(imageBuffer => {
                    const response = imageBuffer;
                    response.Body = imageBuffer;
                    response.ContentType = storedImage.type;
                    return response;
                });
            });
        });
    };
    const upload = function (file) {
        return $database.then(database => {
            const { $db, $dbPub } = database;
            const { buffer, mimetype: type, originalname: name } = file;
            const id = $id.newId();
            (0, assert_1.default)($dbPub, 'Publishing database is not configured');
            return $storage.uploadImage(buffer, id, {}).then(() => {
                const image = {
                    _id: id,
                    version: 'v2',
                    uploadedOn: new Date(),
                    name,
                    type,
                };
                return $db
                    .collection('images')
                    .insertOne(image)
                    .then(() => {
                    if (disablePublishing)
                        return Promise.resolve();
                    return $dbPub
                        .collection('images')
                        .insertOne({
                        _id: id,
                        version: 'v2',
                        uploadedOn: new Date(),
                        name,
                        type,
                    })
                        .then(() => { });
                })
                    .then(() => image);
            });
        });
    };
    const remove = function (id) {
        return $database.then(({ document }) => {
            return $storage.removeImage(id).then(() => document.delete('images', id));
        });
    };
    return { upload, fetchOriginal, fetch, remove };
};
exports.Image = Image;
//# sourceMappingURL=index.js.map