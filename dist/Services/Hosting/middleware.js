"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostingMiddleware = void 0;
const HostingMiddleware = () => ({
    checkForApiKey(req, res, next) {
        const { apiKey } = req.query;
        if (process.env.LEGACY_API_KEY && process.env.LEGACY_API_KEY === 'true') {
            req.apiKey = 'legacy';
            return next();
        }
        if (!apiKey)
            return res
                .status(500)
                .send('Missing api key. Please provide your api key on all requests.');
        req.apiKey = apiKey;
        next();
    },
});
exports.HostingMiddleware = HostingMiddleware;
//# sourceMappingURL=middleware.js.map