"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = void 0;
const assert_1 = __importDefault(require("assert"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const crypto_1 = __importDefault(require("crypto"));
const Jwt_1 = require("./Providers/Jwt");
const saltRounds = 10;
const Security = ({ $id, $logger, $hosting, config, }) => {
    const jwt = (0, Jwt_1.JwtProvider)({ $id, $logger, $hosting, config });
    const providers = { jwt };
    const configuredProvider = providers[config.provider];
    passport_1.default.use(configuredProvider.init());
    passport_1.default.initialize();
    $logger.info('Security Configured for provider:', config.provider);
    const generateAccessToken = (apiKey, userId, expiryInMinutes = 1440) => {
        return $hosting
            .getConfig(apiKey)
            .then(({ security }) => {
            (0, assert_1.default)(security === null || security === void 0 ? void 0 : security.appKey, 'No appKey was provided. Check your hosting config');
            const token = crypto_1.default
                .createHmac('sha256', security.appKey)
                .update(userId.toString())
                .digest('hex');
            const tokenExpiry = new Date(new Date().getTime() + expiryInMinutes * 60000);
            return {
                token,
                tokenExpiry,
                valid: true,
            };
        })
            .catch(err => {
            // TODO: handle assert from above as well as crypto not supported errors here.
            return Promise.reject(`Crypto support is disabled. ${err}`);
        });
    };
    return {
        encrypt: password => bcryptjs_1.default.hash(password, saltRounds),
        compare: (password, hash) => bcryptjs_1.default.compare(password, hash),
        authenticate: configuredProvider.authenticate,
        createToken: configuredProvider.createToken,
        generateAccessToken,
    };
};
exports.Security = Security;
//# sourceMappingURL=index.js.map