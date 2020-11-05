import React, { useEffect, useState } from 'react';
import produce from 'immer';

import { useT } from 'lib/i18n';
import { Button, screen } from 'ui';

import {
  Outer,
  Facet,
  FacetTitle,
  FacetMobileButton,
  FacetMobileCloseButton
} from './styles';
import { Price } from './price';
import SingleFacetValue from './single-facet-value';
import SearchTerm from './search-term';

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

export default function Facets({
  aggregations = {},
  spec,
  changeQuery,
  totalResults
}) {
  const t = useT();
  const { priceRange } = spec.filter.productVariants;
  const { price } = aggregations;
  const [show, setShow] = useState(false);

  // Prevent body scroll while mobile facets filter is open
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
  }, [show]);

  // Auto hide mobile facets filter if view is changed to desktop
  useEffect(() => {
    function onMediaMatch(evt) {
      if (evt.matches && show) {
        setShow(false);
      }
    }

    const matcher = matchMedia(`(min-width: ${screen.md}px)`);
    matcher.addEventListener('change', onMediaMatch);

    return () => matcher.removeEventListener('change', onMediaMatch);
  }, [show, setShow]);

  // Reset a single facet
  function reset({ name, ...rest }) {
    changeQuery((query) => {
      if (name === 'price') {
        delete query.min;
        delete query.max;
      } else if (name === 'attribute') {
        if (Array.isArray(query.attrs)) {
          const index = query.attrs.findIndex((a) =>
            a.startsWith(`${rest.attribute}:`)
          );
          query.attrs.splice(index, 1);
        } else {
          delete query.attrs;
        }
      }
    });
  }

  function onSearchTermChange(searchTerm) {
    changeQuery((query) => {
      if (searchTerm) {
        query.searchTerm = searchTerm;
      } else {
        delete query.searchTerm;
      }
    });
  }

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
    <>
      <FacetMobileButton>
        <Button onClick={() => setShow(true)}>
          {t('search.filterResults')}
        </Button>
      </FacetMobileButton>
      <Outer $show={show}>
        <SearchTerm
          searchTerm={spec.filter?.searchTerm}
          onChange={onSearchTermChange}
        />

        {price && price.min !== price.max && (
          <Facet>
            <FacetTitle>
              <span>{t('search.facets.price.title')}</span>
              {priceRange &&
                priceRange.min !== price.min &&
                priceRange.max !== price.max && (
                  <button onClick={() => reset({ name: 'price' })}>
                    {t('search.facets.reset')}
                  </button>
                )}
            </FacetTitle>
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
            <FacetTitle>
              <span>{attribute}</span>
              {spec?.filter?.productVariants?.attributes?.some(
                (a) => a.attribute === attribute
              ) && (
                <button onClick={() => reset({ name: 'attribute', attribute })}>
                  {t('search.facets.reset')}
                </button>
              )}
            </FacetTitle>
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
        <FacetMobileCloseButton>
          <Button onClick={() => setShow(false)}>
            {t('search.facets.viewNResults', { count: totalResults })}
          </Button>
        </FacetMobileCloseButton>
      </Outer>
    </>
  );
}
