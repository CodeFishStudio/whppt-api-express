"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOrder = void 0;
const loadOrder = ({ $database }, orderId) => {
    return $database.then(database => {
        const { document } = database;
        return document.fetch('orders', orderId);
    });
};
exports.loadOrder = loadOrder;
//# sourceMappingURL=loadOrder.js.map