import React, { useEffect, useState } from 'react';
import produce from 'immer';

import { useTranslation } from 'next-i18next';
import { Button } from 'ui';

import {
  Outer,
  FacetsDisplayer,
  FacetGroupOfAttributes,
  ButtonCloseFacets
} from './styles';
import { Price } from './price';
import { ButtonToggleFacets } from './toggle-facets-button';
import { FacetGroup, FaceGroupAction } from './group';
import { FacetCheckbox } from './checkbox';

const SCREEN_SIZE_FROM_WE_DONT_BLOCK_SCROLL = 1024;

export default function Facets({
  aggregations = {},
  spec,
  changeQuery,
  totalResults
}) {
  const { t } = useTranslation('search');
  const { priceRange } = spec.filter.productVariants;
  const { price } = aggregations;
  const [areFacetsShown, setAreFacetsShown] = useState(false);
  const showFilters = () => setAreFacetsShown(true);
  const hideFilters = () => setAreFacetsShown(false);
  const toggleFilters = () => {
    areFacetsShown ? hideFilters() : showFilters();
  };

  // Only for small devices, the facets are shown as a "modal" when opened.
  // After opening them, the window scroll is blocked so the content
  // underneath that modal, can't be scrolled.
  //
  // For larger resolutions than 1024px included, we don't have that behaviour anymore.
  // When the facets are opened, the are toggled below the open/hide buttons.
  // Because of this, the body scroll should not be blocked.
  //
  // Given this requirements, we block the scroll of the body depending on the screen width.
  // Also, we don't check if window !== undefined because React Hooks are always executed
  // in the client side, where the window object exists.
  useEffect(() => {
    if (window.innerWidth < SCREEN_SIZE_FROM_WE_DONT_BLOCK_SCROLL) {
      areFacetsShown ? lockDocumentScroll() : unlockDocumentScroll();
    }
  }, [areFacetsShown]);

  // Reset a single facet
  function resetFacet({ name, attribute }) {
    changeQuery((query) => {
      if (name === 'price') {
        delete query.min;
        delete query.max;
        return;
      }

      if (name === 'attribute' && !Array.isArray(query.attrs)) {
        delete query.attrs;
        return;
      }

      const index = query.attrs.findIndex((a) => a.startsWith(`${attribute}:`));
      query.attrs.splice(index, 1);
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

  function handleOnFacetCheckboxChange({ attribute, value, isChecked }) {
    changeQuery((query) => {
      const newAttrs = produce(
        spec.filter.productVariants.attributes || [],
        (draft) => {
          const existingAttr = draft.find(
            (attr) => attr.attribute === attribute
          );

          if (!existingAttr) {
            draft.push({ attribute, values: [value] });
            return;
          }

          // At this point we know for sure that is an existing attribute.
          isChecked
            ? existingAttr.values.push(value)
            : existingAttr.values.splice(existingAttr.values.indexOf(value), 1);
        }
      ).filter(({ values }) => values.length > 0);

      if (!newAttrs || newAttrs.length === 0) {
        delete query.attrs;
        return;
      }

      query.attrs = newAttrs.map(singleAttrToQuery);

      if (query.attrs.length === 1) {
        query.attrs = query.attrs[0];
      }
    });
  }

  const hasMinMaxPriceRangeValuesDifferent =
    priceRange &&
    priceRange?.min !== price?.min &&
    priceRange?.max !== price?.max;

  return (
    <Outer>
      <ButtonToggleFacets
        onClick={toggleFilters}
        areFacetsShown={areFacetsShown}
      />
      <FacetsDisplayer $show={areFacetsShown}>
        {price && price.min !== price.max && (
          <FacetGroup
            title={t('facets.price.title')}
            action={
              hasMinMaxPriceRangeValuesDifferent && (
                <FaceGroupAction onClick={() => resetFacet({ name: 'price' })}>
                  {t('facets.reset')}
                </FaceGroupAction>
              )
            }
          >
            <Price
              {...price}
              onChange={onPriceChange}
              value={{ ...price, ...priceRange }}
            />
          </FacetGroup>
        )}

        {getAttributeGroups(aggregations).map(({ attribute, values }) => {
          const hasFiltersApplied = spec?.filter?.productVariants?.attributes?.some(
            (a) => a.attribute === attribute
          );

          function handleAttributeValueChange() {
            resetFacet({ name: 'attribute', attribute });
          }

          return (
            <FacetGroup
              key={attribute}
              title={attribute}
              action={
                hasFiltersApplied && (
                  <FaceGroupAction onClick={handleAttributeValueChange}>
                    {t('facets.reset')}
                  </FaceGroupAction>
                )
              }
            >
              <FacetGroupOfAttributes>
                {values.map(({ value, count }) => {
                  const isAttributeValueChecked = Boolean(
                    spec.filter?.productVariants?.attributes?.some(
                      (attr) =>
                        attr.attribute === attribute &&
                        attr.values.includes(value)
                    )
                  );

                  return (
                    <FacetCheckbox
                      key={value}
                      attribute={attribute}
                      value={value}
                      count={count}
                      isChecked={isAttributeValueChecked}
                      onChange={handleOnFacetCheckboxChange}
                    />
                  );
                })}
              </FacetGroupOfAttributes>
            </FacetGroup>
          );
        })}

        <ButtonCloseFacets>
          <Button onClick={hideFilters}>
            {t('facets.viewNResults', { count: totalResults })}
          </Button>
        </ButtonCloseFacets>
      </FacetsDisplayer>
    </Outer>
  );
}

function lockDocumentScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockDocumentScroll() {
  document.body.style.overflow = 'auto';
}

function singleAttrToQuery(attr) {
  return `${attr.attribute}:${attr.values.join(',')}`;
}

function getAttributeGroups({ variantAttributes = [] }) {
  const groups = [];

  variantAttributes.forEach(({ attribute, value, count }) => {
    const existingGroup = groups.find((g) => g.attribute === attribute);
    existingGroup
      ? existingGroup.values.push({ value, count })
      : groups.push({ attribute, values: [{ value, count }] });
  });

  return groups;
}
