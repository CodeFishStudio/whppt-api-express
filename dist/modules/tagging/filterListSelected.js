"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keyBy_1 = __importDefault(require("lodash/keyBy"));
const filterListSelected = {
    exec({ $database }, { domainId, tagFilters }) {
        return $database.then(database => {
            const { db } = database;
            const query = {};
            if (domainId && domainId !== 'undefined')
                query.domainId = domainId;
            if (tagFilters && !tagFilters.selected.length) {
                if (tagFilters.include.length)
                    query.tags = { $in: tagFilters.include };
                if (tagFilters.exclude.length)
                    query.tags = Object.assign(Object.assign({}, (query.tags || {})), { $nin: tagFilters.exclude });
            }
            if (tagFilters && tagFilters.selected.length) {
                query._id = { $in: tagFilters.selected };
            }
            let promise = db.collection('pages').find(query);
            if (!tagFilters.ignoreLimit)
                promise.limit(Number(tagFilters.limit) || 8);
            if (!tagFilters.ignoreSort)
                promise = sortLookup(promise, tagFilters.sort);
            return promise.toArray().then(items => {
                if (!tagFilters.ignoreSort)
                    return items;
                const _keyedItems = (0, keyBy_1.default)(items, '_id');
                return tagFilters.selected.map(s => {
                    return _keyedItems[s];
                });
            });
        });
    },
};
exports.default = filterListSelected;
const sortLookup = (promise, key) => {
    const _key = {
        sortType: key && key.sortType ? key.sortType : 'name (a-z)',
        fields: key && key.fields ? key.fields : { 'header.title': -1 },
    };
    switch (_key.sortType) {
        case 'string':
            return promise.collation({ locale: 'en' }).sort(_key.fields);
        default:
            return promise.sort(_key.fields);
    }
};
//# sourceMappingURL=filterListSelected.js.map