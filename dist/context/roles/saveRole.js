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
const assert = require('assert');
const { pick } = require('lodash');
module.exports = ({ $id, $mongo: { $db } }) => {
    return function ({ role, user }) {
        assert(role, 'A role is required');
        if (!role._id)
            role._id = $id.newId();
        role.createdAt = role.createdAt ? new Date(role.createdAt) : new Date();
        role.updatedAt = new Date();
        role.createdBy = Object.assign({}, pick(user, ['_id', 'username', 'email']));
        return checkForExistingRole($db, role).then(() => {
            return $db
                .collection('roles')
                .updateOne({ _id: role._id }, { $set: role }, { upsert: true })
                .then(() => role);
        });
    };
};
function checkForExistingRole($db, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingRoles = yield $db
            .collection('roles')
            .find({ _id: { $ne: role._id }, name: role.name })
            .toArray();
        if (existingRoles.length)
            throw new Error(`Role ${role.name} already exists, please provide a unique name.`);
    });
}
//# sourceMappingURL=saveRole.js.map