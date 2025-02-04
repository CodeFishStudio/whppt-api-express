"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagging = void 0;
const fetch_1 = __importDefault(require("./fetch"));
const filterList_1 = __importDefault(require("./filterList"));
const filterListSelected_1 = __importDefault(require("./filterListSelected"));
const filterListUserSelected_1 = __importDefault(require("./filterListUserSelected"));
const save_1 = __importDefault(require("./save"));
exports.tagging = {
    fetch: fetch_1.default,
    filterList: filterList_1.default,
    filterListSelected: filterListSelected_1.default,
    filterListUserSelected: filterListUserSelected_1.default,
    save: save_1.default,
};
//# sourceMappingURL=index.js.map