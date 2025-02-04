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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModules = void 0;
const loadGlobModules = require('require-glob');
const contact = __importStar(require("../../modules/contact"));
const order = __importStar(require("../../modules/order"));
const member = __importStar(require("../../modules/member"));
const staff = __importStar(require("../../modules/staff"));
const tagging = __importStar(require("../../modules/tagging"));
const delivery = __importStar(require("../../modules/delivery"));
const membershipTier = __importStar(require("../../modules/membershipTier"));
const modulePromise = loadGlobModules([
    '../../modules/**/*.js',
    '!../../modules/contact/**/*.js',
    '!../../modules/order/**/*.js',
    '!../../modules/member/**/*.js',
    '!../../modules/delivery/**/*.js',
    '!../../modules/membershipTier/**/*.js',
    '!../../modules/staff/**/*.js',
    '!../../modules/tagging/**/*.js',
    '!../../modules/callModule.js',
    '!../../modules/callModule.test.js',
], { cwd: __dirname });
const loadModules = (configModules) => {
    return modulePromise.then((modules) => {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, modules), contact), order), delivery), membershipTier), member), staff), tagging), configModules);
    });
};
exports.loadModules = loadModules;
//# sourceMappingURL=loadModules.js.map