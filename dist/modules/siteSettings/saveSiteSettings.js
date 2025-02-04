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
const { get } = require('lodash');
module.exports = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, [], true);
    },
    exec({ $mongo: { $startTransaction, $db, $save, $record } }, { siteSettings, user }) {
        const dependencies = [];
        const ogImageId = get(siteSettings, 'og.image.imageId');
        const twitterImageId = get(siteSettings, 'twitter.image.imageId');
        if (ogImageId)
            dependencies.push({
                imageId: ogImageId,
                parentId: siteSettings._id,
                type: 'image',
            });
        if (twitterImageId)
            dependencies.push({
                imageId: twitterImageId,
                parentId: siteSettings._id,
                type: 'image',
            });
        let savedSiteSettings;
        return $startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
            const DEP_COLLECTION = 'dependencies';
            yield $db.collection(DEP_COLLECTION).deleteMany({ parentId: siteSettings._id });
            if (dependencies.length) {
                yield $db.collection(DEP_COLLECTION).insertMany(dependencies);
            }
            savedSiteSettings = yield $save('site', siteSettings, { session });
            yield $record('site', 'save', { data: siteSettings, user }, { session });
        })).then(() => savedSiteSettings);
    },
};
//# sourceMappingURL=saveSiteSettings.js.map