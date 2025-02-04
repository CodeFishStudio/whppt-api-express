"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter = {
    exec({ $database }, { domainId, limit, currentPage, filters = {}, forViewingOn }) {
        var _a;
        let query = {
            domainId,
            isActive: true,
        };
        if (filters.vintage && filters.vintage !== 'all') {
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [...query.$and, { 'customFields.vintage': filters.vintage }])
                    : (query.$and = [{ 'customFields.vintage': filters.vintage }]) });
        }
        if (filters.collection && filters.collection !== 'all') {
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [...query.$and, { family: filters.collection }])
                    : (query.$and = [{ family: filters.collection }]) });
        }
        if (filters.style && filters.style !== 'all') {
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [...query.$and, { 'customFields.varietal': filters.style }])
                    : (query.$and = [{ 'customFields.varietal': filters.style }]) });
        }
        if (((_a = filters === null || filters === void 0 ? void 0 : filters.filterNames) === null || _a === void 0 ? void 0 : _a.length) &&
            !filters.filterNames.find(f => f.value === 'all')) {
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [
                        ...query.$and,
                        {
                            'customFields.filterName': {
                                $in: filters.filterNames.map(f => f.value),
                            },
                        },
                    ])
                    : (query.$and = [
                        {
                            'customFields.filterName': {
                                $in: filters.filterNames.map(f => f.value),
                            },
                        },
                    ]) });
        }
        if (forViewingOn) {
            const _filter = forViewingOn === 'pos'
                ? { forSaleOnPos: { $eq: true } }
                : { forSaleOnWebsite: { $eq: true } };
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [...query.$and, _filter])
                    : (query.$and = [_filter]) });
        }
        if (filters.search) {
            query = Object.assign(Object.assign({}, query), { $and: query.$and
                    ? (query.$and = [
                        ...query.$and,
                        { name: { $regex: filters.search, $options: 'i' } },
                    ])
                    : (query.$and = [{ name: { $regex: filters.search, $options: 'i' } }]) });
        }
        const sortFilter = sortLookup(filters.sortBy || 'recommended');
        return $database.then(({ queryDocuments, countDocuments }) => {
            return Promise.all([
                queryDocuments('products', {
                    filter: query,
                    sort: sortFilter,
                    skip: parseInt(limit) * parseInt(currentPage),
                    limit: parseInt(limit),
                }),
                countDocuments('products', { filter: query }),
            ]).then(([products, total = 0]) => {
                const productIds = products.map(p => p._id);
                return queryDocuments('pages', {
                    filter: { productId: { $in: productIds } },
                }).then(pages => {
                    return {
                        products: products.map(p => {
                            var _a;
                            const slug = (_a = pages.find(page => page.productId === p._id)) === null || _a === void 0 ? void 0 : _a.slug;
                            return Object.assign(Object.assign({}, p), { slug });
                        }),
                        total,
                    };
                });
            });
        });
    },
};
exports.default = filter;
function sortLookup(key) {
    switch (key) {
        case 'name (a-z)':
            return {
                name: 1,
                vintage: -1,
            };
        case 'name (z-a)':
            return {
                name: -1,
            };
        case 'price (lowest to highest)':
            return {
                price: 1,
            };
        case 'price (highest to lowest)':
            return {
                price: -1,
            };
        default:
            return { name: 1, vintage: -1 };
    }
}
//# sourceMappingURL=filter.js.map