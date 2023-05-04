import assert from 'assert';
import { HttpModule } from '../HttpModule';
import { Order } from './Models/Order';
import * as validations from './Validations';

const requestCall: HttpModule<{ orderId: string }, void> = {
  exec({ $database, createEvent }, { orderId }) {
    assert(orderId, 'An Order id is required');

    return $database.then(database => {
      const { document, startTransaction } = database;
      return document.fetch<Order>('orders', orderId).then(order => {
        validations.canBeModified(order);

        const events = [createEvent('OrderCancelled', { orderId })];

        order.checkoutStatus = 'cancelled';

        return startTransaction(session => {
          return document.saveWithEvents('orders', order, events, { session });
        });
      });
    });
  },
};

export default requestCall;
