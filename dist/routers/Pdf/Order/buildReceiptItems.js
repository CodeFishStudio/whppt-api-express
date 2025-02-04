"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildReceiptItems = (items) => {
    const receiptItems = [
        {
            layout: {
                hLineColor: [147, 122, 74],
                vLineColor: [147, 122, 74],
            },
            margin: [50, 5, 50, 0],
            table: {
                headerRows: 1,
                widths: ['*', '15%', '15%'],
                border: [1, 1, 1, 1],
                alignment: 'center',
                verticalAlignment: 'center',
                height: 'auto',
                body: [
                    [
                        {
                            text: `Product Name`,
                            styles: 'tableCell',
                            alignment: 'left',
                            font: 'SweetSansPro',
                            verticalAlignment: 'middle',
                            bold: true,
                        },
                        {
                            text: `Quantity`,
                            styles: 'tableCell',
                            alignment: 'left',
                            font: 'SweetSansPro',
                            verticalAlignment: 'middle',
                            bold: true,
                        },
                        {
                            text: `Price`,
                            styles: 'tableCell',
                            alignment: 'left',
                            font: 'SweetSansPro',
                            verticalAlignment: 'middle',
                            bold: true,
                        },
                    ],
                ],
            },
        },
    ];
    items.forEach((item, index) => {
        receiptItems.push({
            layout: {
                hLineColor: [147, 122, 74],
                vLineColor: [147, 122, 74],
            },
            table: {
                headerRows: 1,
                widths: ['*', '15%', '15%'],
                border: [1, 1, 1, 1],
                alignment: 'center',
                verticalAlignment: 'center',
                height: 'auto',
                body: [
                    [
                        {
                            layout: 'noBorders',
                            table: {
                                headerRows: 1,
                                widths: ['*', '*'],
                                alignment: 'center',
                                body: [
                                    [
                                        {
                                            text: `${item.productName || item.product.name}`,
                                            styles: 'tableCell',
                                            alignment: 'left',
                                            font: 'SweetSansPro',
                                            colSpan: 2,
                                        },
                                        '',
                                    ],
                                    [
                                        {
                                            text: `${item.product.customFields.vintage || ''}`,
                                            styles: 'tableCell',
                                            alignment: 'left',
                                            font: 'SweetSansPro',
                                        },
                                        '',
                                    ],
                                ],
                            },
                        },
                        {
                            text: `${item.quantity}`,
                            styles: 'tableCell',
                            alignment: 'center',
                            font: 'SweetSansPro',
                            verticalAlignment: 'middle',
                        },
                        {
                            text: `${item.purchasedPrice ? `$${(item.purchasedPrice / 100).toFixed(2)}` : '-'}`,
                            styles: 'tableCell',
                            alignment: 'left',
                            font: 'SweetSansPro',
                            verticalAlignment: 'middle',
                        },
                    ],
                ],
            },
            margin: [50, 0, 50, index === items.length - 1 ? 150 : 5],
        });
    });
    return receiptItems;
};
exports.default = buildReceiptItems;
//# sourceMappingURL=buildReceiptItems.js.map