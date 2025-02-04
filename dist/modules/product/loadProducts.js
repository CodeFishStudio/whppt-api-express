"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load = {
    exec({ $database }, { productIds, activeOnly = false }) {
        return $database.then(({ queryDocuments }) => {
            const _query = {
                _id: { $in: JSON.parse(productIds) },
            };
            if (activeOnly && activeOnly !== 'false') {
                _query.isActive = true;
                _query.forSaleOnWebsite = true;
                _query.quantityAvailable = { $ne: '0' };
            }
            return queryDocuments('products', {
                filter: _query,
                projection: {
                    config: 0,
                    user: 0,
                },
            });
        });
    },
};
exports.default = load;
//# sourceMappingURL=loadProducts.js.map