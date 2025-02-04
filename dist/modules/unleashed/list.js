"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database }, { productGroup }) {
        return $database.then(({ queryDocuments }) => {
            const query = productGroup ? { 'ProductGroup.GroupName': productGroup } : {};
            return queryDocuments('unleashed', {
                filter: query,
                projection: {
                    _id: 1,
                    IsSellable: 1,
                    ProductCode: 1,
                    ProductDescription: 1,
                    ProductGroup: 1,
                    UnitOfMeasure: 1,
                },
            });
        });
    },
};
exports.default = list;
//# sourceMappingURL=list.js.map