"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const replaceInList_1 = require("../../replaceInList");
const changeImage = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { domainId, productId, image, featureImageId }) {
        (0, assert_1.default)(domainId, 'Domain Id required.');
        (0, assert_1.default)(productId, 'Product Id required.');
        (0, assert_1.default)(image._id, 'Image required.');
        (0, assert_1.default)(image.desktop.galleryItemId, 'Product requires at minimum a Desktop image.');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('products', productId).then(product => {
                (0, assert_1.default)(product, 'Product does not exsist');
                (0, assert_1.default)(product.images, 'Could not find image to save on product');
                const events = [
                    createEvent('ProductImageDetailsChanged', { _id: productId, image }),
                ];
                if (featureImageId && product.featureImageId !== featureImageId) {
                    events.push(createEvent('ProductFeatureImageChanged', { _id: productId, featureImageId }));
                    Object.assign(product, { featureImageId });
                }
                Object.assign(product, { images: (0, replaceInList_1.replaceInList)(product.images, image) });
                return startTransaction(session => {
                    return document.saveWithEvents('products', product, events, { session });
                }).then(() => { });
            });
        });
    },
};
exports.default = changeImage;
//# sourceMappingURL=changeImage.js.map