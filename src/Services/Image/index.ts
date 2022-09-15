import Sharp from 'sharp';
import { WhpptConfig } from '../../Config';
import { IdService } from '../Id';
import { MongoService } from '../Mongo';
import { StorageService } from '../Storage';

const optimise: { [key: string]: any } = {
  jpg: (image: any, quality: any) => ({
    contentType: 'image/jpeg',
    img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
  }),
  jpeg: (image: any, quality: any) => ({
    contentType: 'image/jpeg',
    img: image.jpeg({ quality, chromaSubsampling: '4:4:4' }),
  }),
  webp: (image: any, quality: any) => ({
    contentType: 'image/webp',
    img: image.webp({ quality }),
  }),
  png: (image: any, quality: any) => ({
    contentType: 'image/png',
    img: image.png({ quality }),
  }),
};

const pickFormat = function (format: any, accept: any, imageMeta: any) {
  if (!format.f)
    return accept.indexOf('image/webp') !== -1 ? 'webp' : format.t ? 'png' : 'jpg';
  if (format.f === 'orig') return imageMeta.type.split('/')[1];

  return format.f || imageMeta.type.split('/')[1] || format.t ? 'png' : 'jpg';
};

export type ImageService = {
  upload: (file: any) => Promise<any>;
  fetchOriginal: (args: { id: string }) => Promise<any>;
  fetch: (args: { format: any; id: any; accept: string }) => Promise<any>;
  remove: (id: string) => Promise<void>;
};
export type ImageServiceConstructor = (
  $id: IdService,
  $mongo: Promise<MongoService>,
  $storage: StorageService,
  config: WhpptConfig
) => ImageService;

/**
 * @deprecated use gallery
 */
export const Image: ImageServiceConstructor = ($id, $mongo, $storage, config) => {
  const disablePublishing = config.disablePublishing || false;

  const fetch = function ({
    format,
    id,
    accept = '',
  }: {
    format: any;
    id: any;
    accept: string;
  }) {
    if (format.o) return fetchOriginal({ id });

    return $mongo.then(({ $db }) => {
      return Promise.all([
        $db.collection('images').findOne({ _id: id }),
        $storage.fetchImage(id),
      ]).then(([imageMeta, { imageBuffer }]) => {
        const _sharpImage = Sharp(imageBuffer);

        let _extractedImage = _sharpImage;

        if (format.cx && format.cy && format.cw && format.ch) {
          _extractedImage = _sharpImage.extract({
            left: parseInt(format.cx),
            top: parseInt(format.cy),
            width: parseInt(format.cw),
            height: parseInt(format.ch),
          });
        }

        const scale =
          parseFloat(format.s) || parseFloat(process.env.BASE_IMAGE_SCALE || '1') || 1;

        const _resizedImage =
          format.w && format.h
            ? _extractedImage.resize(
                Math.ceil(parseFloat(format.w) * scale),
                Math.ceil(parseFloat(format.h) * scale),
                {
                  withoutEnlargement: true,
                }
              )
            : _extractedImage;

        const imageType = pickFormat(format, accept, imageMeta) as string;
        const quality = parseInt(format.q) || 70;
        const optimiser = optimise[imageType];
        const { img: optimisedImage, contentType } = optimiser(_resizedImage, quality);

        return optimisedImage.toBuffer().then((processedImageBuffer: any) => {
          return {
            Body: processedImageBuffer,
            ContentType: contentType,
          };
        });
      });
    });
  };

  const fetchOriginal = function ({ id }: { id: any }) {
    return $mongo.then(({ $db }) => {
      return $db
        .collection('images')
        .findOne({ _id: id })
        .then((storedImage: any) => {
          return $storage.fetchImage(id).then(({ imageBuffer }) => {
            const response = imageBuffer as any;
            response.Body = imageBuffer;
            response.ContentType = storedImage.type;
            return response;
          });
        });
    });
  };

  const upload = function (file: any) {
    return $mongo.then(({ $db, $dbPub }) => {
      const { buffer, mimetype: type, originalname: name } = file;
      const id = $id.newId();

      return $storage.uploadImage(buffer, id).then(() => {
        const image = {
          _id: id as any,
          version: 'v2',
          uploadedOn: new Date(),
          name,
          type,
        };

        return $db
          .collection('images')
          .insertOne(image)
          .then(() => {
            if (disablePublishing) return Promise.resolve();

            return $dbPub
              .collection('images')
              .insertOne({
                _id: id as any,
                version: 'v2',
                uploadedOn: new Date(),
                name,
                type,
              })
              .then(() => {});
          })
          .then(() => image);
      });
    });
  };

  const remove = function (id: any) {
    return $mongo.then(({ $db }) => {
      return $storage.removeImage(id).then(() =>
        $db
          .collection('images')
          .deleteOne({
            _id: id,
          })
          .then(() => {})
      );
    });
  };

  return { upload, fetchOriginal, fetch, remove };
};
