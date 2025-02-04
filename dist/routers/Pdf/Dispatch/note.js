"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.note = void 0;
const note = (note) => {
    return note
        ? [
            {
                layout: 'noBorders',
                table: {
                    alignment: 'left',
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'Order notes:',
                                bold: true,
                                font: 'SweetSansPro',
                                style: 'shippingAddress',
                                margin: [50, 0, 0, 0],
                            },
                        ],
                        [
                            {
                                text: note,
                                style: 'shippingAddress',
                                margin: [50, 0, 0, 10],
                            },
                        ],
                    ],
                },
            },
        ]
        : [];
};
exports.note = note;
//# sourceMappingURL=note.js.map