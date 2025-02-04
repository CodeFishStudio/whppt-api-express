"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDbConfig = void 0;
exports.adminDbConfig = {
    type: 'mongo',
    instance: { _id: 'whppt-shared', url: process.env.MONGO_URL || '' },
    db: process.env.MONGO_ADMIN_DB || 'WhpptAdmin',
    pubDb: '',
};
//# sourceMappingURL=adminDbConfig.js.map