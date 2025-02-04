"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRouter = void 0;
const express_1 = require("express");
const FetchImage_1 = require("../Services/Gallery/FetchImage");
const cache = require('express-cache-headers');
const multer = require('multer');
const router = (0, express_1.Router)();
const oneDay = 60 * 60 * 24;
const sixMonths = oneDay * 30 * 6;
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');
const GalleryRouter = ($logger, apiPrefix) => {
    router.post(`/${apiPrefix}/gallery/upload`, upload, (req, res) => {
        console.log('🚀 gallery/upload Starting');
        const { file } = req;
        const { domainId, type } = req.body;
        if (!file)
            return res.status(404).json({ message: 'File not found' });
        console.log('🚀 gallery/upload got file');
        return req.moduleContext.then(({ $gallery }) => {
            console.log('🚀 gallery/upload built context');
            if (!$gallery)
                throw new Error('Gallery is required');
            console.log('🚀 gallery/upload context gallery check');
            return $gallery
                .upload({ file, domainId, type })
                .then(galleryItem => {
                console.log('🚀 gallery/upload gallery upload done');
                return res.json(galleryItem);
            })
                .catch(err => {
                console.log('🚀 ~ file: GalleryRouter.ts:38 ~ return ~ err:', err);
                $logger.error(err);
                res.status(err.http_code || 500).send(err);
            });
        });
    });
    router.get(`/${apiPrefix}/gallery-file/image/:imageId`, cache({ ttl: sixMonths }), (req, res) => {
        return req.moduleContext
            .then(({ $gallery }) => {
            if (!$gallery)
                throw new Error('Gallery is required');
            const { accept } = req.headers;
            const format = (0, FetchImage_1.parseImageFormat)(req.query);
            return $gallery
                .fetchImage({ itemId: req.params.imageId, format, accept })
                .then((response) => {
                if (!response)
                    return res.status(404).send('Image not found');
                res.type(response.ContentType).send(response.Body);
            });
        })
            .catch((err) => {
            $logger.error(err);
            res.status(500).send(err);
        });
    });
    router.get(`/${apiPrefix}/gallery-file/svg/:svgId`, cache({ ttl: sixMonths }), (req, res) => {
        return req.moduleContext
            .then(({ $gallery }) => {
            if (!$gallery)
                throw new Error('Gallery is required');
            return $gallery
                .fetchOriginal({ itemId: req.params.svgId, type: 'svg' })
                .then((response) => {
                if (!response)
                    return res.status(404).send('Image not found');
                res.type(response.ContentType).send(response.Body);
            });
        })
            .catch((err) => {
            $logger.error(err);
            res.status(500).send(err);
        });
    });
    router.get(`/${apiPrefix}/gallery-file/video/:videoId`, cache({ ttl: sixMonths }), (req, res) => {
        return req.moduleContext
            .then(({ $gallery }) => {
            if (!$gallery)
                throw new Error('Gallery is required');
            return $gallery
                .fetchOriginal({ itemId: req.params.videoId, type: 'video' })
                .then((response) => {
                if (!response)
                    return res.status(404).send('Video not found');
                res.type(response.ContentType).send(response.Body);
            });
        })
            .catch((err) => {
            $logger.error(err);
            res.status(500).send(err);
        });
    });
    router.get(`/${apiPrefix}/gallery-file/doc/:id/:name`, cache({ ttl: sixMonths }), (req, res) => {
        const { id } = req.params;
        return req.moduleContext
            .then(({ $gallery }) => {
            if (!$gallery)
                throw new Error('Gallery is required');
            return $gallery
                .fetchOriginal({ itemId: id, type: 'doc' })
                .then((fileBuffer) => {
                if (!fileBuffer)
                    return res.status(500).send('File not found');
                return res.type(fileBuffer.ContentType).send(fileBuffer.Body);
            });
        })
            .catch((err) => {
            $logger.error(err);
            res.status(500).send(err);
        });
    });
    router.get(`/${apiPrefix}/gallery-file/file/:id`, (req, res) => {
        const { id } = req.params;
        return req.moduleContext
            .then(({ $database }) => {
            if (!$database)
                throw new Error('Database connection is required');
            return $database.then(db => {
                return db.document.fetch('gallery', id).then(item => {
                    var _a;
                    res.redirect(`/${apiPrefix}/gallery-file/doc/${id}/${(_a = item === null || item === void 0 ? void 0 : item.fileInfo) === null || _a === void 0 ? void 0 : _a.originalname}`);
                });
            });
        })
            .catch((err) => {
            $logger.error(err);
            res.status(500).send(err);
        });
    });
    return router;
};
exports.GalleryRouter = GalleryRouter;
// const trackEvent = (medium: string, campaign: string, fileName: string) => {
//   const trackingId = process.env.GA_TRACKING_ID;
//   if (!trackingId || !trackingId.length) return Promise.resolve();
//   if (!medium || !campaign || !fileName) return Promise.resolve();
//   const data = {
//     v: '1',
//     tid: trackingId,
//     cm: medium,
//     cc: fileName,
//     cn: campaign,
//   };
//   return fetch('http://www.google-analytics.com/debug/collect', {
//     params: data,
//   });
// };
//# sourceMappingURL=GalleryRouter.js.map