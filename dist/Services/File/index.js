"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const assert_1 = __importDefault(require("assert"));
const file_type_1 = __importDefault(require("file-type"));
/**
 * @deprecated use gallery
 */
const File = ($id, $database, $storage, config) => {
    const upload = function (file, description) {
        return $database.then(database => {
            const { $db, $dbPub } = database;
            const { buffer, mimetype: type, originalname: name } = file;
            const id = $id.newId();
            (0, assert_1.default)($dbPub, 'Publishing database is not configured');
            return file_type_1.default.fromBuffer(buffer).then(fType => {
                return $storage.uploadDoc(buffer, id, {}).then(() => {
                    return $db
                        .collection('files')
                        .insertOne({
                        _id: id,
                        uploadedOn: new Date(),
                        name,
                        type,
                        fileType: fType,
                        description: description || '',
                    })
                        .then(() => {
                        if (config.disablePublishing)
                            return Promise.resolve();
                        return $dbPub
                            .collection('files')
                            .insertOne({
                            _id: id,
                            uploadedOn: new Date(),
                            name,
                            type,
                            fileType: fType,
                            description: description || '',
                        })
                            .then(() => { });
                    });
                });
            });
        });
    };
    const remove = function (fileId) {
        return $database.then(({ $delete, $unpublish }) => {
            return $unpublish('files', fileId).then(() => {
                return $delete('files', fileId).then(() => {
                    return $storage.removeDoc(fileId);
                });
            });
        });
    };
    const fetchOriginal = function ({ id }) {
        return $database.then(({ document }) => {
            return document.fetch('files', id).then((storedImage) => {
                return $storage.fetchDoc(id).then((docBuffer) => {
                    const response = docBuffer;
                    response.Body = docBuffer;
                    response.ContentType = storedImage.type;
                    return response;
                });
            });
        });
    };
    return { upload, remove, fetchOriginal };
};
exports.File = File;
//# sourceMappingURL=index.js.map