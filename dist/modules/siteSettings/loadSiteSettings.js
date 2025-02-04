"use strict";
module.exports = {
    exec({ $mongo: { $db } }, { domainId }) {
        const query = {
            _id: domainId && domainId !== 'undefined'
                ? `siteSettings_${domainId}`
                : 'siteSettings',
        };
        return $db
            .collection('site')
            .findOne(query)
            .then(siteSettings => {
            if (!siteSettings) {
                return Object.assign(Object.assign({}, siteSettings), { _id: domainId && domainId !== 'undefined'
                        ? `siteSettings_${domainId}`
                        : 'siteSettings' });
            }
            return siteSettings;
        })
            .catch(err => {
            throw err;
        });
    },
};
//# sourceMappingURL=loadSiteSettings.js.map