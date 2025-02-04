"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceInList = void 0;
const replaceInList = function (items, item, id = '_id') {
    if (!Object.keys(item).find(k => k === id))
        throw new Error(`New item missing property ${id.toString()}`);
    const oldItem = items.find(i => i[id] === item[id]);
    if (!oldItem)
        throw new Error(`Original item with ${id.toString()}} not found`);
    const oldItemIndex = items.indexOf(oldItem);
    const newItems = [...items];
    newItems.splice(oldItemIndex, 1, item);
    return newItems;
};
exports.replaceInList = replaceInList;
//# sourceMappingURL=replaceInList.js.map