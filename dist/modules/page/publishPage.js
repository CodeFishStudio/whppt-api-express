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
    authorise({ $roles }, { page, user }) {
        return $roles.validate(user, [page.publisherRoles]);
    },
    exec({ $id, $mongo: { $publish, $save, $startTransaction, $record }, $publishing }, { page, collection, user }) {
        assert(page, 'Please provide a page.');
        assert(collection, 'Please provide a collection');
        page._id = page._id || $id.newId();
        page.published = true;
        page.lastPublished = new Date();
        if (page.header && page.header.startDate)
            page.header.startDate = new Date(page.header.startDate);
        if (page.header && page.header.endDate)
            page.header.endDate = new Date(page.header.endDate);
        if (page.header && page.header.date)
            page.header.date = new Date(page.header.date);
        let publishedPage = page;
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            const savedPage = yield $save(collection, page, { session });
            publishedPage = yield $publish(collection, savedPage, { session });
            yield $record(collection, 'publish', { data: publishedPage, user }, { session });
            if ($publishing.onPublish)
                yield $publishing.onPublish(page);
        })).then(() => publishedPage);
    },
};
//# sourceMappingURL=publishPage.js.map