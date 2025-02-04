"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const create = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, $id, createEvent }, { domainId, name, productCode, user }) {
        (0, assert_1.default)(domainId, 'Product requires a Domain Id.');
        (0, assert_1.default)(name, 'Product requires a Name.');
        (0, assert_1.default)(productCode, 'Product requires a Product Code.');
        return $database.then(({ pubDb, document, startTransaction }) => {
            (0, assert_1.default)(pubDb, 'Pub DB is undefined');
            return queryDocument(pubDb, { filter: { name, productCode, domainId } }).then(_product => {
                if (_product)
                    throw new Error(`Product already exists with Code: ${productCode} and Name ${name}. Product that already exists is ${_product === null || _product === void 0 ? void 0 : _product.name}`);
                const product = Object.assign({}, {
                    _id: $id.newId(),
                    domainId,
                    name,
                    productCode,
                    isActive: false,
                    config: {},
                    customFields: {},
                    images: [],
                });
                const event = createEvent('CreateProduct', {
                    product,
                    user: { _id: user._id, username: user.username },
                });
                return startTransaction(session => {
                    return document
                        .saveWithEvents('products', product, [event], { session })
                        .then(() => {
                        if (process.env.DRAFT !== 'true')
                            return product;
                        return document
                            .publishWithEvents('products', product, [event], {
                            session,
                        })
                            .then(() => {
                            return product;
                        });
                    });
                });
            });
        });
    },
};
const queryDocument = (pubDb, query) => {
    return pubDb.collection('products').findOne(query.filter);
};
exports.default = create;
//# sourceMappingURL=create.js.map