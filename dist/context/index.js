"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const lodash_1 = require("lodash");
const events_1 = require("./events");
const identity_1 = require("./identity");
const SalesForce_1 = __importDefault(require("./SalesForce"));
const Unleashed_1 = __importDefault(require("./Unleashed"));
const { ValidateRoles, saveRole, isGuest } = require('./roles');
const sitemapQuery = require('./sitemap');
const $env = process.env;
const Context = ($id, $logger, $security, $database, $config, $hosting, $email, $storage, $gallery, $image, $file, apiKey, $auspost, $xero) => {
    return Promise.resolve().then(() => {
        // TODO: Support other databases. Currently only Mongo is supported and we use it directly here.
        return $database.then(database => {
            const $fullUrl = (slug) => `${$env.BASE_URL}/${slug}`;
            const _context = {
                $id,
                $logger,
                $image,
                $file,
                $security,
                $xero,
                $mongo: database,
                $database,
                $hosting,
                $salesForce: (0, SalesForce_1.default)(),
                $aws: $storage,
                $storage,
                $modules: $config.runtime.modules,
                $pageTypes: $config.runtime.pageTypes,
                $fullUrl,
                $sitemap: {
                    filter: sitemapQuery({
                        $mongo: database,
                        $pageTypes: $config.runtime.pageTypes,
                        $fullUrl,
                    }),
                },
                $roles: {
                    validate: ValidateRoles({ $mongo: database, $env }),
                    save: saveRole({ $id, $mongo: database }),
                    isGuest: isGuest({ $mongo: database }),
                },
                $identity: (0, identity_1.Identity)(database),
                $env,
                $publishing: {
                    onPublish: $config.runtime.onPublish,
                    onUnPublish: $config.runtime.onUnPublish,
                },
                EventSession: (0, events_1.EventSession)({}),
                useService: (name) => _context[name] ? _context[name] : undefined,
                apiKey,
            };
            _context.$unleashed = (0, Unleashed_1.default)(_context);
            _context.$gallery = $gallery;
            _context.CreateEvent = events_1.CreateEvent;
            (0, lodash_1.forEach)($config.runtime.services, (serviceConstructor, serviceName) => {
                _context[`$${serviceName}`] = serviceConstructor(_context);
            });
            return $email(_context).then(_email => {
                return $auspost(_context).then(_auspost => {
                    return Object.assign(Object.assign({}, _context), { $email: _email, $auspost: _auspost });
                });
            });
        });
    });
};
exports.Context = Context;
exports.default = Context;
//# sourceMappingURL=index.js.map