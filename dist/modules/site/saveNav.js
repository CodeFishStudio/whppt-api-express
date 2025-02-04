"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
const saveNav = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $database }, { nav, user, publish }) {
        assert(nav, 'Please provide a Nav Object.');
        assert(nav.domainId, 'domainId is required');
        nav._id = nav._id || `nav_${nav.domainId}`;
        const dependencies = [];
        const DEP_COLLECTION = 'dependencies';
        return $database
            .then(database => {
            const { startTransaction, db, document } = database;
            return startTransaction(session => {
                return db
                    .collection(DEP_COLLECTION)
                    .deleteMany({ parentId: nav._id }, { session })
                    .then(() => {
                    return Promise.all([
                        dependencies.length
                            ? db.collection(DEP_COLLECTION).insertMany(dependencies, { session })
                            : Promise.resolve(),
                        document.recordHistory('site', 'saveNav', { data: nav, user }, { session }),
                        document.save('site', nav, { session }),
                        publish ? document.publish('site', nav, { session }) : Promise.resolve(),
                        publish
                            ? document.recordHistory('site', 'publishNav', { data: nav, user }, { session })
                            : Promise.resolve(),
                    ]);
                });
            });
        })
            .then(() => nav);
    },
};
exports.default = saveNav;
// TODO: Include the extract links and images. Asana task logged
// const { extractNavImages, extractNavLinks } = whpptOptions;
// const imageDependencies = extractNavImages
//   ? map(compact(extractNavImages(nav)), i => ({
//       _id: $id.newId(),
//       parentId: nav._id,
//       imageId: i,
//       type: 'image',
//     }))
//   : [];
// const linkDependencies = extractNavLinks
//   ? map(compact(extractNavLinks(nav)), l => ({
//       _id: $id.newId(),
//       parentId: nav._id,
//       href: l,
//       type: 'link',
//     }))
//   : [];
// const dependencies = [...imageDependencies, ...linkDependencies];
//# sourceMappingURL=saveNav.js.map