import assert from 'assert';
import { ToggleSubscription } from '../contact/Common/ToggleSubscription';
import { Address, Contact } from '../contact/Models/Contact';
import { HttpModule } from '../HttpModule';
import { Member } from './Model';

const signUp: HttpModule<
  {
    address: Address;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    termsAndConditions: boolean;
    contactId?: string;
    isSubscribed?: boolean;
  },
  Member
> = {
  exec(
    context,
    {
      address,
      email,
      firstName,
      lastName,
      password,
      termsAndConditions,
      contactId,
      isSubscribed,
    }
  ) {
    assert(email, 'An email is required');
    assert(firstName, 'First Name is required');
    assert(lastName, 'Last Name is required');
    assert(password, 'Password is required');
    assert(termsAndConditions, 'Terms And Conditions must be accepted');
    const { $database, $id, createEvent, $security } = context;
    return $database.then(database => {
      const { document, startTransaction } = database;

      return document.query<Contact>('contacts', { filter: { email } }).then(contact => {
        assert(!contact || contact._id === contactId, 'Contact already Exists');

        const newContact = {
          _id: contact?._id || $id.newId(),
          firstName,
          lastName,
          email,
          shipping: { address },
          billing: { address },
          isSubscribed,
        } as Contact;
        return $security.encrypt(password).then(hashedPassword => {
          const member = {
            _id: $id.newId(),
            contactId: newContact._id,
            password: hashedPassword,
          } as Member;

          const events = [
            createEvent(
              contact?._id ? 'ContactDetailsUpdated' : 'ContactCreated',
              newContact
            ),
          ];
          const memberEvents = [createEvent('MemberCreated', member)];

          return startTransaction(session => {
            return document
              .saveWithEvents('contacts', newContact, events, { session })
              .then(() => {
                return document
                  .publishWithEvents('contacts', newContact, events, {
                    session,
                  })
                  .then(() => {
                    return document
                      .saveWithEvents('members', member, memberEvents, {
                        session,
                      })
                      .then(() => {
                        return ToggleSubscription(
                          { ...context, document },
                          {
                            contact: newContact,
                            isSubscribed: isSubscribed || false,
                          },
                          session
                        );
                      });
                  });
              });
          }).then(() => member);
        });
      });
    });
  },
};

export default signUp;
