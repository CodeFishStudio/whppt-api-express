"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateShippingPrice = void 0;
const BOX_QTY = 12;
const calculateShippingPrice = (items, price) => {
    let bottles = 0;
    items.forEach((item) => {
        var _a, _b, _c, _d, _e, _f;
        if ((_a = item.product) === null || _a === void 0 ? void 0 : _a.freeDelivery)
            return;
        if (((_b = item.product) === null || _b === void 0 ? void 0 : _b.customFields.quantityUnitOfMeasure) === 'pack') {
            const itemsInPacks = ((_d = (_c = item.product) === null || _c === void 0 ? void 0 : _c.customFields) === null || _d === void 0 ? void 0 : _d.packItems) || [];
            bottles +=
                item.quantity *
                    itemsInPacks.reduce((acc, item) => {
                        acc += item.qty;
                        return acc;
                    }, 0) +
                    item.quantity;
            return;
        }
        bottles += item.quantity * (((_f = (_e = item.product) === null || _e === void 0 ? void 0 : _e.customFields) === null || _f === void 0 ? void 0 : _f.qtyOfItemsInProduct) || 1);
    });
    return calculateBoxes(bottles) * Number(price);
};
exports.calculateShippingPrice = calculateShippingPrice;
const calculateBoxes = (bottles) => {
    return Math.ceil(bottles / BOX_QTY);
};
//# sourceMappingURL=calculateShippingPrice.js.map