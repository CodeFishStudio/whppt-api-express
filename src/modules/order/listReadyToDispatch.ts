import { HttpModule } from '../HttpModule';
import type { WhpptMongoDatabase } from '../../Services/Database/Mongo/Database';
import { Secure } from '../staff/Secure';
import { Order } from './Models/Order';

const listReadyToDispatch: HttpModule<
  { currentPage: string; size: string },
  { orders: Order[]; total: number }
> = {
  exec({ $database }, { currentPage = '1', size = '100' }) {
    return $database.then(database => {
      const { db } = database as WhpptMongoDatabase;
      return Promise.all([
        db
          .collection('orders')
          .aggregate<Order>([
            {
              $match: {
                checkoutStatus: 'paid',
                'payment.status': 'paid',
                'shipping.pickup': { $ne: true },
              },
            },
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$payment.date' } },
                orders: {
                  $push: {
                    _id: '$_id',
                    date: '$payment.date',
                    checkoutStatus: '$checkoutStatus',
                    payment: {
                      amount: '$payment.amount',
                    },
                  },
                },
              },
            },
            {
              $sort: {
                _id: -1,
              },
            },
            {
              $skip: parseInt(size) * parseInt(currentPage),
            },
            {
              $limit: parseInt(size),
            },
          ])
          .toArray(),
        db
          .collection('orders')
          .aggregate<Order>([
            {
              $match: {
                checkoutStatus: 'paid',
                'payment.status': 'paid',
                'shipping.pickup': {
                  $ne: true,
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$payment.date',
                  },
                },
              },
            },
          ])
          .toArray(),
      ]).then(([orders, total]) => {
        return { orders, total: total.length };
      });
    });
  },
};

export default Secure(listReadyToDispatch);
