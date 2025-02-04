"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterList = {
    exec({ $database }, { domainId, tagFilters, headerFilter, pageIndex = 0, size = 20, queryInput }) {
        return $database.then(database => {
            const { db } = database;
            const query = {
                $or: queryInput
                    ? [
                        { 'header.content.heading': { $regex: queryInput, $options: 'i' } },
                        { 'header.content.title': { $regex: queryInput, $options: 'i' } },
                    ]
                    : [
                        { 'header.content.heading': { $exists: true, $ne: '' } },
                        { 'header.content.title': { $exists: true, $ne: '' } },
                    ],
            };
            if (domainId && domainId !== 'undefined')
                query.domainId = domainId;
            if (tagFilters) {
                if (tagFilters.include.length)
                    query.tags = Object.assign(Object.assign({}, (query.tags || {})), { $all: tagFilters.include });
                if (tagFilters.exclude.length)
                    query.tags = Object.assign(Object.assign({}, (query.tags || {})), { $nin: tagFilters.exclude });
            }
            if (headerFilter) {
                query.$or.map((o) => {
                    return Object.assign(Object.assign({}, o), { $regex: headerFilter, $options: 'i' });
                });
            }
            const _size = Number(size);
            const _pageIndex = Number(pageIndex);
            return db
                .collection('pages')
                .find(query)
                .sort({ 'header.heading': 1 })
                .skip(_pageIndex * _size)
                .limit(_size)
                .toArray();
        });
    },
};
exports.default = filterList;
//# sourceMappingURL=filterList.js.map