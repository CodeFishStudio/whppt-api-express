"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleSubscription = void 0;
const ToggleSubscription = ({ document, createEvent }, { contact, isSubscribed }, session) => {
    if (!isSubscribed || contact.isSubscribed === isSubscribed)
        return Promise.resolve();
    contact.isSubscribed = true;
    const events = [
        createEvent('ContactOptedInForMarketing', {
            contactId: contact._id,
            isSubscribed,
        }),
    ];
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
exports.ToggleSubscription = ToggleSubscription;
// const events = [
//   isSubscribed
//     ? createEvent('ContactOptedInForMarketing', {
//         contactId: contact._id,
//         isSubscribed,
//       })
//     : createEvent('ContactOptedOutForMarketing', {
//         contactId: contact._id,
//         isSubscribed,
//       }),
// ];
//# sourceMappingURL=ToggleSubscription.js.map