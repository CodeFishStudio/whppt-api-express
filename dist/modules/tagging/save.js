"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const save = {
    exec({ $database }, { domainId, tags }) {
        const tagSettings = { _id: `tags_${domainId}`, tags };
        return $database.then(db => {
            return db.startTransaction(session => {
                return db.document
                    .save('site', tagSettings, { session })
                    .then(() => db.document.publish('site', tagSettings, { session }));
            });
        });
    },
};
exports.default = save;
//# sourceMappingURL=save.js.map