import assert from 'assert';
import { ContextType } from 'src/context/Context';
import {
  MembershipOptions,
  MembershipTier,
} from 'src/modules/membershipTier/Models/MembershipTier';
import { WhpptMongoDatabase } from 'src/Services/Database/Mongo/Database';
import { Order } from '../Models/Order';
import sortBy from 'lodash/sortBy';

export type QueryMemberTier = (
  context: ContextType,
  args: { memberId?: string; domainId: string }
) => Promise<MembershipTier>;

export const queryMemberTier: QueryMemberTier = (
  { $database },
  { memberId, domainId }
) => {
  if (!memberId) return Promise.resolve({} as MembershipTier);
  return $database.then(database => {
    assert(domainId, 'Domain Id required');

    // const year = new Date().getFullYear();
    // const startYear = new Date(`1/1/${year} 10:30`);
    // const endYear = new Date(`1/1/${year + 1} 10:30`);

    const { db, document } = database as WhpptMongoDatabase;
    return Promise.all([
      document.query<MembershipOptions>('site', {
        filter: { _id: `membershipOptions_${domainId}` },
      }),
      db
        .collection('orders')
        .aggregate<Order>([
          {
            $match: {
              memberId: memberId,
              'payment.status': 'paid',

              // $and: [
              //   {
              //     updatedAt: {
              //       $gte: startYear,
              //     },
              //   },
              //   {
              //     updatedAt: { $lt: endYear },
              //   },
              // ],
            },
          },
          {
            $project: {
              payment: 1,
            },
          },
        ])
        .toArray(),
    ]).then(([tiers, orders]) => {
      console.log('🚀 tiers', tiers);
      console.log('🚀 orders', orders);
      assert(tiers, 'MembershipTiers not found.');

      const sortedTiers = sortBy(tiers.membershipTiers, a => !Number(a.level));
      console.log('🚀 sortedTiers', sortedTiers);
      const _sortedTiers = sortBy(tiers.membershipTiers, a => Number(a.level));
      console.log('🚀 _sortedTiers', _sortedTiers);
      const _2sortedTiers = sortBy(tiers.membershipTiers, a => a.level);
      console.log('🚀 _2sortedTiers', _2sortedTiers);
      const _3sortedTiers = sortBy(tiers.membershipTiers, a => !a.level);
      console.log('🚀 _3sortedTiers', _3sortedTiers);

      const amountSpentForYear = orders.reduce(
        (partialSum, a) => partialSum + (a?.payment?.amount ? a?.payment?.amount : 0),
        0
      );

      const currentTier = sortedTiers.find(t => t.entryLevelSpend <= amountSpentForYear);
      const nextTierLevel = (currentTier?.level || 0) + 1;
      const nextTier = sortedTiers.find(t => t.level === nextTierLevel);

      return {
        ...currentTier,
        amountToSpendToNextTier: nextTier
          ? nextTier.entryLevelSpend - amountSpentForYear
          : 0,
      } as MembershipTier;
    });
  });
};
