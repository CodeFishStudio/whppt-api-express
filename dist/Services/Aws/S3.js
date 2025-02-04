"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const S3 = $hosting => {
    const clients = {};
    const getClient = (apiKey, config) => {
        var _a, _b, _c;
        const client = clients[apiKey];
        if (client)
            return client;
        const region = (_a = config.aws) === null || _a === void 0 ? void 0 : _a.region;
        const accessKeyId = (_b = config.aws) === null || _b === void 0 ? void 0 : _b.accessKeyId;
        const secretAccessKey = (_c = config.aws) === null || _c === void 0 ? void 0 : _c.secretAccessKey;
        if (!region)
            throw new Error('AWS Region is required');
        if (!accessKeyId)
            throw new Error('AWS access key id is required');
        if (!secretAccessKey)
            throw new Error('AWS secret access key is required');
        const newClient = new client_s3_1.S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
        clients[apiKey] = newClient;
        return newClient;
    };
    const upload = (path, fileBuffer, meta = {}) => {
        return $hosting.then(({ storage, apiKey }) => {
            var _a;
            const bucketName = (_a = storage.aws) === null || _a === void 0 ? void 0 : _a.bucket;
            if (!bucketName)
                return Promise.reject('S3 bucket name is required.');
            const s3Client = getClient(apiKey, storage);
            return s3Client
                .send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: path,
                Body: fileBuffer,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                Metadata: meta,
            }))
                .then(() => {
                console.log('🚀 GALLERY UPLOAD PASSED');
            })
                .catch(err => {
                console.log('🚀 GALLERY return$hosting.then ~ err:', err);
                throw new Error((err === null || err === void 0 ? void 0 : err.message) || 'Uploading image failed.');
            });
        });
    };
    const remove = (path) => {
        return $hosting.then(({ storage, apiKey }) => {
            var _a;
            const bucketName = (_a = storage.aws) === null || _a === void 0 ? void 0 : _a.bucket;
            if (!bucketName)
                return Promise.reject('S3 bucket name is required.');
            const s3Client = getClient(apiKey, storage);
            return s3Client
                .send(new client_s3_1.DeleteObjectCommand({
                Bucket: bucketName,
                Key: path,
            }))
                .then(() => { })
                .catch(err => {
                throw new Error((err === null || err === void 0 ? void 0 : err.message) || 'Removing image failed.');
            });
        });
    };
    const streamToBuffer = (stream) => new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
    const fetch = (path) => {
        return $hosting.then(({ storage, apiKey }) => {
            var _a;
            const bucketName = (_a = storage.aws) === null || _a === void 0 ? void 0 : _a.bucket;
            if (!bucketName)
                return Promise.reject('S3 bucket name is required.');
            const s3Client = getClient(apiKey, storage);
            return s3Client
                .send(new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: path,
            }))
                .then(fileData => {
                if (!fileData || !fileData.Body)
                    throw new Error('No file body');
                return streamToBuffer(fileData.Body);
            })
                .catch(err => {
                throw new Error(err.message || 'Fetching image failed');
            });
        });
    };
    return {
        upload(fileBuffer, id, type, meta) {
            const path = type ? `${type}/${id}` : id;
            return upload(path, fileBuffer, meta);
        },
        remove(id, type) {
            return remove(`${type}/${id}`);
        },
        fetch(id, type) {
            return fetch(`${type}/${id}`);
        },
        uploadImage(fileBuffer, id, meta) {
            return upload(`images/${id}`, fileBuffer, meta);
        },
        uploadDoc(fileBuffer, id, meta) {
            return upload(`docs/${id}`, fileBuffer, meta);
        },
        fetchImage(id) {
            return fetch(`images/${id}`);
        },
        fetchDoc(id) {
            return fetch(`docs/${id}`);
        },
        removeImage(id) {
            return remove(`images/${id}`);
        },
        removeDoc(id) {
            return remove(`docs/${id}`);
        },
    };
};
exports.S3 = S3;
//# sourceMappingURL=S3.js.map