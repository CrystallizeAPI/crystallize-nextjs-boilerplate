import React from 'react';

import { useT } from 'lib/i18n';

import { Outer, Facet, FacetTitle } from './styles';
import { Price } from './price';

function groupAttributes({ variantAttributes = [] }) {
  const groups = [];

  variantAttributes.forEach(({ attribute, value, count }) => {
    const existingGroup = groups.find((g) => g.attribute === attribute);
    if (!existingGroup) {
      groups.push({
        attribute,
        values: [{ value, count }]
      });
    } else {
      existingGroup.values.push({ value, count });
    }
  });

  return groups;
}

function SingleFacetValue({ attribute, value, count, spec, onChange }) {
  console.log(Date.now(), spec.filter?.productVariants?.attributes);
  const checked = !!spec.filter?.productVariants?.attributes?.some((attr) => {
    return attr.attribute === attribute && attr.values.includes(value);
  });

  function onInputChange(evt) {
    onChange({ attribute, value, checked: evt.target.checked });
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onInputChange} />
        {value} ({count})
      </label>
    </div>
  );
}

export default function Facets({ aggregations, spec, dispatch }) {
  const t = useT();

  const { price } = aggregations;

  function onPriceChange(priceRange) {
    dispatch({ action: 'setPriceRange', priceRange });
  }

  function onRangeChanging(priceRange) {
    dispatch({ action: 'setPriceRange', priceRange, fromRange: true });
  }

  function onRangeFinished() {
    dispatch({ action: 'priceRangeFinished' });
  }

  function onSingleFacetValueChange(args) {
    dispatch({ action: 'singleFacetValueChanged', ...args });
  }

  return (
    <Outer>
      <Facet>
        <FacetTitle>{t('search.facets.price.title')}</FacetTitle>
        <Price
          {...price}
          onChange={onPriceChange}
          onRangeChanging={onRangeChanging}
          onRangeFinished={onRangeFinished}
          value={spec.filter?.productVariants?.priceRange || price}
        />
      </Facet>
      {groupAttributes(aggregations).map(({ attribute, values }) => (
        <Facet key={attribute}>
          <FacetTitle>{attribute}</FacetTitle>
          {values.map(({ value, count }) => (
            <SingleFacetValue
              key={value}
              attribute={attribute}
              value={value}
              count={count}
              spec={spec}
              onChange={onSingleFacetValueChange}
            />
          ))}
        </Facet>
      ))}
    </Outer>
  );
}
