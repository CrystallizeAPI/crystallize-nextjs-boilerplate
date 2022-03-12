import produce from 'immer';

export function cleanFilterForTotalAggregations(filter) {
  return produce(filter, (draft) => {
    delete draft.productVariants.priceRange;
    delete draft.productVariants.attributes;
  });
}
