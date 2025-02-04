"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseMiddleware = void 0;
const DatabaseMiddleware = (logger, getConnection, adminDb) => {
    return {
        waitForAdminDbConnection(_, res, next) {
            adminDb
                .then(() => next())
                .catch(err => {
                const msg = 'Could not connect to the admin DB. The service as shut down.';
                logger.error(`${msg} : ${err}`);
                res.status(500).send(msg);
                process.exit(1);
            });
        },
        waitForApiDbConnection(req, res, next) {
            getConnection(req.apiKey)
                .then(() => next())
                .catch(err => {
                const msg = 'The database connection could not be established';
                logger.error(`${msg} : ${err}`);
                res.status(500).send(msg);
            });
        },
    };
};
exports.DatabaseMiddleware = DatabaseMiddleware;
//# sourceMappingURL=middleware.js.map