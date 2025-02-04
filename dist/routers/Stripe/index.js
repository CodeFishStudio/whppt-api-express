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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const capturePaymentIntent_1 = require("./capturePaymentIntent");
const createPaymentIntent_1 = require("./createPaymentIntent");
const getSavedCards_1 = require("./getSavedCards");
const payWithSavedCard_1 = require("./payWithSavedCard");
const saveCardOnContact_1 = require("./saveCardOnContact");
const router = (0, express_1.Router)();
//TODO Need to get this from reading the config
const stripe = require('stripe')(process.env.STRIPE_KEY);
const StripeRouter = function (__, apiPrefix) {
    router.post(`/${apiPrefix}/stripe/capturePaymentIntent`, (req, res) => {
        return req.moduleContext
            .then(context => {
            const createEvent = context.CreateEvent(req.user);
            const ctx = Object.assign(Object.assign({}, context), { createEvent });
            return (0, capturePaymentIntent_1.capturePaymentIntent)({ context: ctx, stripe }, req.body).then(() => {
                return res.status(200).send({});
            });
        })
            .catch(err => res.status(err.status || 500).send(err.message || err));
    });
    router.post(`/${apiPrefix}/stripe/createPaymentIntent`, (req, res) => {
        return req.moduleContext
            .then(context => {
            const createEvent = context.CreateEvent(req.user);
            const ctx = Object.assign(Object.assign({}, context), { createEvent });
            return (0, createPaymentIntent_1.createPaymentIntent)({ context: ctx, stripe }, req.body).then(data => res.json(data));
        })
            .catch(err => res.status(err.status || 500).send(err.message || err));
    });
    router.post(`/${apiPrefix}/stripe/saveCardOnContact`, (req, res) => __awaiter(this, void 0, void 0, function* () {
        return (0, saveCardOnContact_1.saveCardOnContact)(stripe, req.body)
            .then(() => res.status(200).send({}))
            .catch((err) => res.status(err.status || 500).send(err.message || err));
    }));
    router.get(`/${apiPrefix}/stripe/getSavedCards`, (req, res) => {
        const { memberId } = req.query;
        return req.moduleContext
            .then(context => memberSecure(context, req, memberId).then(() => (0, getSavedCards_1.getSavedCards)({ context, stripe }, { memberId })))
            .then(data => {
            res.json(data);
        })
            .catch((err) => res.status(err.status || 500).send(err.message || err));
    });
    router.post(`/${apiPrefix}/stripe/payWithSavedCard`, (req, res) => {
        return req.moduleContext.then(context => {
            const createEvent = context.CreateEvent(req.user);
            const ctx = Object.assign(Object.assign({}, context), { createEvent });
            return (0, payWithSavedCard_1.payWithSavedCard)({ context: ctx, stripe }, req.body)
                .then(paymentIntent => res.json({ paymentIntent }))
                .catch((err) => res.status(err.status || 500).send(err.message || err));
        });
    });
    router.get(`/${apiPrefix}/stripe/createToken`, (__, res) => {
        return stripe.terminal.connectionTokens.create().then((token) => {
            res.json(token.secret);
        });
    });
    return router;
};
exports.StripeRouter = StripeRouter;
const memberSecure = (context, req, memberId) => {
    return context.$hosting.then(config => {
        var _a, _b, _c, _d;
        const staff = parseMemberTokenFromCookie(req.headers.staffauthtoken, config.security.appKey);
        if (((_a = staff === null || staff === void 0 ? void 0 : staff.sub) === null || _a === void 0 ? void 0 : _a._id) && ((_b = staff === null || staff === void 0 ? void 0 : staff.sub) === null || _b === void 0 ? void 0 : _b.isActive)) {
            context.staff = staff;
            return Promise.resolve(true);
        }
        const member = parseMemberTokenFromCookie(req.headers.memberauthtoken, config.security.appKey);
        if (!member)
            return Promise.reject({ status: 404, message: 'Member not found' });
        context.member = member;
        if (context.member && ((_d = (_c = context.member) === null || _c === void 0 ? void 0 : _c.sub) === null || _d === void 0 ? void 0 : _d._id) === memberId)
            return Promise.resolve(true);
        return Promise.reject({ status: 401, message: 'Not Authrozided' });
    });
};
const parseMemberTokenFromCookie = (memberauthtoken, appKey) => {
    const token = memberauthtoken;
    var decoded = jsonwebtoken_1.default.verify(token, appKey);
    return decoded;
};
//# sourceMappingURL=index.js.map