"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const publish = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $salesforce, $database, createEvent }, { productId }) {
        (0, assert_1.default)(productId, 'Product Id is required.');
        return $database
            .then(({ document, startTransaction }) => {
            return document.fetch('products', productId).then(product => {
                (0, assert_1.default)(product, 'Product does not exsist');
                const event = createEvent('ProductPublished', product);
                return startTransaction(session => {
                    return Promise.all([
                        document.saveWithEvents('products', product, [event], { session }),
                        document.publish('products', product, { session }),
                    ]).then(() => {
                        // TODO Consider moving this to an event.
                        return $salesforce.$Oauth().then((token) => {
                            return $salesforce.$upsert(token, product._id, salesForceItem(product));
                        });
                    });
                });
            });
        })
            .then(() => { });
    },
};
const salesForceItem = (item) => {
    return {
        Name: item.name,
        ProductCode: item.productCode,
        Description: item.description,
        Family: item.family,
        StockKeepingUnit: item.customFields.stockKeepingUnit,
        QuantityUnitOfMeasure: item.customFields.quantityUnitOfMeasure,
        Varietal__c: item.customFields.varietal,
        Vintage__c: item.customFields.vintage,
        Bottle_Size__c: item.customFields.bottleSize,
        IsActive: item.isActive,
    };
};
exports.default = publish;
//# sourceMappingURL=publish.js.map