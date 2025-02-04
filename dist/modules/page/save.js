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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const imagesExtractor_1 = __importDefault(require("../../utils/imagesExtractor"));
const linksExtractor_1 = __importDefault(require("../../utils/linksExtractor"));
const galleryItemsExtractor_1 = __importDefault(require("../../utils/galleryItemsExtractor"));
// TODO: collection should not be passed from the client side
const save = {
    authorise({ $identity }, { user }) {
        // return $roles.validate(user, [page.editorRoles]);
        return $identity.isUser(user);
    },
    exec(context, { page, collection, user, publish }) {
        (0, assert_1.default)(page, 'Please provide a page.');
        const { $pageTypes, $id, $database, $publishing } = context;
        page._id = page._id || $id.newId();
        const pageType = (0, lodash_1.find)($pageTypes, pt => pt.name === page.pageType);
        const usedImages = (0, imagesExtractor_1.default)(pageType, page);
        const usedGalleryItems = (0, galleryItemsExtractor_1.default)(pageType, page);
        const usedLinks = (0, linksExtractor_1.default)(pageType, page);
        const _collection = pageType ? pageType.collection.name : collection;
        (0, assert_1.default)(_collection, 'Please provide a page type or collection.');
        return $database.then(database => {
            const { startTransaction, db, document } = database;
            return startTransaction((session) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                if ((_a = page === null || page === void 0 ? void 0 : page.header) === null || _a === void 0 ? void 0 : _a.startDate)
                    page.header.startDate = new Date(page.header.startDate);
                if ((_b = page === null || page === void 0 ? void 0 : page.header) === null || _b === void 0 ? void 0 : _b.endDate)
                    page.header.endDate = new Date(page.header.endDate);
                if ((_c = page === null || page === void 0 ? void 0 : page.header) === null || _c === void 0 ? void 0 : _c.date)
                    page.header.date = new Date(page.header.date);
                if (page === null || page === void 0 ? void 0 : page.slug)
                    page.slug = page === null || page === void 0 ? void 0 : page.slug.toLowerCase();
                if (publish)
                    yield document.publish(_collection, page, { session });
                if (publish && $publishing.onPublish)
                    yield $publishing.onPublish(context, page, _collection);
                yield db
                    .collection('dependencies')
                    .deleteMany({ parentId: page._id }, { session });
                const dependencies = (0, lodash_1.uniqBy)([...usedImages, ...usedLinks, ...usedGalleryItems], image => image._id);
                if (dependencies && dependencies.length) {
                    yield db.collection('dependencies').insertMany(dependencies, { session });
                }
                const savedPage = yield document.save(_collection, page, { session });
                page.updatedAt = savedPage.updatedAt;
                yield document.recordHistory(_collection, 'save', { data: page, user }, {
                    session,
                });
                return savedPage;
            })).then(() => page);
        });
    },
};
exports.default = save;
//# sourceMappingURL=save.js.map