"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addGiftCard = {
    authorise({ $roles }, { user }) {
        return $roles.validate(user, []);
    },
    exec() {
        //   events:[
        //     giftCardAddedToOrder
        // ]
        return Promise.resolve({ status: 200 });
    },
};
exports.default = addGiftCard;
//# sourceMappingURL=addGiftCard.js.map