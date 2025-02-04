"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const date_fns_1 = require("date-fns");
const rootDirectory = path.resolve(__dirname, '../../');
const header = (orderId, updatedAt) => [
    {
        layout: 'noBorders',
        table: {
            alignment: 'center',
            heights: [100],
            widths: ['*'],
            verticalAlignment: 'middle',
            body: [
                [
                    {
                        alignment: 'center',
                        verticalAlignment: 'middle',
                        fillColor: '#D4CAB7',
                        color: [36, 36, 36],
                        margin: [50, 20, 50, 10],
                        layout: 'noBorders',
                        table: {
                            verticalAlignment: 'middle',
                            widths: ['*', '*'],
                            body: [
                                [
                                    {
                                        alignment: 'center',
                                        verticalAlignment: 'middle',
                                        fillColor: '#D4CAB7',
                                        color: [36, 36, 36],
                                        layout: 'noBorders',
                                        table: {
                                            verticalAlignment: 'middle',
                                            widths: ['*'],
                                            body: [
                                                [
                                                    {
                                                        image: path.join(rootDirectory, 'images', 'logo', 'logo.png'),
                                                        width: 90,
                                                        height: 34,
                                                        alignment: 'left',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: `Tax Invoice`,
                                                        fontSize: 12,
                                                        font: 'Roxborough',
                                                        verticalAlignment: 'middle',
                                                        alignment: 'left',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: `Order #: ${orderId}`,
                                                        fontSize: 12,
                                                        font: 'Roxborough',
                                                        alignment: 'left',
                                                        verticalAlignment: 'bottom',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: `Order date: ${(0, date_fns_1.format)(new Date(updatedAt), 'dd LLL y')}`,
                                                        fontSize: 12,
                                                        font: 'Roxborough',
                                                        verticalAlignment: 'middle',
                                                        alignment: 'left',
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                    {
                                        alignment: 'center',
                                        verticalAlignment: 'middle',
                                        fillColor: '#D4CAB7',
                                        color: [36, 36, 36],
                                        layout: 'noBorders',
                                        margin: [0, 20, 0, 0],
                                        table: {
                                            verticalAlignment: 'middle',
                                            widths: ['*'],
                                            body: [
                                                [
                                                    {
                                                        text: `Cnr Gerald Roberts Rd, Jenke Rd, Seppeltsfield, SA 5355`,
                                                        font: 'Roxborough',
                                                        fontSize: 8,
                                                        alignment: 'right',
                                                        verticalAlignment: 'bottom',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: '08 8562 8427',
                                                        fontSize: 8,
                                                        font: 'Roxborough',
                                                        alignment: 'right',
                                                        verticalAlignment: 'bottom',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: 'ABN (33 097 614 661)',
                                                        fontSize: 8,
                                                        font: 'Roxborough',
                                                        alignment: 'right',
                                                        verticalAlignment: 'bottom',
                                                    },
                                                ],
                                                [
                                                    {
                                                        text: 'Liquor Production and Sales Licence: 57605063',
                                                        fontSize: 8,
                                                        font: 'Roxborough',
                                                        alignment: 'right',
                                                        verticalAlignment: 'bottom',
                                                    },
                                                ],
                                            ],
                                        },
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
exports.default = header;
//# sourceMappingURL=header.js.map