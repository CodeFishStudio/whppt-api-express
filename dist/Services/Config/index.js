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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const PageType_1 = require("./PageType");
const loadModules_1 = require("./loadModules");
const buildCollections_1 = require("./buildCollections");
const middleware_1 = require("./middleware");
__exportStar(require("./PageType"), exports);
const voidCallback = () => { };
const ConfigService = (logger, config) => {
    const _config = {
        modules: {},
        pageTypes: config.pageTypes || [PageType_1.genericPageType],
        services: config.services || {},
        collections: (0, buildCollections_1.buildCollections)(config),
        onPublish: (!config.disablePublishing && config.onPublish) || voidCallback,
        onUnPublish: (!config.disablePublishing && config.onUnPublish) || voidCallback,
    };
    const loadModulesPromise = (0, loadModules_1.loadModules)(config.modules || {}).then(modules => {
        _config.modules = modules;
    });
    const middleware = (0, middleware_1.ConfigMiddleware)(logger, loadModulesPromise);
    return { runtime: _config, middleware };
};
exports.ConfigService = ConfigService;
//# sourceMappingURL=index.js.map