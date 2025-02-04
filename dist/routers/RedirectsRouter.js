"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectsRouter = void 0;
const express_1 = require("express");
const lodash_1 = require("lodash");
const RedirectsRouter = () => {
    const router = (0, express_1.Router)();
    router.use((req, res, next) => {
        return Promise.resolve()
            .then(() => {
            const _url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
            const from = (0, lodash_1.chain)(_url.pathname).toLower().trimEnd('/').value();
            if (from.startsWith('/api') && from != '/api/page/load')
                return next();
            if (from.startsWith('/_loading'))
                return next();
            return req.moduleContext.then(({ $database }) => {
                return $database.then(database => {
                    const { $db } = database;
                    // TODO: find a way to do queries like this on different databases. ie. Mongo, Firebase
                    return $db
                        .collection('domains')
                        .findOne({ hostnames: req.hostname })
                        .then(domain => {
                        const _slug = process.env.IS_NEXT === 'true' ? `/${req.query.slug}` : from;
                        const query = domain && domain._id
                            ? { from: (0, lodash_1.trimEnd)(_slug, '/'), domainId: domain._id }
                            : {
                                from: (0, lodash_1.trimEnd)(_slug, '/'),
                                $or: [
                                    { domainId: { $exists: false } },
                                    { domainId: { $eq: '' } },
                                ],
                            };
                        return $db
                            .collection('redirects')
                            .findOne(query)
                            .then(redirect => {
                            if (redirect) {
                                if (process.env.IS_NEXT === 'true')
                                    return res.status(200).json({ status: 301, to: redirect.to });
                                return res.redirect(301, redirect.to);
                            }
                            next();
                        });
                    });
                });
            });
        })
            .catch(err => {
            return res.status(500).send(`Redirects router failed: ${err.message}`);
        });
    });
    return router;
};
exports.RedirectsRouter = RedirectsRouter;
//# sourceMappingURL=RedirectsRouter.js.map