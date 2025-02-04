"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMiddleware = void 0;
const ConfigMiddleware = (logger, loadModulePromise) => ({
    waitForConfig(_, res, next) {
        loadModulePromise
            .then(() => next())
            .catch(() => {
            const msg = 'Could not load modules.';
            logger.error(msg);
            res.status(500).send(msg);
        });
    },
});
exports.ConfigMiddleware = ConfigMiddleware;
//# sourceMappingURL=middleware.js.map