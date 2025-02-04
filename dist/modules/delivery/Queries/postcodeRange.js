"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcodeInRange = exports.postcodeRange = void 0;
const postcodeRange = (start, end) => {
    var _start = start;
    var arr = new Array(end - start + 1);
    for (var i = 0; i < arr.length; i++, _start++) {
        arr[i] = _start;
    }
    return arr;
};
exports.postcodeRange = postcodeRange;
const postcodeInRange = (postcodes, postcode) => {
    return postcodes.find(f => {
        const lowEnd = f.split('-')[0];
        const highEnd = f.split('-')[1];
        if (!highEnd)
            return Number(lowEnd) === postcode;
        const _range = (0, exports.postcodeRange)(Number(lowEnd), Number(highEnd));
        return _range.find(inRangeCode => inRangeCode === postcode);
    });
};
exports.postcodeInRange = postcodeInRange;
//# sourceMappingURL=postcodeRange.js.map