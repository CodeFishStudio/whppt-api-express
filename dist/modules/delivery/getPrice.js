"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const postcodeRange_1 = require("./Queries/postcodeRange");
const load = {
    exec({ $database }, { domainId, postcode, country }) {
        (0, assert_1.default)(postcode, 'Postcode is required');
        (0, assert_1.default)(domainId, 'DomainId is required');
        return $database.then(({ document }) => {
            return document.fetch('site', `delivery_${domainId}`).then(delivery => {
                const metro = (0, postcodeRange_1.postcodeInRange)(delivery.aus_metro.postcodes, parseInt(postcode, 10));
                const acceptableAULocations = ['au', 'australia', 'aus'];
                if (!country || !(0, lodash_1.find)(acceptableAULocations, a => a === country.toLowerCase()))
                    return {
                        price: delivery.international.price,
                        allowCheckout: delivery.international.allowCheckout,
                        message: delivery.international.message,
                        type: 'international',
                    };
                if (metro)
                    return {
                        price: delivery.aus_metro.price,
                        allowCheckout: delivery.aus_metro.allowCheckout,
                        message: delivery.aus_metro.message,
                        type: 'aus_metro',
                    };
                const regional = (0, postcodeRange_1.postcodeInRange)(delivery.aus_regional.postcodes, parseInt(postcode, 10));
                if (regional)
                    return {
                        price: delivery.aus_regional.price,
                        allowCheckout: delivery.aus_regional.allowCheckout,
                        message: delivery.aus_regional.message,
                        type: 'aus_regional',
                    };
                return {
                    price: delivery.international.price,
                    allowCheckout: delivery.international.allowCheckout,
                    message: delivery.international.message,
                    type: 'international',
                };
            });
        });
    },
};
exports.default = load;
//# sourceMappingURL=getPrice.js.map