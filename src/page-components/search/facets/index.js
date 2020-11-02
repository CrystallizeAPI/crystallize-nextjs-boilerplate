import React from 'react';
import produce from 'immer';

import { useT } from 'lib/i18n';

import { Outer, Facet, FacetTitle } from './styles';
import { Price } from './price';
import SingleFacetValue from './single-facet-value';

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

function singleAttrToQuery(attr) {
  return `${attr.attribute}:${attr.values.join(',')}`;
}

export default function Facets({ aggregations = {}, spec, changeQuery }) {
  const t = useT();
  const { priceRange } = spec.filter.productVariants;
  const { price } = aggregations;

  function onPriceChange(priceRange) {
    changeQuery((query) => {
      delete query.min;
      delete query.max;

      if (priceRange.min !== price.min) {
        query.min = priceRange.min.toString();
      }
      if (priceRange.max !== price.max) {
        query.max = priceRange.max.toString();
      }
    });
  }

  function onSingleFacetValueChange({ attribute, value, checked }) {
    changeQuery((query) => {
      const newAttrs = produce(
        spec.filter.productVariants.attributes || [],
        (draft) => {
          const existingAttr = draft.find(
            (attr) => attr.attribute === attribute
          );

          if (existingAttr) {
            if (checked) {
              existingAttr.values.push(value);
            } else {
              existingAttr.values.splice(existingAttr.values.indexOf(value), 1);
            }
          } else {
            draft.push({
              attribute,
              values: [value]
            });
          }
        }
      ).filter(({ values }) => values.length > 0);

      if (newAttrs && newAttrs.length > 0) {
        query.attrs = newAttrs.map(singleAttrToQuery);

        if (query.attrs.length === 1) {
          query.attrs = query.attrs[0];
        }
      } else {
        delete query.attrs;
      }
    });
  }

  return (
    <Outer>
      {price && price.min !== price.max && (
        <Facet>
          <FacetTitle>{t('search.facets.price.title')}</FacetTitle>
          <Price
            {...price}
            onChange={onPriceChange}
            value={{
              ...price,
              ...priceRange
            }}
          />
        </Facet>
      )}
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
