"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = __importDefault(require("../header"));
const note_1 = require("./note");
const staff_1 = require("./staff");
const subheader_1 = require("./subheader");
const buildOrderTable = (orders) => {
    const tables = [];
    const len = orders.length;
    orders.forEach((order, index) => {
        const table = {
            layout: {
                hLineColor: [147, 122, 74],
                vLineColor: [147, 122, 74],
            },
            table: {
                headerRows: 1,
                widths: ['10%', '*', '*', '*'],
                border: [1, 1, 1, 1],
                alignment: 'center',
                body: [
                    [
                        {
                            text: '#',
                            styles: 'tableHeader',
                            alignment: 'center',
                            font: 'SweetSansPro',
                        },
                        {
                            text: 'Item',
                            style: 'tableHeader',
                        },
                        {
                            text: 'Vintage',
                            style: 'tableHeader',
                        },
                        {
                            text: 'Quantity',
                            style: 'tableHeader',
                        },
                    ],
                ],
                header: {
                    headerBackgroundColor: [147, 122, 74],
                },
            },
            margin: [50, 30, 50, 30],
        };
        order.items.map((item, index) => {
            var _a, _b, _c;
            table.table.body.push([
                {
                    text: String(index + 1),
                    font: 'SweetSansPro',
                    style: 'tableCell',
                },
                {
                    text: ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || 'unavailable',
                    style: 'tableCell',
                },
                {
                    text: ((_c = (_b = item.product) === null || _b === void 0 ? void 0 : _b.customFields) === null || _c === void 0 ? void 0 : _c.vintage) || 'unavailable',
                    style: 'tableCell',
                },
                {
                    text: item.quantity || 'unavailable',
                    style: 'tableCell',
                },
            ]);
        });
        tables.push([
            ...(0, header_1.default)(order.orderId, order.updatedAt),
            ...(0, subheader_1.subheader)(order.shipping, order.contact),
            table,
            ...(0, note_1.note)(order.note),
            ...(0, staff_1.staff)(order.staff),
            { text: '', pageBreak: `${index >= len - 1 ? '' : 'after'}` },
        ]);
    });
    return tables;
};
exports.default = buildOrderTable;
//# sourceMappingURL=buildOrderTable.js.map