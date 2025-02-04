"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeOrderData = exports.sanitizeUnitString = exports.sanitizeAddressString = void 0;
const sanitizeAddressString = (item) => {
    return item && item !== 'null' ? `${item}, ` : '';
};
exports.sanitizeAddressString = sanitizeAddressString;
const sanitizeUnitString = (item) => {
    return item && item !== 'null' ? `${item}/` : '';
};
exports.sanitizeUnitString = sanitizeUnitString;
const composeOrderData = (orderWithProducts, contact) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return {
        orderId: orderWithProducts.orderNumber || orderWithProducts._id,
        updatedAt: orderWithProducts.updatedAt,
        contact: {
            email: ((_a = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.contact) === null || _a === void 0 ? void 0 : _a.email) || (contact === null || contact === void 0 ? void 0 : contact.email) || '',
            phoneNumber: (contact === null || contact === void 0 ? void 0 : contact.mobile) || (contact === null || contact === void 0 ? void 0 : contact.phoneNumber) || '',
        },
        shipping: {
            contact: (_b = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _b === void 0 ? void 0 : _b.contactDetails,
            street: `${((_d = (_c = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.number) || ''} ${(0, exports.sanitizeAddressString)((_f = (_e = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.street)} `,
            state: `${(0, exports.sanitizeAddressString)((_h = (_g = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _g === void 0 ? void 0 : _g.address) === null || _h === void 0 ? void 0 : _h.suburb)} ${(0, exports.sanitizeAddressString)((_k = (_j = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _j === void 0 ? void 0 : _j.address) === null || _k === void 0 ? void 0 : _k.state)} `,
            country: `${(0, exports.sanitizeAddressString)((_m = (_l = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _l === void 0 ? void 0 : _l.address) === null || _m === void 0 ? void 0 : _m.country)} ${((_p = (_o = orderWithProducts === null || orderWithProducts === void 0 ? void 0 : orderWithProducts.shipping) === null || _o === void 0 ? void 0 : _o.address) === null || _p === void 0 ? void 0 : _p.postCode) || ''}`,
        },
        items: orderWithProducts.items,
        note: orderWithProducts.note || '',
        staff: orderWithProducts.staff || '',
    };
};
exports.composeOrderData = composeOrderData;
//# sourceMappingURL=composeOrderData.js.map