"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
const FetchImage_1 = require("./FetchImage");
const FetchOriginal_1 = require("./FetchOriginal");
const Upload_1 = require("./Upload");
const Gallery = ($id, $database, $storage) => {
    const fetchOriginal = (0, FetchOriginal_1.FetchOriginal)($database, $storage);
    return {
        upload: (0, Upload_1.Upload)($id, $database, $storage),
        fetchOriginal,
        fetchImage: (0, FetchImage_1.FetchImage)($database, $storage, fetchOriginal),
    };
};
exports.Gallery = Gallery;
//# sourceMappingURL=index.js.map