"use strict";
module.exports = {
    exec({ $mongo: { $db }, $id }, { domain }) {
        if (!domain._id)
            domain._id = $id.newId();
        return $db
            .collection('domains')
            .updateOne({ _id: domain._id }, { $set: domain }, { upsert: true })
            .then(() => {
            return domain;
        });
    },
};
//# sourceMappingURL=saveDomain.js.map