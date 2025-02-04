"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConfig = void 0;
exports.saveConfig = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database, createEvent }, { productId, key, value }) {
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('products', productId).then(product => {
                const events = [];
                product.config
                    ? (product.config[key] = value)
                    : (product.config = { [key]: value });
                events.push(createEvent('ProductConfigSaved', { _id: productId, key, value }));
                return startTransaction(session => {
                    return document
                        .saveWithEvents('products', product, events, { session })
                        .then(() => {
                        if (process.env.DRAFT !== 'true')
                            return;
                        return document.publishWithEvents('products', product, events, {
                            session,
                        });
                    });
                });
            });
        });
    },
};
exports.default = exports.saveConfig;
//# sourceMappingURL=saveConfig.js.map