"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcShipingCost = void 0;
const lodash_1 = require("lodash");
const postcodeRange_1 = require("../../../delivery/Queries/postcodeRange");
const calculateShippingPrice_1 = require("../helpers/calculateShippingPrice");
const calcShipingCost = ({ postcode, delivery, pickup, override, items, country, }) => {
    var _a, _b, _c, _d, _e, _f;
    if (pickup || !postcode)
        return {
            price: 0,
            allowCheckout: true,
            message: '',
            type: 'pickup',
        };
    if (override === null || override === void 0 ? void 0 : override.override)
        return override;
    const metro = (0, postcodeRange_1.postcodeInRange)(delivery.aus_metro.postcodes, parseInt(postcode, 10));
    const regional = (0, postcodeRange_1.postcodeInRange)(delivery.aus_regional.postcodes, parseInt(postcode, 10));
    const acceptableAULocations = ['au', 'australia', 'aus'];
    if (!country || !(0, lodash_1.find)(acceptableAULocations, a => a === country.toLowerCase()))
        return {
            price: (0, calculateShippingPrice_1.calculateShippingPrice)(items, (_a = delivery.international) === null || _a === void 0 ? void 0 : _a.price) || 0,
            allowCheckout: ((_b = delivery.international) === null || _b === void 0 ? void 0 : _b.allowCheckout) || false,
            message: (_c = delivery.international) === null || _c === void 0 ? void 0 : _c.message,
            type: 'international',
        };
    if (metro)
        return {
            price: (0, calculateShippingPrice_1.calculateShippingPrice)(items, delivery.aus_metro.price) || 0,
            allowCheckout: delivery.aus_metro.allowCheckout,
            message: delivery.aus_metro.message,
            type: 'aus_metro',
        };
    if (regional)
        return {
            price: (0, calculateShippingPrice_1.calculateShippingPrice)(items, delivery.aus_regional.price) || 0,
            allowCheckout: delivery.aus_regional.allowCheckout,
            message: delivery.aus_regional.message,
            type: 'aus_regional',
        };
    return {
        price: (0, calculateShippingPrice_1.calculateShippingPrice)(items, (_d = delivery.international) === null || _d === void 0 ? void 0 : _d.price) || 0,
        allowCheckout: ((_e = delivery.international) === null || _e === void 0 ? void 0 : _e.allowCheckout) || false,
        message: (_f = delivery.international) === null || _f === void 0 ? void 0 : _f.message,
        type: 'international',
    };
};
exports.calcShipingCost = calcShipingCost;
//# sourceMappingURL=calcPrice.js.map