import { ContextType } from 'src/context/Context';
import { Contact } from '../Models/Contact';

type CreateContactArgs = (
  context: ContextType,
  contact:
    | { _id?: string; firstName: string; lastName: string; email?: string }
    | Contact,
  session: any
) => Promise<{ _id: string; firstName: string; lastName: string; email?: string }>;

export const createContactAndPublish: CreateContactArgs = (
  { document, createEvent, $id },
  contact,
  session
) => {
  contact._id = contact._id || $id.newId();
  const events = [createEvent('ContactCreated', contact)];
  return document
    .saveWithEvents('contacts', contact, events, { session })
    .then(() => {
      console.log("🚀 process.env.DRAFT !== 'true':", process.env.DRAFT !== 'true');
      console.log('🚀 process.env.DRAFT:', process.env.DRAFT);
      if (process.env.DRAFT !== 'true') return;
      return document.publishWithEvents('contacts', contact, events, {
        session,
      });
    })
    .then(() => contact);
};
