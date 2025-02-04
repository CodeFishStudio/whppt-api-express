"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCollections = void 0;
const lodash_1 = require("lodash");
const buildCollections = config => {
    const _collections = config.collections || [];
    const pageTypeCollections = (0, lodash_1.compact)((0, lodash_1.map)(config.pageTypes, pageType => (pageType.collection && pageType.collection.name) || pageType.key));
    const pageTypeHistoryCollections = (0, lodash_1.map)(pageTypeCollections, pageTypeName => pageTypeName + 'History');
    return [
        'dependencies',
        'gallery',
        'users',
        'domains',
        ..._collections,
        ...pageTypeCollections,
        ...pageTypeHistoryCollections,
    ];
};
exports.buildCollections = buildCollections;
//# sourceMappingURL=buildCollections.js.map