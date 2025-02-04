"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchOriginal = void 0;
const FetchOriginal = ($database, $storage) => ({ itemId, type }) => {
    return $database.then(({ document }) => {
        return document.fetch('gallery', itemId).then(storedItem => {
            return $storage.fetch(itemId, type).then((fileBuffer) => {
                var _a;
                const response = fileBuffer;
                response.Body = fileBuffer;
                response.ContentType = (_a = storedItem === null || storedItem === void 0 ? void 0 : storedItem.fileInfo) === null || _a === void 0 ? void 0 : _a.type;
                return response;
            });
        });
    });
};
exports.FetchOriginal = FetchOriginal;
//# sourceMappingURL=FetchOriginal.js.map