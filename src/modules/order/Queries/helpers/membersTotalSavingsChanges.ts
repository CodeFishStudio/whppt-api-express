import { MembershipTier } from 'src/modules/membershipTier/Models/MembershipTier';

export type CalculateMembersTotalSavingsArgs = (
  tiers: MembershipTier[],
  currentPurchaseAmount: number,
  spentThisPeriod: number,
  amountOfProducts: number
) => { total: number; discounts: number };

export const calculateMembersTotalSavings: CalculateMembersTotalSavingsArgs = (
  tiers,
  currentPurchaseAmount,
  spentThisYear,
  amountOfProducts
) => {
  const ffTier = tiers.find(t => t.name === 'Friends of the Farm');
  const trTier = tiers.find(t => t.name === 'Tally Room Member');
  // const coTier = tiers.find(t => t.name === 'Clos Otto Club Member');

  const { ffRemaining, ffDiscountApplied } = buildFFDiscount(
    currentPurchaseAmount,
    spentThisYear,
    ffTier,
    trTier,
    amountOfProducts
  );

  //Check if there's remainder to apply discount to for TR

  // Check if there is remainder to apply discount to for CO

  return {
    total: ffRemaining,
    discounts: ffDiscountApplied,
  };
};

const buildFFDiscount: any = (
  currentPurchaseAmount: number,
  spentThisYear: number,
  ffTier: MembershipTier,
  trTier: MembershipTier,
  amountOfProducts: number
) => {
  console.log(
    '🚀 ~ file: membersTotalSavingsChanges.ts:45 ~ currentPurchaseAmount:',
    currentPurchaseAmount
  );

  const tierLimit = getTierLimit(trTier, spentThisYear);
  const upperLimitDiscount = getUpperTierLimitDelta(tierLimit, ffTier.discounts[0].value);
  console.log(
    '🚀 ~ file: membersTotalSavingsChanges.ts:55 ~ upperLimitDiscount:',
    upperLimitDiscount
  );
  const discountBase = upperLimitDiscount - spentThisYear;
  console.log(
    '🚀 ~ file: membersTotalSavingsChanges.ts:57 ~ discountBase:',
    discountBase
  );

  if (discountBase) {
    const discount = ffTier.discounts.reduce(
      calculateDiscountAmount(discountBase, amountOfProducts, ffTier),
      0
    );

    console.log('🚀 ~ file: membersTotalSavingsChanges.ts:61 ~ discount:', discount);
    console.log('discounts results : ************** : ', {
      ffRemaining: upperLimitDiscount - discount - discountBase,
      ffDiscountApplied: discount,
    });

    return {
      ffRemaining: upperLimitDiscount - discount - discountBase,
      ffDiscountApplied: discount,
    };
  }

  return { ffRemaining: 0, ffDiscountApplied: 0 };

  // const { discountAmount, tierBase } = tier.discounts.reduce(
  //   calculateDiscountAmount(remainingSubTotal, tier, amountSpent, nextTier),
  //   0
  // );
};

//calculate how much till next tier according to spent in year
const getTierLimit = (tier: MembershipTier, spentThisYear: number) => {
  return tier.entryLevelSpend - spentThisYear < 0
    ? 0
    : tier.entryLevelSpend - spentThisYear;
};

// get limit plus the recursive discount
const getUpperTierLimitDelta = (base: number, discountValue: number) => {
  let percentage = discountValue / 100;
  let discount = 0;
  let partial = base * percentage;

  while (partial >= 1) {
    discount += partial;
    partial *= percentage;
  }

  return Math.floor(discount);
};

const calculateDiscountAmount =
  (remainingToSpend: number, amountOfProducts: number, nextTier?: MembershipTier) =>
  (partialSum: number, discount: any) => {
    console.log('🚀 ~ file: membersTotalSavingsChanges.ts:121 ~ discount:', discount);
    if (discount.appliedTo === 'shipping') return partialSum + 0;
    if (
      discount.minItemsRequiredForDiscount &&
      discount.minItemsRequiredForDiscount > amountOfProducts
    )
      return partialSum + 0;
    if (discount.type === 'flat') return partialSum + discount.value;
    if (!nextTier) return (remainingToSpend * discount.value) / 100;

    return (remainingToSpend * discount.value) / 100;

    // const tierLimit = nextTier.entryLevelSpend - tier.entryLevelSpend;
    // const deltaToSpend = maxTeirSpendDiscountDelta(tierLimit, discount.value / 100);
    // const maxTierToSpend = (tier.amountToSpendToNextTier || 0) + deltaToSpend - (amountSpentForYear - nextTier.entryLevelSpend);

    // const tierBase = nextTier ? (remainingToSpend > maxTierToSpend ? maxTierToSpend : remainingToSpend) : remainingToSpend;
    // const discountAmount = getFullDiscoutnAmount2(tierBase, tierLimit, discount.value / 100);
    // return {
    //   discountAmount,
    //   tierBase,
    // };
  };

// const getFullDiscountAmmount = (tierBase: number, percentage: number) => {
//   let discount = 0;
//   let partial = tierBase * percentage;

//   while (partial >= 1) {
//     discount += partial;
//     partial *= percentage;
//   }

//   return Math.floor(discount);
// };

// const getFullDiscoutnAmount2 = (remainingToSpend: number, tierBase: number, percentage: number) => {
//   const tierMax = tierBase + maxTeirSpendDiscountDelta(tierBase, percentage);

//   return remainingToSpend > tierMax ? tierMax * percentage : remainingToSpend * percentage;
// };

// const maxTeirSpendDiscountDelta = (tierBase: number, basePercentage: number) => {
//   let upperLimitDiscount = 0;
//   let partial = tierBase * basePercentage;
//   while (partial >= 1) {
//     upperLimitDiscount += partial;
//     partial *= basePercentage;
//   }
//   return Math.floor(upperLimitDiscount);
// };

// const applyDiscountsRecursively: any = (
//   tiers: any,
//   remainingSubTotal: number,
//   amountSpent: number,
//   _discounts: any,
//   nextTierIndex = 0
// ) => {
//   const tier = tiers[nextTierIndex];
//   if (!tier) return _discounts;

//   const nextTier = tiers[nextTierIndex + 1];

//   // const tierLimit = nextTier.entryLevelSpend - tier.entryLevelSpend;
//   // const deltaToSpend = maxTeirSpendDiscountDelta(tierLimit, tier.value / 100);
//   // const maxTierToSpend = tier.amountToSpendToNextTier + deltaToSpend;

//   // const tierBase = nextTier ? (remainingSubTotal > maxTierToSpend ? maxTierToSpend : remainingSubTotal) : remainingSubTotal;

//   const { discountAmount, tierBase } = tier.discounts.reduce(calculateDiscountAmount(remainingSubTotal, tier, amountSpent, nextTier), 0);

//   _discounts.push({
//     amount: Number(discountAmount.toFixed(2)),
//     tier: tier.name,
//   });

//   const updatedSubtotal = remainingSubTotal - tierBase - discountAmount;
//   const updatedAmountSpent = amountSpent + tierBase + discountAmount;

//   if (updatedSubtotal > 0 && nextTier) {
//     return applyDiscountsRecursively(tiers, updatedSubtotal, updatedAmountSpent, _discounts, nextTierIndex + 1);
//   } else {
//     return _discounts;
//   }
// };

// const discounts = applyDiscountsRecursively(
//   [tier, ...(tier.nextTiers?.length ? tier.nextTiers : [null])],
//   subTotal,
//   tier.amountSpentForYear || 0,
//   []
// );

// return discounts;
