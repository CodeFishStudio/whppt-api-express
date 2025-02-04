"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = void 0;
const buildOrderForDisplay_1 = require("../../../modules/email/helpers/buildOrderForDisplay");
const footer = (order) => {
    const { total, subtotal, itemsDiscountedAmount, totalDiscountedFromTotal, membersDiscount, tax, shipping, } = (0, buildOrderForDisplay_1.buildOrderForDisplay)(order);
    const table = {
        layout: {
            hLineWidth: function (i, node) {
                return i === node.table.body.length - 1 ? 1 : 0;
            },
            hLineColor: () => 0,
            vLineWidth: () => 0,
            padding: [0, 50],
        },
        table: {
            widths: ['*', '*'],
            body: [],
        },
        margin: [50, 5, 50, 5],
    };
    if (itemsDiscountedAmount) {
        table.table.body.push([
            {
                text: "ITEM'S DISCOUNTED",
                bold: true,
                font: 'SweetSansPro',
                alignment: 'left',
                fontSize: 10,
            },
            {
                text: `-$${itemsDiscountedAmount}`,
                bold: false,
                font: 'SweetSansPro',
                alignment: 'right',
                fontSize: 10,
            },
        ]);
    }
    if (totalDiscountedFromTotal) {
        table.table.body.push([
            {
                text: 'ORDER DISCOUNT',
                bold: true,
                font: 'SweetSansPro',
                alignment: 'left',
                fontSize: 10,
            },
            {
                text: `-$${totalDiscountedFromTotal}`,
                bold: false,
                font: 'SweetSansPro',
                alignment: 'right',
                fontSize: 10,
            },
        ]);
    }
    table.table.body.push([
        {
            text: 'SUBTOTAL',
            bold: true,
            font: 'SweetSansPro',
            fontSize: 10,
            alignment: 'left',
        },
        {
            text: `$${subtotal}`,
            bold: false,
            font: 'SweetSansPro',
            alignment: 'right',
            fontSize: 10,
        },
    ]);
    if (membersDiscount) {
        table.table.body.push([
            {
                text: 'MEMBER DISCOUNT',
                bold: true,
                font: 'SweetSansPro',
                alignment: 'left',
                fontSize: 10,
            },
            {
                text: `-$${membersDiscount}`,
                bold: false,
                font: 'SweetSansPro',
                alignment: 'right',
                fontSize: 10,
            },
        ]);
    }
    table.table.body.push([
        {
            text: 'SHIPPING',
            bold: true,
            font: 'SweetSansPro',
            alignment: 'left',
            fontSize: 10,
        },
        {
            text: `${shipping}`,
            bold: false,
            font: 'SweetSansPro',
            alignment: 'right',
            fontSize: 10,
        },
    ]);
    table.table.body.push([
        {
            text: `TOTAL - (including $${tax} Tax)`,
            bold: true,
            font: 'SweetSansPro',
            alignment: 'left',
            fontSize: 12,
        },
        {
            text: `$${total}`,
            bold: false,
            font: 'SweetSansPro',
            alignment: 'right',
            fontSize: 12,
        },
    ]);
    return table;
};
exports.footer = footer;
//# sourceMappingURL=footer.js.map