"use strict";
module.exports = {
    exec({ $mongo: { $db } }) {
        return $db.collection('domains').find().toArray();
    },
};
//# sourceMappingURL=loadDomains.js.map