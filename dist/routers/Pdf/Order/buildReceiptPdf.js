"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const pdfmake_1 = __importDefault(require("pdfmake"));
const styles_1 = require("../styles");
const fonts_1 = require("../fonts");
const header_1 = __importDefault(require("../header"));
const buildReceiptItems_1 = __importDefault(require("./buildReceiptItems"));
const subheader_1 = __importDefault(require("./subheader"));
const footer_1 = require("./footer");
const printer = new pdfmake_1.default(fonts_1.fonts);
const docDefinition = ({ order, contact, memberTier }) => {
    var _a;
    return {
        info: {
            title: 'Order',
            author: 'Hentley Farm',
            subject: '',
        },
        styles: styles_1.styles,
        content: [
            ...(0, header_1.default)(order.orderNumber || order._id, ((_a = order === null || order === void 0 ? void 0 : order.payment) === null || _a === void 0 ? void 0 : _a.date) || order.updatedAt),
            ...(0, subheader_1.default)(order, contact, memberTier),
            ...(0, buildReceiptItems_1.default)(order.items),
            (0, footer_1.footer)(order),
        ],
        pageMargins: [0, 0],
    };
};
const buildReceiptPdf = ({ order, contact, memberTier }) => {
    return printer.createPdfKitDocument(docDefinition({ order, contact, memberTier }), {
        defaultStyle: {
            font: 'SweetSansPro',
        },
    });
};
exports.default = buildReceiptPdf;
//# sourceMappingURL=buildReceiptPdf.js.map