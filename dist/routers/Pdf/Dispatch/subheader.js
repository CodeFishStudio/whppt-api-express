"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subheader = void 0;
const capitalize_1 = require("../capitalize");
const subheader = (shipping, contact) => {
    var _a, _b, _c, _d, _e, _f;
    const shippingDetails = [
        {
            layout: 'noBorders',
            table: {
                alignment: 'left',
                widths: ['*'],
                body: [
                    [
                        {
                            text: 'Shipping Address:',
                            bold: true,
                            font: 'SweetSansPro',
                            style: 'shippingAddress',
                            margin: [50, 30, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${contact === null || contact === void 0 ? void 0 : contact.email} `,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${contact === null || contact === void 0 ? void 0 : contact.phoneNumber} `,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${((_a = shipping.contact) === null || _a === void 0 ? void 0 : _a.firstName)
                                ? (0, capitalize_1.capitalizeFirstLetter)((_b = shipping === null || shipping === void 0 ? void 0 : shipping.contact) === null || _b === void 0 ? void 0 : _b.firstName)
                                : ''} ${((_c = shipping.contact) === null || _c === void 0 ? void 0 : _c.lastName)
                                ? (0, capitalize_1.capitalizeFirstLetter)((_d = shipping === null || shipping === void 0 ? void 0 : shipping.contact) === null || _d === void 0 ? void 0 : _d.lastName)
                                : ''}`,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${shipping.street}`,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${shipping.state}`,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${shipping.country}`,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 10],
                        },
                    ],
                ],
            },
        },
    ];
    if (!!((_e = shipping.contact) === null || _e === void 0 ? void 0 : _e.company)) {
        shippingDetails.push({
            layout: 'noBorders',
            table: {
                alignment: 'left',
                widths: ['*'],
                body: [
                    [
                        {
                            text: 'Company name:',
                            bold: true,
                            font: 'SweetSansPro',
                            style: 'shippingAddress',
                            margin: [50, 10, 0, 0],
                        },
                    ],
                    [
                        {
                            text: `${(_f = shipping.contact) === null || _f === void 0 ? void 0 : _f.company}`,
                            style: 'shippingAddress',
                            margin: [50, 0, 0, 10],
                        },
                    ],
                ],
            },
        });
    }
    return shippingDetails;
};
exports.subheader = subheader;
//# sourceMappingURL=subheader.js.map