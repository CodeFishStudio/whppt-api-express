"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whppt = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const context_1 = __importDefault(require("./context"));
const routers_1 = require("./routers");
const Services_1 = require("./Services");
const Database_1 = require("./Services/Database");
const Connection_1 = require("./Services/Database/Mongo/Connection");
const Hosting_1 = require("./Services/Hosting");
const Config_1 = require("./Services/Config");
const adminDbConfig_1 = require("./Services/Hosting/adminDbConfig");
const index_1 = require("./routers/Stripe/index");
const index_2 = require("./routers/index");
const index_3 = require("./routers/index");
__exportStar(require("./Services/Config"), exports);
__exportStar(require("./modules/HttpModule"), exports);
__exportStar(require("./replaceInList"), exports);
const Whppt = (config) => {
    config.apiPrefix = config.apiPrefix || 'api';
    const router = (0, express_1.Router)();
    const $id = (0, Services_1.IdService)();
    const $logger = (0, Services_1.Logger)();
    const $config = (0, Config_1.ConfigService)($logger, config);
    $logger.info('Configuring hosting db access to %o. Waiting for connection ...', adminDbConfig_1.adminDbConfig);
    const adminDb = (0, Connection_1.MongoDatabaseConnection)($logger, $id, adminDbConfig_1.adminDbConfig);
    adminDb
        .then(() => $logger.info('Admin db connected.'))
        .catch(() => {
        $logger.error('Admin db could not connect. Exiting process');
        process.exit(1);
    });
    const $hosting = (0, Hosting_1.HostingService)(adminDb);
    const $database = (0, Database_1.DatabaseService)($logger, $id, $hosting, $config, adminDb);
    const $security = (0, Services_1.Security)({ $id, $logger, config: config.security, $hosting });
    router.get('/health', (_, res) => {
        res.send('OK');
    });
    router.use($hosting.middleware.checkForApiKey);
    router.use($config.middleware.waitForConfig);
    router.use($database.middleware.waitForAdminDbConnection);
    const corsWhitelist = process.env.CORS_WHITELIST
        ? JSON.parse(process.env.CORS_WHITELIST)
        : [];
    $logger.info('Loading CORS whitelist:', corsWhitelist);
    router.use((0, cors_1.default)((req, callback) => {
        $hosting
            .getConfig(req.apiKey)
            .then(hostingConfig => {
            const whitelist = [...corsWhitelist, ...hostingConfig.cors];
            const corsOptions = req.headers.origin && whitelist.indexOf(req.headers.origin) !== -1
                ? { origin: true }
                : { origin: false };
            $logger.dev('CORS check complete: origin: %s, whitelist %s, options: %o', req.headers.origin, whitelist, corsOptions);
            callback(null, corsOptions);
        })
            .catch(err => {
            $logger.error('CORS check error: ', err);
            callback(err);
        });
    }));
    router.use($database.middleware.waitForApiDbConnection);
    router.use($security.authenticate);
    router.use((req, res, next) => {
        res.type = res.type
            ? res.type
            : (value) => {
                res.setHeader('Content-Type', value);
                return res;
            };
        res.contentType = res.contentType
            ? res.contentType
            : (value) => {
                res.setHeader('Content-Type', value);
                return res;
            };
        res.header = res.header
            ? res.header
            : (key, value) => {
                res.setHeader(key, value);
                return res;
            };
        req.get = req.get
            ? req.get
            : (key) => {
                return req.headers[key];
            };
        next();
    });
    router.use((req, _, next) => {
        // TODO: Work towards a generic db and not specifically mongo here.
        const dbConnection = $database.getConnection(req.apiKey);
        const hostingConfig = $hosting.getConfig(req.apiKey);
        const dbConfig = hostingConfig.then(c => c.database);
        const databasePromise = dbConnection.then(con => con.getDatabase(dbConfig));
        // TODO: Work towards a generic storage api. S3 used here
        const $storage = (0, Services_1.S3)(hostingConfig);
        const $email = Services_1.EmailService;
        const $auspost = Services_1.AusPost;
        const $xero = Services_1.Xero;
        req.moduleContext = (0, context_1.default)($id, $logger, $security, databasePromise, $config, hostingConfig, $email, $storage, (0, Services_1.Gallery)($id, databasePromise, $storage), (0, Services_1.Image)($id, databasePromise, $storage, config), (0, Services_1.File)($id, databasePromise, $storage, config), req.apiKey, $auspost, $xero);
        next();
    });
    router.use((0, routers_1.GalleryRouter)($logger, config.apiPrefix || 'api'));
    router.use(express_2.default.json());
    router.use((0, index_1.StripeRouter)($logger, config.apiPrefix || 'api'));
    router.use((0, index_2.PdfRouter)(config.apiPrefix || 'api'));
    router.use((0, index_3.CsvRouter)(config.apiPrefix || 'api'));
    router.use((0, routers_1.FileRouter)($logger));
    router.use((0, routers_1.RedirectsRouter)());
    router.use((0, routers_1.ModulesRouter)($logger, config.apiPrefix || 'api'));
    router.use((0, routers_1.ImageRouter)($logger));
    router.use((0, routers_1.SeoRouter)());
    if (config.routers && config.routers.length) {
        config.routers.forEach(entry => {
            router.use(entry.path, entry.routerFactory());
        });
    }
    return router;
};
exports.Whppt = Whppt;
//# sourceMappingURL=index.js.map