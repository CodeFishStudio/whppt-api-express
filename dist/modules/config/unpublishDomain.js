"use strict";
module.exports = {
    exec({ $mongo: { $unpublish } }, { domain }) {
        return $unpublish('domains', domain._id);
    },
};
//# sourceMappingURL=unpublishDomain.js.map