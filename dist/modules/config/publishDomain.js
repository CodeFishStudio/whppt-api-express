"use strict";
module.exports = {
    exec({ $mongo: { $publish } }, { domain }) {
        return $publish('domains', domain);
    },
};
//# sourceMappingURL=publishDomain.js.map