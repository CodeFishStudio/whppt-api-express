"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoRouter = void 0;
const express_1 = require("express");
const { join, map } = require('lodash');
const router = (0, express_1.Router)();
const draft = process.env.DRAFT === 'true';
const baseUrl = process.env.BASE_URL;
const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const sitemapEnd = `</urlset>`;
const SeoRouter = function () {
    router.get(`/sitemap.xml`, (req, res) => {
        return req.moduleContext
            .then(({ $sitemap }) => {
            return $sitemap.filter().then(({ sitemap }) => {
                const indexablePages = sitemap.filter((p) => {
                    return !p.hideFromSitemap;
                });
                return join(map(indexablePages, (page) => {
                    return `<url>
                      <loc>${page.url}</loc>
                      ${page.updatedAt
                        ? `<lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>`
                        : `<lastmod>${new Date(page.createdAt).toISOString()}</lastmod>`}
                      ${page.frequency
                        ? `<changefreq>${page.frequency}</changefreq>`
                        : `<changefreq>yearly</changefreq>`}
                      ${page.priority
                        ? `<priority>${page.priority}</priority>`
                        : `<priority>0.5</priority>`}
                    </url>
                  `;
                }), '\n');
            });
        })
            .then((sitemapData) => res.type('text/xml').send(`${sitemapStart}${sitemapData}${sitemapEnd}`))
            .catch((err) => res.status(500).send(err));
    });
    router.get('/robots.txt', (req, res) => {
        if (draft || process.env.DISABLE_ROBOTS === 'true')
            return res.type('text/plain').send('User-agent: *\nDisallow: /');
        return req.moduleContext
            .then(({ $sitemap }) => {
            return $sitemap.filter().then(({ sitemap }) => {
                const hiddenPages = sitemap.filter((p) => p.hideFromRobots);
                const allAgents = 'User-agent: *';
                const disallowLogin = 'Disallow: /login';
                const disallowHealth = 'Disallow: /health';
                const sitemapPath = `Sitemap: ${baseUrl}/sitemap.xml`;
                const emptyLine = ``;
                const lines = [allAgents, disallowLogin, disallowHealth];
                hiddenPages.forEach(page => {
                    page.slug.startsWith('/')
                        ? lines.push(`Disallow: ${page.slug}`)
                        : lines.push(`Disallow: /${page.slug}`);
                });
                lines.push(emptyLine);
                lines.push(sitemapPath);
                return lines;
            });
        })
            .then((lines) => res.type('text/plain').send(lines.join('\n')))
            .catch((err) => res.status(500).send(err));
    });
    return router;
};
exports.SeoRouter = SeoRouter;
//# sourceMappingURL=SeoRouter.js.map