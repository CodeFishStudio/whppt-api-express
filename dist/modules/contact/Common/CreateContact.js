"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactAndPublish = void 0;
const createContactAndPublish = ({ document, createEvent, $id }, contact, session) => {
    contact._id = contact._id || $id.newId();
    const events = [createEvent('ContactCreated', contact)];
    return document
        .saveWithEvents('contacts', contact, events, { session })
        .then(() => {
        console.log("🚀 process.env.DRAFT !== 'true':", process.env.DRAFT !== 'true');
        console.log('🚀 process.env.DRAFT:', process.env.DRAFT);
        if (process.env.DRAFT !== 'true')
            return;
        return document.publishWithEvents('contacts', contact, events, {
            session,
        });
    })
        .then(() => contact);
};
exports.createContactAndPublish = createContactAndPublish;
//# sourceMappingURL=CreateContact.js.map