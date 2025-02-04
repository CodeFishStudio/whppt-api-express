"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const assert_1 = __importDefault(require("assert"));
const file_type_1 = __importDefault(require("file-type"));
const Upload = ($id, $database, $storage) => {
    return ({ file, domainId, type }) => {
        console.log('🚀 Upload starting');
        return Promise.resolve().then(() => {
            console.log('🚀 Upload called');
            (0, assert_1.default)(file, 'File to upload is required');
            (0, assert_1.default)(domainId, 'Domain Id is required');
            (0, assert_1.default)(type, 'File type is required');
            const { buffer, mimetype, originalname } = file;
            return file_type_1.default.fromBuffer(buffer).then(fileType => {
                console.log('🚀 Upload after buffer');
                const newGalleryItem = {
                    _id: $id.newId(),
                    domainId,
                    type,
                    fileInfo: {
                        originalname,
                        ext: fileType === null || fileType === void 0 ? void 0 : fileType.ext,
                        mime: fileType === null || fileType === void 0 ? void 0 : fileType.mime,
                        type: mimetype,
                    },
                    tags: [],
                    suggestedTags: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    date: new Date(),
                };
                return $database.then(({ startTransaction, document }) => {
                    console.log('🚀 Upload db ');
                    return startTransaction(session => {
                        console.log('🚀 Upload db transaction');
                        return document.save('gallery', newGalleryItem, { session }).then(() => {
                            console.log('🚀 Upload db save done 2');
                            return document.publish('gallery', newGalleryItem, { session }).then(() => {
                                console.log('🚀 Upload db saved');
                                return $storage.upload(buffer, newGalleryItem._id, type, {});
                            });
                        });
                    }).then(() => newGalleryItem);
                });
            });
        });
    };
};
exports.Upload = Upload;
//# sourceMappingURL=Upload.js.map