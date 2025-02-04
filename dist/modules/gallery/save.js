"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const save = {
    authorise({ $roles }, { user }) {
        // TODO: Gallery Security
        const requiredRoles = [];
        return $roles.validate(user, [requiredRoles]);
    },
    exec({ $database }, { item }) {
        (0, assert_1.default)(item, 'Gallery item is required');
        (0, assert_1.default)(item.domainId, 'Gallery item requires a domain id');
        return $database
            .then(({ document, startTransaction }) => {
            return startTransaction(session => {
                return document
                    .save('gallery', item, {
                    session,
                })
                    .then(() => {
                    return document.publish('gallery', item, {
                        session,
                    });
                });
            });
        })
            .then(savedItem => ({
            item: savedItem,
        }));
    },
};
exports.default = save;
//# sourceMappingURL=save.js.map