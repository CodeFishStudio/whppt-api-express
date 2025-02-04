"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductQuantityAfterSale = void 0;
const assert_1 = __importDefault(require("assert"));
const updateProductQuantityAfterSale = (context, items) => {
    return context.$database.then(({ document, queryDocuments, startTransaction }) => {
        const _productIds = items.map(i => i.productId);
        return queryDocuments('products', {
            filter: { _id: { $in: _productIds } },
        }).then(products => {
            return startTransaction((session) => {
                const _updatePromises = items.reduce((prev, orderItem) => {
                    return prev.then(() => saveDocs(context, orderItem, products, { document, session }));
                }, Promise.resolve());
                return _updatePromises;
            });
        });
    });
};
exports.updateProductQuantityAfterSale = updateProductQuantityAfterSale;
const saveDocs = (context, item, products, { document, session }) => {
    (0, assert_1.default)(item.productId, 'Product needs to have an ID');
    const product = products.find((p) => p._id === item.productId);
    (0, assert_1.default)(product === null || product === void 0 ? void 0 : product._id, 'Product not found');
    const quantity = Number(item.quantity);
    const quantityAvailable = Number(product.quantityAvailable);
    const updatedQuantity = quantityAvailable - quantity;
    product.quantityAvailable = `${updatedQuantity}`;
    const events = [context.createEvent('ProductQuantityDecreasedAfterSale', product)];
    return document
        .saveWithEvents('products', product, events, {
        session,
    })
        .then(() => {
        if (process.env.DRAFT !== 'true')
            return;
        return document.publishWithEvents('products', product, events, {
            session,
        });
    });
};
//# sourceMappingURL=UpdateProductQuantityAfterSale.js.map