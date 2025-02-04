"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesRouter = void 0;
const express_promise_json_router_1 = __importDefault(require("express-promise-json-router"));
const callModule_1 = __importDefault(require("../modules/callModule"));
const ModulesRouter = ($logger, apiPrefix) => {
    const router = (0, express_promise_json_router_1.default)();
    router.get(`/${apiPrefix}/:mod/:query`, (req) => {
        const { user, params, query: queryArgs } = req;
        const { mod, query } = params;
        return req.moduleContext.then(ctx => {
            return (0, callModule_1.default)(ctx, mod, query, Object.assign(Object.assign({}, queryArgs), { user }), req).catch(err => {
                const { status, error } = err;
                if (logRoutes(mod, query))
                    $logger.error('Error in modules route [GET]: %s %s %O %s', mod, query, queryArgs, error || err);
                return { status: status || 500, error: error || err };
            });
        });
    });
    router.post(`/${apiPrefix}/:mod/:command`, (req) => {
        const { user, params, body: cmdArgs } = req;
        const { mod, command } = params;
        return req.moduleContext.then(ctx => {
            return (0, callModule_1.default)(ctx, mod, command, Object.assign(Object.assign({}, cmdArgs), { user }), req).catch(err => {
                const { status, error } = err;
                const _error = error && error.message ? error && error.message : error || err;
                if (logRoutes(mod, command))
                    $logger.error('Error in modules route [POST]: %s %s %O %O', mod, command, cmdArgs, _error);
                return { status: status || 500, error: error || err };
            });
        });
    });
    return router;
};
exports.ModulesRouter = ModulesRouter;
const logRoutes = (mod, query) => {
    const modCheck = mod === 'member';
    const queryCheck = query === 'me' || query === 'login';
    return !(modCheck && queryCheck);
};
//# sourceMappingURL=ModulesRouter.js.map