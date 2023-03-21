import assert from 'assert';
import { ContextType } from 'src/context/Context';
import {
  MembershipOptions,
  MembershipTier,
} from 'src/modules/membershipTier/Models/MembershipTier';
import { WhpptMongoDatabase } from 'src/Services/Database/Mongo/Database';
import { Order } from '../Models/Order';
import orderBy from 'lodash/orderBy';

export type QueryMemberTier = (
  context: ContextType,
  args: { memberId?: string; domainId: string; orderId?: string }
) => Promise<MembershipTier>;

export const queryMemberTier: QueryMemberTier = (
  { $database },
  { memberId, domainId }
) => {
  if (!memberId) return Promise.resolve({} as MembershipTier);
  return $database.then(database => {
    assert(domainId, 'Domain Id required');

    const { db, document } = database as WhpptMongoDatabase;

    return Promise.all([
      db.collection('members').findOne({ _id: memberId }),
      document.query<MembershipOptions>('site', {
        filter: { _id: `membershipOptions_${domainId}` },
      }),
    ]).then(([member, membershipOptions]) => {
      assert(member, 'Member not found');
      assert(membershipOptions, 'Member Tiers not found');

      const lockedTier = member?.lockToTier
        ? membershipOptions?.membershipTiers?.find(tier => tier._id === member.lockToTier)
        : undefined;

      if (lockedTier)
        return { ...lockedTier, amountToSpendToNextTier: 0 } as MembershipTier;

      const year = new Date().getFullYear();
      const startYear = new Date(`1/1/${year - 2} 10:30`);
      const endYear = new Date(`1/1/${year} 10:30`);

      return db
        .collection('orders')
        .aggregate<Order>([
          {
            $match: {
              memberId: memberId,
              'payment.status': 'paid',

              $and: [
                {
                  updatedAt: {
                    $gte: startYear,
                  },
                },
                {
                  updatedAt: { $lt: endYear },
                },
              ],
            },
          },
          {
            $project: {
              payment: 1,
            },
          },
        ])
        .toArray()
        .then(orders => {
          assert(membershipOptions, 'MembershipTiers not found.');

          const sortedTiers = orderBy(
            membershipOptions.membershipTiers,
            ['level'],
            ['desc']
          ) as MembershipTier[];

          const amountSpentForYear = orders.reduce(
            (partialSum, a) =>
              partialSum +
              (a?.payment?.subTotal
                ? a?.payment?.subTotal - a?.payment?.memberTotalDiscount
                : 0),
            0
          );

          const currentTier = sortedTiers.find(
            t => t.entryLevelSpend <= amountSpentForYear
          );
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
  });
};
