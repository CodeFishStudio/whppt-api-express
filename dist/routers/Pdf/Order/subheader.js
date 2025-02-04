"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composeOrderData_1 = require("../Dispatch/composeOrderData");
// import { format } from 'date-fns';
const subheader = (order, contact, memberTier) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const userData = memberTier
        ? {
            text: 'MEMBER',
            fontSize: 12,
            color: [147, 122, 74],
            font: 'SweetSansPro',
            alignment: 'right',
            verticalAlignment: 'bottom',
        }
        : {
            text: 'CONTACT',
            fontSize: 12,
            color: [147, 122, 74],
            font: 'SweetSansPro',
            alignment: 'right',
            verticalAlignment: 'bottom',
        };
    return [
        {
            layout: 'noBorders',
            table: {
                alignment: 'center',
                widths: ['*'],
                verticalAlignment: 'middle',
                body: [
                    [
                        {
                            alignment: 'center',
                            verticalAlignment: 'middle',
                            fillColor: 'white',
                            color: [36, 36, 36],
                            margin: [50, 10, 50, 0],
                            layout: 'noBorders',
                            table: {
                                verticalAlignment: 'middle',
                                widths: ['*', '*'],
                                body: [
                                    [
                                        {
                                            text: 'SHIPPING',
                                            fontSize: 12,
                                            color: [147, 122, 74],
                                            font: 'SweetSansPro',
                                            alignment: 'left',
                                            verticalAlignment: 'bottom',
                                        },
                                        userData,
                                    ],
                                    [
                                        {
                                            text: `${contact === null || contact === void 0 ? void 0 : contact.firstName} ${contact === null || contact === void 0 ? void 0 : contact.lastName}
                      ${((_b = (_a = order === null || order === void 0 ? void 0 : order.shipping) === null || _a === void 0 ? void 0 : _a.contactDetails) === null || _b === void 0 ? void 0 : _b.company) || ''}
                      ${(0, composeOrderData_1.sanitizeUnitString)((_d = (_c = order === null || order === void 0 ? void 0 : order.shipping) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.unit)} ${((_f = (_e = order === null || order === void 0 ? void 0 : order.shipping) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.number) || ''} ${(0, composeOrderData_1.sanitizeAddressString)((_h = (_g = order === null || order === void 0 ? void 0 : order.shipping) === null || _g === void 0 ? void 0 : _g.address) === null || _h === void 0 ? void 0 : _h.street)}  ${(0, composeOrderData_1.sanitizeAddressString)((_k = (_j = order === null || order === void 0 ? void 0 : order.shipping) === null || _j === void 0 ? void 0 : _j.address) === null || _k === void 0 ? void 0 : _k.suburb)} ${(0, composeOrderData_1.sanitizeAddressString)((_m = (_l = order === null || order === void 0 ? void 0 : order.shipping) === null || _l === void 0 ? void 0 : _l.address) === null || _m === void 0 ? void 0 : _m.state)} ${(0, composeOrderData_1.sanitizeAddressString)((_p = (_o = order === null || order === void 0 ? void 0 : order.shipping) === null || _o === void 0 ? void 0 : _o.address) === null || _p === void 0 ? void 0 : _p.country)} 
                      ${(0, composeOrderData_1.sanitizeAddressString)((_r = (_q = order === null || order === void 0 ? void 0 : order.shipping) === null || _q === void 0 ? void 0 : _q.address) === null || _r === void 0 ? void 0 : _r.postCode)} `,
                                            fontSize: 10,
                                            font: 'SweetSansPro',
                                            verticalAlignment: 'middle',
                                            alignment: 'left',
                                        },
                                        {
                                            text: `${memberTier ? `${memberTier.name}` : ''}
                      ${contact === null || contact === void 0 ? void 0 : contact.firstName} ${contact === null || contact === void 0 ? void 0 : contact.lastName}
                      ${(contact === null || contact === void 0 ? void 0 : contact.email) || ''}
                      ${contact === null || contact === void 0 ? void 0 : contact.company} `,
                                            fontSize: 10,
                                            alignment: 'right',
                                            font: 'SweetSansPro',
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                ],
            },
        },
    ];
};
exports.default = subheader;
//# sourceMappingURL=subheader.js.map