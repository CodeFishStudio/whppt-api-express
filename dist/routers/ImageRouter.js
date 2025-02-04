"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = void 0;
const assert_1 = __importDefault(require("assert"));
const express_1 = require("express");
const cache = require('express-cache-headers');
const multer = require('multer');
const { parse } = require('uri-js');
const oneDay = 60 * 60 * 24;
const sixMonths = oneDay * 30 * 6;
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');
const imagePath = process.env.BASE_IMAGE_URL
    ? parse(process.env.BASE_IMAGE_URL).path
    : '/img';
const ImageRouter = $logger => {
    const router = (0, express_1.Router)();
    router.get(`${imagePath}/:imageId`, cache({ ttl: sixMonths }), (req, res) => {
        const { accept } = req.headers;
        return req.moduleContext.then(({ $image }) => {
            (0, assert_1.default)($image, 'Image service has not been configured');
            return $image
                .fetch({ id: req.params.imageId, format: req.query, accept: accept || '' })
                .then(response => {
                if (!response)
                    return res.status(404).send('Image not found');
                res.type(response.ContentType).send(response.Body);
            })
                .catch(err => {
                $logger.error(err);
                res.status(404).send(err.message || err);
            });
        });
    });
    router.post(`${imagePath}/upload`, upload, (req, res) => {
        const { file } = req;
        if (!file)
            return { message: 'Image file not found' };
        req.moduleContext
            .then(({ $image }) => {
            (0, assert_1.default)($image, 'Image service has not been configured');
            return $image.upload(file).then(image => res.json(image));
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    router.post(`${imagePath}/remove`, (req, res) => {
        const { id } = req.body;
        req.moduleContext
            .then(({ $image }) => {
            (0, assert_1.default)($image, 'Image service has not been configured');
            return $image.remove(id).then(data => res.json(data));
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    return router;
};
exports.ImageRouter = ImageRouter;
//# sourceMappingURL=ImageRouter.js.map