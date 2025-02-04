"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const pdfmake_1 = __importDefault(require("pdfmake"));
const buildOrderTable_1 = __importDefault(require("./buildOrderTable"));
const styles_1 = require("../styles");
const fonts_1 = require("../fonts");
const printer = new pdfmake_1.default(fonts_1.fonts);
const docDefinition = ({ products }) => {
    return {
        info: {
            title: 'Orders dispatch',
            author: 'Hentley Farm',
            subject: 'Daily orders',
        },
        styles: styles_1.styles,
        content: [...(0, buildOrderTable_1.default)(products)],
        pageMargins: [0, 0],
    };
};
const buildDispatchListPdf = ({ products }) => {
    return printer.createPdfKitDocument(docDefinition({ products }), {
        defaultStyle: {
            font: 'SweetSansPro',
        },
    });
};
exports.default = buildDispatchListPdf;
//# sourceMappingURL=buildDispatchListPdf.js.map