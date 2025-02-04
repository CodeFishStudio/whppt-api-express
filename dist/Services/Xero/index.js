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
exports.Xero = void 0;
const xero_node_1 = require("xero-node");
const xero = new xero_node_1.XeroClient({
    clientId: process.env.XERO_CLIENT_ID || '',
    clientSecret: process.env.XERO_CLIENT_SECRET || '',
    grantType: 'client_credentials',
});
const Xero = () => {
    return {
        getXeroTrackingDetails: () => __awaiter(void 0, void 0, void 0, function* () {
            const salesGroups = [];
            const salesPersons = [];
            try {
                yield xero.getClientCredentialsToken();
                const { body } = (yield xero.accountingApi.getTrackingCategories(process.env.XERO_TENANT_ID || ''));
                const _salesGroups = body.trackingCategories.find((tc) => tc.name === 'Sales Group');
                const _salesPersons = body.trackingCategories.find((tc) => tc.name === 'Sales Person');
                salesGroups.push(...((_salesGroups === null || _salesGroups === void 0 ? void 0 : _salesGroups.options.filter((sg) => sg.status === 'ACTIVE')) || []));
                salesPersons.push(...((_salesPersons === null || _salesPersons === void 0 ? void 0 : _salesPersons.options.filter((sp) => sp.status === 'ACTIVE')) || []));
                return {
                    salesGroups: salesGroups.map(sg => sg.name),
                    salesPersons: salesPersons.map(sg => sg.name),
                };
            }
            catch (err) {
                return Promise.reject(err);
            }
        }),
    };
};
exports.Xero = Xero;
//# sourceMappingURL=index.js.map