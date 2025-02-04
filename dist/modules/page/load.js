"use strict";
const assert = require('assert');
const { lower } = require('assert');
module.exports = {
    authorise({ $roles, $mongo: { $db } }, { user, slug, collection }) {
        return $db
            .collection(collection)
            .findOne({ slug: slug && slug.toLowerCase() }, { editorRoles: true, publisherRoles: true })
            .then(page => {
            if (!page)
                return { status: 404, message: 'Page not found' };
            const requiredRoles = [];
            if (page.viewerRoles && page.viewerRoles.length)
                requiredRoles.push(...page.viewerRoles);
            return $roles.validate(user, [requiredRoles]);
        });
    },
    exec({ $mongo: { $db } }, { slug, collection, domainId }) {
        assert(collection, 'Please provide a collection.');
        assert(domainId, 'Please provide a domainId');
        return $db
            .collection(collection)
            .findOne({ slug: slug && slug.toLowerCase(), domainId })
            .then(page => {
            if (!page)
                return { status: 404, message: 'Page not found' };
            return page;
        })
            .catch(err => {
            throw err;
        });
    },
};
//# sourceMappingURL=load.js.map