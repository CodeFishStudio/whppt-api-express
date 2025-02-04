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
    exec(context, { _id, collection, user }) {
        assert(_id, 'A Page Id must be provided.');
        assert(collection, 'Please provide a collection');
        const { $mongo: { $unpublish, $db, $startTransaction, $record }, $publishing, } = context;
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            yield $db
                .collection(collection)
                .updateOne({ _id }, { $set: { published: false } }, { session });
            yield $unpublish(collection, _id, { session });
            yield $record(collection, 'unpublish', { data: _id, user }, { session });
            if ($publishing.onUnPublish)
                yield $publishing.onUnPublish(context, { _id }, collection);
        })).then(() => _id);
    },
};
//# sourceMappingURL=unpublishPage.js.map