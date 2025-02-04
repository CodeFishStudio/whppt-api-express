"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const addImage = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent, $id }, { domainId, productId, image, featureImageId }) {
        (0, assert_1.default)(domainId, 'Product requires a Domain Id.');
        (0, assert_1.default)(productId, 'Product requires a Product Id.');
        (0, assert_1.default)(image.desktop.galleryItemId, 'Product requires at minimum a Desktop image.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('products', productId).then(product => {
                (0, assert_1.default)(product, 'Product does not exsist');
                const newImage = Object.assign(Object.assign({}, image), { _id: $id.newId() });
                const events = [
                    createEvent('ProductImageAdded', { _id: productId, image: newImage }),
                ];
                Object.assign(product, {
                    images: product.images ? [...product.images, newImage] : [newImage],
                });
                if (!product.featureImageId) {
                    events.push(createEvent('ProductFeatureImageChanged', {
                        _id: productId,
                        featureImageId: newImage._id,
                    }));
                    Object.assign(product, { featureImageId: newImage._id });
                }
                else if (featureImageId && product.featureImageId !== featureImageId) {
                    events.push(createEvent('ProductFeatureImageChanged', { _id: productId, featureImageId }));
                    Object.assign(product, { featureImageId });
                }
                return startTransaction(session => {
                    return document.saveWithEvents('products', product, events, { session });
                }).then(() => newImage);
            });
        });
    },
};
exports.default = addImage;
//# sourceMappingURL=addImage.js.map