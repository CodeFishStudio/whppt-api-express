"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const changeDetails = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { product: productData }) {
        (0, assert_1.default)(productData.domainId, 'Product requires a Domain Id.');
        (0, assert_1.default)(productData._id, 'Product requires a Product Id.');
        (0, assert_1.default)(productData.name, 'Product requires a Name.');
        (0, assert_1.default)(productData.productCode, 'Product requires a Product Code.');
        return $database
            .then(({ document, startTransaction }) => {
            return document.fetch('products', productData._id).then(product => {
                (0, assert_1.default)(product, 'Product does not exsist');
                const event = createEvent('ProductDetailsChanged', productData);
                Object.assign(product, (0, lodash_1.omit)(productData, ['config']));
                return startTransaction(session => {
                    return document
                        .saveWithEvents('products', product, [event], { session })
                        .then(() => {
                        if (process.env.DRAFT !== 'true')
                            return;
                        return document.publishWithEvents('products', product, [event], {
                            session,
                        });
                    });
                });
            });
        })
            .then(() => { });
    },
};
exports.default = changeDetails;
//# sourceMappingURL=changeDetails.js.map