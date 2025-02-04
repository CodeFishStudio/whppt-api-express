"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeGiftCard = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events:[
        //     giftCardRemovedFromOrder
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = removeGiftCard;
//# sourceMappingURL=removeGiftCard.js.map