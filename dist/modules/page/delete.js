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
    exec({ $mongo: { $startTransaction, $delete, $db, $record } }, { _id, collection, user }) {
        assert(_id, 'A Page Id must be provided.');
        assert(collection, 'Please provide a collection.');
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            yield $db.collection('dependencies').deleteMany({ parentId: _id }, { session });
            yield $delete(collection, _id, { session });
            yield $record(collection, 'delete', { data: _id, user }, { session });
        }));
    },
};
//# sourceMappingURL=delete.js.map