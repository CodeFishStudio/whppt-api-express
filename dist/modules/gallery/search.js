"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const search = {
    authorise({ $roles }, { user }) {
        // TODO: Gallery Security
        const requiredRoles = [];
        return $roles.validate(user, [requiredRoles]);
    },
    exec({ $mongo: { $db } }, { domainId, page, size, type, filterTag, queryTags }) {
        (0, assert_1.default)(domainId, 'Please provide a domainId');
        const pageNum = (page && parseInt(page)) || 1;
        const sizeNum = (size && parseInt(size)) || 30;
        queryTags = queryTags || [];
        const query = {
            domainId,
            type,
        };
        const filterQuery = { $elemMatch: { $eq: filterTag } };
        const searchQuery = {
            $in: queryTags.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
        };
        if (filterTag && !queryTags.length)
            query.tags = filterQuery;
        if (queryTags.length && !filterTag)
            query.tags = searchQuery;
        if (filterTag && queryTags.length)
            query.tags = { $and: [filterQuery, searchQuery] };
        return Promise.all([
            $db
                .collection('gallery')
                .find(query, { projection: { fileInfo: 1 } })
                .skip(sizeNum * (pageNum - 1))
                .limit(sizeNum)
                .toArray(),
            $db.collection('gallery').countDocuments(query),
        ]).then(([items, total]) => ({ items, total }));
    },
};
exports.default = search;
//# sourceMappingURL=search.js.map