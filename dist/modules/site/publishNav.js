"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert = require('assert');
module.exports = {
    exec({ $mongo: { $save, $publish, $startTransaction, $record } }, { nav, user }) {
        assert(nav, 'A Nav Object must be provided.');
        nav._id = nav._id || 'nav';
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            yield $save('site', nav, { session });
            yield $publish('site', nav, { session });
            yield $record('site', 'publish', { data: nav, user }, { session });
        })).then(() => nav);
    },
};
//# sourceMappingURL=publishNav.js.map