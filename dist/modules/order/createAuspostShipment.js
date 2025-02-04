"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Secure_1 = require("../staff/Secure");
const createAuspostShipment = {
    exec({ $database, $auspost, createEvent }, { orderId, length, width, height, weight, firstName, lastName, company, number, street, suburb, postCode, state, }) {
        (0, assert_1.default)(orderId, 'Order Id not found');
        return $database.then(({ document, startTransaction }) => {
            return document.fetch('orders', orderId).then(loadedOrder => {
                var _a, _b, _c;
                (0, assert_1.default)(loadedOrder, 'Order not found');
                (0, assert_1.default)(((_a = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.payment) === null || _a === void 0 ? void 0 : _a.status) === 'paid', 'Order not in a paid status');
                (0, assert_1.default)(!((_c = (_b = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _b === void 0 ? void 0 : _b.ausPost) === null || _c === void 0 ? void 0 : _c.shipmentId), 'Order already has a shipment Id');
                const { createShipment } = $auspost;
                return startTransaction(session => {
                    return createShipment({
                        order: loadedOrder,
                        shippingDetails: {
                            firstName,
                            lastName,
                            company,
                            number,
                            street,
                            suburb,
                            postCode,
                            state,
                        },
                        length,
                        width,
                        height,
                        weight,
                    }).then((shipmentId) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                        const events = [
                            createEvent('AusPostShipmentCreated', {
                                _id: orderId,
                                shipmentId,
                            }),
                        ];
                        (0, assert_1.default)(loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping, 'Order shipping is required');
                        loadedOrder.shipping.ausPost = {
                            shipmentId,
                            status: 'shipmentCreated',
                        };
                        const _shipping = {
                            contactDetails: {
                                firstName: firstName || ((_a = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _a === void 0 ? void 0 : _a.contactDetails.firstName),
                                lastName: lastName || ((_b = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _b === void 0 ? void 0 : _b.contactDetails.lastName),
                                company: company || ((_d = (_c = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _c === void 0 ? void 0 : _c.contactDetails) === null || _d === void 0 ? void 0 : _d.company),
                            },
                            address: {
                                number: number || ((_f = (_e = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.number),
                                street: street || ((_h = (_g = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _g === void 0 ? void 0 : _g.address) === null || _h === void 0 ? void 0 : _h.street),
                                suburb: suburb || ((_k = (_j = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _j === void 0 ? void 0 : _j.address) === null || _k === void 0 ? void 0 : _k.suburb),
                                postCode: postCode || ((_m = (_l = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _l === void 0 ? void 0 : _l.address) === null || _m === void 0 ? void 0 : _m.postCode),
                                city: (_p = (_o = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _o === void 0 ? void 0 : _o.address) === null || _p === void 0 ? void 0 : _p.city,
                                state: state || ((_r = (_q = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _q === void 0 ? void 0 : _q.address) === null || _r === void 0 ? void 0 : _r.state),
                                country: (_t = (_s = loadedOrder === null || loadedOrder === void 0 ? void 0 : loadedOrder.shipping) === null || _s === void 0 ? void 0 : _s.address) === null || _t === void 0 ? void 0 : _t.country,
                            },
                        };
                        if (checkShippingAddressChanged(_shipping.address, loadedOrder.shipping.address) ||
                            checkShippingDetailsChanged(_shipping.contactDetails, loadedOrder.shipping.contactDetails)) {
                            events.push(createEvent('OrderShippingDetailsUpdatedByStaff', {
                                _id: orderId,
                                shipping: _shipping,
                            }));
                            loadedOrder.shipping = Object.assign(Object.assign({}, loadedOrder.shipping), { address: _shipping.address || {}, contactDetails: _shipping.contactDetails });
                        }
                        return document.saveWithEvents('orders', loadedOrder, events, {
                            session,
                        });
                    });
                }).then(() => loadedOrder);
            });
        });
    },
};
exports.default = (0, Secure_1.Secure)(createAuspostShipment);
const checkShippingAddressChanged = (newAddress, oldAddress) => {
    if (newAddress.number !== oldAddress.number)
        return true;
    if (newAddress.street !== oldAddress.street)
        return true;
    if (newAddress.suburb !== oldAddress.suburb)
        return true;
    if (newAddress.postCode !== oldAddress.postCode)
        return true;
    if (newAddress.state !== oldAddress.state)
        return true;
    return false;
};
const checkShippingDetailsChanged = (newContactDetails, oldContactDetails) => {
    if (newContactDetails.firstName !== oldContactDetails.firstName)
        return true;
    if (newContactDetails.lastName !== oldContactDetails.lastName)
        return true;
    if (newContactDetails.company !== oldContactDetails.company)
        return true;
    return false;
};
//# sourceMappingURL=createAuspostShipment.js.map