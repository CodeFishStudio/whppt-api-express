"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const parseMemberTokenFromCookie = (memberauthtoken, appKey) => {
    const token = memberauthtoken;
    var decoded = jsonwebtoken_1.default.verify(token, appKey);
    return decoded;
};
const Secure = module => {
    const secureModule = {
        authorise: (context, args, req) => {
            return context.$hosting.then(config => {
                if (!module)
                    return Promise.reject({ status: 404, message: 'Module not found' });
                const member = parseMemberTokenFromCookie(req.headers.memberauthtoken, config.security.appKey);
                if (!member)
                    return Promise.reject({ status: 404, message: 'Member not found' });
                if (!module.authorise)
                    return Promise.resolve();
                return module.authorise(Object.assign(Object.assign({}, context), { member }), args, req);
            });
        },
        exec: (context, args, req) => {
            return context.$hosting.then(config => {
                const member = parseMemberTokenFromCookie(req.headers.memberauthtoken, config.security.appKey);
                return module.exec(Object.assign(Object.assign({}, context), { member }), args, req);
            });
        },
    };
    return secureModule;
};
exports.Secure = Secure;
//# sourceMappingURL=Secure.js.map