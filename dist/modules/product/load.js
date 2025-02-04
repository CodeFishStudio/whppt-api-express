"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load = {
    exec({ $database }, { productId }) {
        return $database.then(({ document, queryDocuments }) => {
            return document.fetch('products', productId).then(product => {
                var _a, _b;
                if (!product)
                    return Promise.reject({
                        status: 404,
                        error: new Error(`Product Not Found`),
                    });
                const connectedVintageIds = (_b = (_a = product === null || product === void 0 ? void 0 : product.customFields) === null || _a === void 0 ? void 0 : _a.vintages) === null || _b === void 0 ? void 0 : _b.map((v) => v.productId);
                if (!connectedVintageIds || !connectedVintageIds.length)
                    return product;
                return queryDocuments('pages', {
                    filter: {
                        productId: { $in: connectedVintageIds },
                    },
                    projection: {
                        slug: 1,
                        productId: 1,
                    },
                }).then(pages => {
                    var _a, _b;
                    return Object.assign(Object.assign({}, product), { customFields: Object.assign(Object.assign({}, product.customFields), { vintages: (_b = (_a = product === null || product === void 0 ? void 0 : product.customFields) === null || _a === void 0 ? void 0 : _a.vintages) === null || _b === void 0 ? void 0 : _b.map((v) => {
                                const foundPage = pages.find(p => p.productId === v.productId);
                                return Object.assign(Object.assign({}, v), { slug: foundPage === null || foundPage === void 0 ? void 0 : foundPage.slug });
                            }) }) });
                });
            });
        });
    },
};
exports.default = load;
//# sourceMappingURL=load.js.map