"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = {
    exec({ $database }, { domainId }) {
        return $database.then(database => {
            const { db } = database;
            return db
                .collection('site')
                .findOne({ _id: `tags_${domainId}` })
                .then(setting => {
                return (setting === null || setting === void 0 ? void 0 : setting.tags) || [];
            });
        });
    },
};
exports.default = fetch;
//# sourceMappingURL=fetch.js.map