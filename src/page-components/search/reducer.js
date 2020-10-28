import produce from 'immer';

export default produce(function SearchSpecReducer(draft, { action, ...rest }) {
  if (!draft.filter.productVariants) {
    draft.filter.productVariants = {};
  }

  switch (action) {
    case 'setSearchTerm': {
      draft.filter.searchTerm = rest.searchTerm;
      break;
    }
    case 'setOrderBy': {
      draft.orderBy = rest.orderBy;
      break;
    }
    case 'setPriceRange': {
      const { priceRange, fromRange } = rest;

      draft.filter.productVariants.priceRange = priceRange;

      if (fromRange) {
        draft.blockingUIElement = 'price-range';
      }

      break;
    }
    case 'priceRangeFinished': {
      delete draft.blockingUIElement;
      break;
    }
    case 'singleFacetValueChanged': {
      const { attribute, value, checked } = rest;

      if (!draft.filter.productVariants.attributes) {
        draft.filter.productVariants.attributes = [];
      }

      const existingAttr = draft.filter.productVariants.attributes.find(
        (attr) => attr.attribute === attribute
      );

      if (existingAttr) {
        if (checked) {
          existingAttr.values.push(value);
        } else {
          existingAttr.values.splice(existingAttr.values.indexOf(value), 1);
        }
      } else {
        draft.filter.productVariants.attributes.push({
          attribute,
          values: [value]
        });
      }
      break;
    }
    case 'navigate': {
      draft.before = rest.before;
      draft.after = rest.after;
      break;
    }
    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }

  if (!draft.filter.searchTerm) {
    delete draft.filter.searchTerm;
  }
});
