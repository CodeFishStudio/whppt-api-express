"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveContactAndPublish = void 0;
const saveContactAndPublish = ({ document }, { contact, events }, session) => {
    return document
        .saveWithEvents('contacts', contact, events, { session })
        .then(() => {
        if (process.env.DRAFT !== 'true')
            return;
        return document.publishWithEvents('contacts', contact, events, {
            session,
        });
    })
        .then(() => contact);
};
exports.saveContactAndPublish = saveContactAndPublish;
//# sourceMappingURL=SaveContact.js.map