"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSession = void 0;
const lodash_1 = require("lodash");
const EventSession = function (context) {
    return function () {
        let events = [];
        function callAction(agg, action, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const _events = yield agg[action](context, args);
                events = (0, lodash_1.flatten)([events, _events]);
            });
        }
        return { callAction, getEvents: () => (0, lodash_1.compact)(events) };
    };
};
exports.EventSession = EventSession;
//# sourceMappingURL=Session.js.map