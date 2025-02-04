"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const parseMemberTokenFromCookie = (staffauthtoken, appKey) => {
    const token = staffauthtoken;
    var decoded = jsonwebtoken_1.default.verify(token, appKey);
    return decoded;
};
const Secure = module => {
    const secureModule = {
        authorise: (context, args, req) => {
            return context.$hosting.then(config => {
                if (!module)
                    return Promise.reject({ status: 404, message: 'Module not found' });
                const staff = parseMemberTokenFromCookie(req.headers.staffauthtoken, config.security.appKey);
                if (!staff)
                    return Promise.reject({ status: 404, message: 'Member not found' });
                if (!module.authorise)
                    return Promise.resolve();
                return module.authorise(Object.assign(Object.assign({}, context), { staff }), args, req);
            });
        },
        exec: (context, args, req) => {
            return context.$hosting.then(config => {
                const staff = parseMemberTokenFromCookie(req.headers.staffauthtoken, config.security.appKey);
                return module.exec(Object.assign(Object.assign({}, context), { staff }), args, req);
            });
        },
    };
    return secureModule;
};
exports.Secure = Secure;
//# sourceMappingURL=Secure.js.map