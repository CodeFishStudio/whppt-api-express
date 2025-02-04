"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const assert_1 = __importDefault(require("assert"));
const express_1 = require("express");
const cache = require('express-cache-headers');
const multer = require('multer');
const oneDay = 60 * 60 * 24;
const sixMonths = oneDay * 30 * 6;
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');
const FileRouter = $logger => {
    const router = (0, express_1.Router)();
    router.post('/file/uploadFile', upload, (req, res) => {
        const { file } = req;
        const { description } = req.body;
        if (!file)
            return { message: 'File not found' };
        return req.moduleContext
            .then(({ $file }) => {
            (0, assert_1.default)($file, 'File service has not been configured');
            return $file.upload(file, description).then(() => {
                return res.sendStatus(200);
            });
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    router.post('/file/removeFile', (req, res) => {
        const fileId = req.body._id;
        return req.moduleContext
            .then(({ $file }) => {
            (0, assert_1.default)($file, 'File service has not been configured');
            return $file.remove(fileId).then(() => {
                return res.sendStatus(200);
            });
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    //backwards compatibility only - Stopped using on the 4/8/20
    router.get('/file/getFile/:fileId', cache({ ttl: sixMonths }), (req, res) => {
        return req.moduleContext
            .then(({ $database }) => {
            return $database.then(({ document }) => {
                const { fileId } = req.params;
                return document.fetch('files', fileId).then((file) => {
                    res.redirect(`/file/${fileId}/${file.name}`);
                });
            });
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    router.get('/file/:id/:name', cache({ ttl: sixMonths }), (req, res) => {
        const { id } = req.params;
        return req.moduleContext
            .then(({ $file }) => {
            (0, assert_1.default)($file, 'File service has not been configured');
            return $file.fetchOriginal({ id }).then(fileBuffer => {
                if (!fileBuffer)
                    return res.status(500).send('File not found');
                return res.type(fileBuffer.ContentType).send(fileBuffer.Body);
            });
        })
            .catch(err => {
            $logger.error(err);
            res.status(500).send(err.message || err);
        });
    });
    router.get('/file/:id', (req, res) => {
        return req.moduleContext
            .then(({ $database }) => {
            return $database.then(({ document }) => {
                const { id } = req.params;
                return document.fetch('files', id).then((file) => {
                    res.redirect(`/file/${id}/${file.name}`);
                });
            });
        })
            .catch(err => {
            $logger.error(err);
            res.status(err.http_code || 500).send(err.message || err);
        });
    });
    return router;
};
exports.FileRouter = FileRouter;
//# sourceMappingURL=FileRouter.js.map