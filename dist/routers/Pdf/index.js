"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPdfBinary = exports.PdfRouter = void 0;
const queryMemberTier_1 = require("./../../modules/order/Queries/queryMemberTier");
const express_1 = require("express");
const buildDispatchListPdf_1 = __importDefault(require("./Dispatch/buildDispatchListPdf"));
const composeOrderData_1 = require("./Dispatch/composeOrderData");
const buildReceiptPdf_1 = __importDefault(require("./Order/buildReceiptPdf"));
const loadOrderWithProducts_1 = require("./../../modules/order/Queries/loadOrderWithProducts");
const router = (0, express_1.Router)();
const PdfRouter = (apiPrefix) => {
    router.get(`/${apiPrefix}/pdf/dispatchList/:orderIds`, (req, res) => {
        const ordersWithProductInfo = [];
        const orderIds = req.params.orderIds.split(',');
        return req.moduleContext
            .then(context => {
            return Promise.all([
                ...orderIds.map((orderId) => {
                    return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(orderWithProducts => {
                        return context.$database.then(database => {
                            var _a;
                            const { document } = database;
                            return document
                                .query('contacts', {
                                filter: { _id: ((_a = orderWithProducts.contact) === null || _a === void 0 ? void 0 : _a._id) || 'unknown_guest' },
                            })
                                .then(contact => {
                                return ordersWithProductInfo.push((0, composeOrderData_1.composeOrderData)(orderWithProducts, contact));
                            });
                        });
                        // if (staffId) {
                        //   return context.$database.then(database => {
                        //     const { document } = database;
                        //     return document
                        //       .query<Staff>('staff', {
                        //         filter: { _id: staffId },
                        //       })
                        //       .then(staff => {
                        //         if (staff) {
                        //           return document
                        //             .query<Contact>('contacts', {
                        //               filter: { _id: staff.contactId },
                        //             })
                        //             .then(staffContactInfo => {
                        //               return ordersWithProductInfo.push(
                        //                 composeOrderData({
                        //                   ...orderWithProducts,
                        //                   staffContactInfo,
                        //                 })
                        //               );
                        //             });
                        //         } else {
                        //           return ordersWithProductInfo.push(
                        //             composeOrderData(orderWithProducts)
                        //           );
                        //         }
                        //       });
                        //   });
                        // } else {
                        //   return ordersWithProductInfo.push(composeOrderData(orderWithProducts));
                        // }
                    });
                }),
            ]).then(() => {
                ordersWithProductInfo.forEach((order) => {
                    order.items.map((product) => {
                        var _a, _b;
                        return {
                            name: (_a = product.product) === null || _a === void 0 ? void 0 : _a.name,
                            vintage: (_b = product.product) === null || _b === void 0 ? void 0 : _b.vintage,
                            quantity: product.quantity,
                        };
                    });
                });
                return (0, exports.createPdfBinary)((0, buildDispatchListPdf_1.default)({ products: ordersWithProductInfo }), function (binary) {
                    res.contentType('application/pdf');
                    res.send(binary);
                });
            });
        })
            .catch(err => {
            console.log('🚀 PDF err:', err);
            return res.status(500).send(`PDF router failed: ${err.message}`);
        });
    });
    router.get(`/${apiPrefix}/pdf/orderReceipt`, (req, res) => {
        const orderId = req.query.orderId;
        const domainId = req.query.domainId;
        return req.moduleContext
            .then(context => {
            return (0, loadOrderWithProducts_1.loadOrderWithProducts)(context, { _id: orderId }).then(order => {
                return context.$database.then(database => {
                    var _a;
                    const { document } = database;
                    if (order.memberId) {
                        return (0, queryMemberTier_1.queryMemberTier)(context, {
                            memberId: order.memberId,
                            domainId,
                        }).then((memberTier) => {
                            var _a;
                            return document
                                .query('contacts', {
                                filter: { _id: (_a = order.contact) === null || _a === void 0 ? void 0 : _a._id },
                            })
                                .then(contact => {
                                return (0, exports.createPdfBinary)((0, buildReceiptPdf_1.default)({ order, contact, memberTier }), function (binary) {
                                    res.contentType('application/pdf');
                                    res.send(binary);
                                });
                            });
                        });
                    }
                    else {
                        return document
                            .query('contacts', {
                            filter: { _id: (_a = order.contact) === null || _a === void 0 ? void 0 : _a._id },
                        })
                            .then(contact => {
                            return (0, exports.createPdfBinary)((0, buildReceiptPdf_1.default)({ order, contact }), function (binary) {
                                res.contentType('application/pdf');
                                res.send(binary);
                            });
                        });
                    }
                });
            });
        })
            .catch(err => {
            console.log('🚀 PDF err:', err);
            return res.status(500).send(`PDF router failed: ${err.message}`);
        });
    });
    return router;
};
exports.PdfRouter = PdfRouter;
const createPdfBinary = (doc, callback) => {
    const chunks = [];
    let result;
    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        result = Buffer.concat(chunks);
        callback(result);
    });
    doc.end();
};
exports.createPdfBinary = createPdfBinary;
//# sourceMappingURL=index.js.map