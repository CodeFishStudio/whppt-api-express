"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingCost = void 0;
const assert_1 = __importDefault(require("assert"));
const calcPrice_1 = require("./calcPrice");
const getShippingCost = ({ $database }, { postcode, domainId, pickup, override, items, country }) => {
    if (pickup || !postcode)
        return Promise.resolve({
            price: 0,
            allowCheckout: true,
            message: '',
            type: 'pickup',
        });
    if (override === null || override === void 0 ? void 0 : override.override)
        return Promise.resolve(override);
    return $database.then(({ document }) => {
        (0, assert_1.default)(postcode, 'Postcode is required');
        (0, assert_1.default)(domainId, 'DomainId is required');
        return document.fetch('site', `delivery_${domainId}`).then(delivery => {
            if (!delivery)
                throw new Error('Delivery must be set up');
            return (0, calcPrice_1.calcShipingCost)({
                postcode,
                country,
                delivery,
                pickup,
                override,
                items,
            });
        });
    });
};
exports.getShippingCost = getShippingCost;
//# sourceMappingURL=index.js.map