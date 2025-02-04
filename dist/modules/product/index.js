"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const list_1 = __importDefault(require("./list"));
const filter_1 = __importDefault(require("./filter"));
const create_1 = __importDefault(require("./create"));
const changeDetails_1 = __importDefault(require("./changeDetails"));
const changeImage_1 = __importDefault(require("./changeImage"));
const getFilters_1 = __importDefault(require("./getFilters"));
const saveConfig_1 = __importDefault(require("./saveConfig"));
const publish_1 = __importDefault(require("./publish"));
const addImage_1 = __importDefault(require("./addImage"));
const removeImage_1 = __importDefault(require("./removeImage"));
const load_1 = __importDefault(require("./load"));
const loadProducts_1 = __importDefault(require("./loadProducts"));
exports.product = {
    list: list_1.default,
    filter: filter_1.default,
    create: create_1.default,
    changeDetails: changeDetails_1.default,
    changeImage: changeImage_1.default,
    addImage: addImage_1.default,
    removeImage: removeImage_1.default,
    getFilters: getFilters_1.default,
    saveConfig: saveConfig_1.default,
    publish: publish_1.default,
    load: load_1.default,
    loadProducts: loadProducts_1.default,
};
//# sourceMappingURL=index.js.map