"use strict";
module.exports = {
    exec({ $mongo: { $db } }, { hostname }) {
        return $db
            .collection('domains')
            .findOne({ hostNames: hostname })
            .then(result => {
            return result;
        });
    },
};
//# sourceMappingURL=loadDomainForHost.js.map