"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const removeImage = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { domainId, productId, imageId }) {
        (0, assert_1.default)(domainId, 'Domain Id required.');
        (0, assert_1.default)(productId, 'Product Id required.');
        (0, assert_1.default)(imageId, 'Image Id is required.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('products', productId).then(product => {
                (0, assert_1.default)(product, 'Product does not exsist');
                const events = [createEvent('ProductImageRemoved', { _id: productId, imageId })];
                Object.assign(product, {
                    images: product.images.filter(_image => _image._id !== imageId),
                });
                const nextFeatureImage = product.images[0];
                if (product.featureImageId === imageId && nextFeatureImage) {
                    events.push(createEvent('ProductFeatureImageChanged', {
                        _id: productId,
                        featureImageId: nextFeatureImage._id,
                    }));
                    Object.assign(product, {
                        domainId,
                        productId,
                        featureImageId: nextFeatureImage._id,
                    });
                }
                return startTransaction(session => {
                    return document.saveWithEvents('products', product, events, { session });
                }).then(() => { });
            });
        });
    },
};
exports.default = removeImage;
//# sourceMappingURL=removeImage.js.map