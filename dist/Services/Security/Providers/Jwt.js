"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../User");
const extractFromCookies = function (req) {
    if (req && req.cookies)
        return req.cookies.authToken;
    return null;
};
const extractFromBearer = function () {
    return passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
};
const expectBearerToken = process.env.TOKEN_SRC === 'Bearer';
const JwtProvider = ({ $id, $hosting, config }) => ({
    init() {
        const fetchSecret = (req, rawJwtToken, done) => {
            $hosting
                .getConfig(req.apiKey)
                .then(securityConfig => {
                var _a;
                const opts = {
                    issuer: ((_a = config.jwt) === null || _a === void 0 ? void 0 : _a.issuer) || 'whppt',
                    audience: securityConfig.security.audience || '',
                    maxAge: '7d',
                };
                jsonwebtoken_1.default.verify(rawJwtToken, securityConfig.security.appKey, opts, (err) => {
                    done(err, securityConfig.security.appKey);
                });
            })
                .catch(done);
        };
        const opts = {
            jwtFromRequest: expectBearerToken ? extractFromBearer() : extractFromCookies,
            secretOrKeyProvider: fetchSecret,
        };
        return new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            // TODO: Verify the token has not been invalidated
            done(null, jwtPayload.sub);
        });
    },
    authenticate(req, res, next) {
        // return new Promise((_, reject) => {
        passport_1.default.authenticate('jwt', function (err, user) {
            if (err) {
                res.status(401).send('Could not authenticate').send();
                return;
            }
            req.user = !user
                ? (0, User_1.WhpptUser)({ _id: 'guest', username: 'Guest' })
                : (req.user = (0, User_1.WhpptUser)(user));
            next();
        })(req, res);
        // });
    },
    createToken(apiKey, user) {
        return $hosting.getConfig(apiKey).then(({ security }) => {
            var _a;
            return jsonwebtoken_1.default.sign({
                iss: (_a = config.jwt) === null || _a === void 0 ? void 0 : _a.issuer,
                aud: security.audience || '',
                sub: user,
                jti: $id.newId(),
                alg: 'HS256',
            }, security.appKey);
        });
    },
});
exports.JwtProvider = JwtProvider;
//# sourceMappingURL=Jwt.js.map