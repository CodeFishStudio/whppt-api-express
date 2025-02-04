"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AusPost = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const assert_1 = __importDefault(require("assert"));
const AusPost = ({ $hosting }) => {
    return $hosting.then(({ ausPost }) => {
        const AUS_POST_BASE_URL = ausPost.base_url;
        const headers = {
            'Content-Type': 'application/json',
            'account-number': ausPost.account_number,
            Authorization: ausPost.authorization,
            Cookie: ausPost.cookie,
        };
        return {
            createShipment: ({ order, shippingDetails, length, width, height, weight }) => {
                var _a, _b, _c;
                const { firstName, lastName, company } = shippingDetails || ((_a = order === null || order === void 0 ? void 0 : order.shipping) === null || _a === void 0 ? void 0 : _a.contactDetails) || {};
                const { number, street, suburb, state, country, postCode } = shippingDetails || ((_b = order === null || order === void 0 ? void 0 : order.shipping) === null || _b === void 0 ? void 0 : _b.address) || {};
                (0, assert_1.default)(firstName || lastName, 'Aus Post requres a Name.');
                (0, assert_1.default)(street, 'Aus Post requres a Street.');
                (0, assert_1.default)(suburb, 'Aus Post requres a Suburb.');
                (0, assert_1.default)(state, 'Aus Post requres a State.');
                (0, assert_1.default)(postCode, 'Aus Post requres a Post Code.');
                const _body = {
                    shipments: [
                        {
                            sender_references: [order.orderNumber, order._id],
                            addresses: {
                                from: {
                                    name: 'Hentley Farm',
                                    lines: ['Cnr Gerald Roberts and Jenke Rds'],
                                    suburb: 'Seppeltsfield',
                                    postcode: '5355',
                                    state: 'SA',
                                    phone: '0883330241',
                                },
                                to: {
                                    name: [firstName, lastName, company ? company : ''].join(' '),
                                    company,
                                    lines: [`${number} ${street}`],
                                    suburb,
                                    state,
                                    country,
                                    postcode: postCode,
                                    email: (_c = order === null || order === void 0 ? void 0 : order.contact) === null || _c === void 0 ? void 0 : _c.email,
                                },
                            },
                            service: {
                                speed: 'STANDARD',
                                features: [
                                    {
                                        type: 'SIGNATURE_ON_DELIVERY',
                                        attributes: {
                                            delivery_option: 'CARD_IF_NOT_HOME',
                                        },
                                    },
                                ],
                            },
                            shipment_contents: {
                                type: 'NEUTRAL',
                            },
                            articles: [
                                {
                                    packaging_type: 'CTN',
                                    length,
                                    height,
                                    width,
                                    weight,
                                },
                            ],
                        },
                    ],
                };
                return (0, node_fetch_1.default)(`${AUS_POST_BASE_URL}/shipping/v1/shipments`, {
                    method: 'post',
                    body: JSON.stringify(_body),
                    headers,
                })
                    .then((response) => response.json())
                    .then((data) => {
                    var _a, _b, _c;
                    if ((_a = data.errors) === null || _a === void 0 ? void 0 : _a.length)
                        throw new Error(data.errors[0].message);
                    if (!((_b = data === null || data === void 0 ? void 0 : data.shipments) === null || _b === void 0 ? void 0 : _b.length))
                        throw new Error('Something went wrong getting creating shipment');
                    const shipment_id = (_c = data === null || data === void 0 ? void 0 : data.shipments[0]) === null || _c === void 0 ? void 0 : _c.shipment_id;
                    if (!shipment_id)
                        throw new Error('Something went wrong creating shipment_id');
                    return shipment_id;
                })
                    .catch((err) => {
                    throw err;
                });
            },
            getLabel(labelRequestId) {
                return (0, node_fetch_1.default)(`${AUS_POST_BASE_URL}/shipping/v1/labels/${labelRequestId}`, {
                    method: 'get',
                    headers,
                })
                    .then((a) => {
                    return a.json().then((data) => {
                        var _a, _b;
                        if ((_a = data === null || data === void 0 ? void 0 : data.errors) === null || _a === void 0 ? void 0 : _a.length)
                            throw new Error(data.errors[0].message);
                        if (!((_b = data === null || data === void 0 ? void 0 : data.labels) === null || _b === void 0 ? void 0 : _b.length))
                            throw new Error('Something went wrong getting url label');
                        const label = data === null || data === void 0 ? void 0 : data.labels[0];
                        if (!label)
                            throw new Error('Something went wrong getting label');
                        return { url: label.url, labelStatus: label.status };
                    });
                })
                    .catch((err) => {
                    throw err;
                });
            },
        };
    });
};
exports.AusPost = AusPost;
// {
//     "shipments": [
//             {
//               "shipment_reference": "Sample Order from Website",
//               "customer_reference_1": "CustId",
//                 "from": {
//                   "name": 'Hentley Farm',
//                   "lines": ['Cnr Gerald Roberts and Jenke Rds'],
//                   "suburb": 'Seppeltsfield',
//                   "postcode": '5355',
//                   "state": 'SA',
//                   "phone": '0883330241',
//                 },
//                 "to": {
//                   "name": "test buisness",
//                   company: "test Company",
//                   "lines": ['111 Bourke St'],
//                   "suburb": 'Melbourne',
//                   state: 'VIC',
//                   "postcode": "3000",
//                   "email": 'Carl@hotmail.com',
//                 },
//               "items": [
//                 {
//                   "length": 10,
//                   "height": 10,
//                   "width": 10,
//                   "weight":10,
//                   "item_reference": "blocked",
//                   "product_id": 'Product3000',
//                   "authority_to_leave": false,
//                   "safe_drop_enabled": false,
//                   "allow_partial_delivery": false,
//               }
//             ]
//             },
//     ]
// }
//# sourceMappingURL=index.js.map