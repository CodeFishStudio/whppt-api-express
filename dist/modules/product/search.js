"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database }, { domainId, search }) {
        const query = {
            domainId,
            isActive: true,
        };
        const projection = {
            _id: 1,
            name: 1,
            productCode: 1,
            vintage: 1,
            freeDelivery: 1,
        };
        if (search)
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { productCode: { $regex: search, $options: 'i' } },
            ];
        return $database.then(({ queryDocuments }) => {
            return queryDocuments('products', {
                filter: query,
                projection,
            }).then(products => {
                return { products };
            });
        });
    },
};
exports.default = search;
//# sourceMappingURL=search.js.map