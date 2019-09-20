/* eslint react/no-multi-comp: 0 */
import React, { useState, useContext } from 'react';
import { Grid } from '@crystallize/grid-renderer/react';
import { LayoutContext } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import { withRouter } from 'next/router';

import { H1, H2, H3, Button, screen, Outer } from 'ui';
import CategoryItem from 'components/category-item';
import { CurrencyValue } from 'components/currency-value';
import { useBasket, getVariantVATprops } from 'components/basket';
import Layout from 'components/layout';
import VariantSelector from 'components/variant-selector';
import ShapeComponents from 'components/shape/components';
import { useTopicQuery } from 'lib/graph';

import {
  Sections,
  Media,
  MediaInner,
  Info,
  Price,
  ProductFooter,
  Summary,
  Description,
  RelatedTopics
} from './styles';

const placeHolderImg = '/static/placeholder.png';

const ProductPage = ({ product, defaultVariant }) => {
  const layout = useContext(LayoutContext);
  const basket = useBasket();

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  // Use the first 2 topics to fetch related products
  const topics = product.topics ? product.topics.slice(0, 2) : [];
  const topicResults = topics.map(topic =>
    useTopicQuery({
      name: topic.name,
      ancestry: topic.parent ? topic.parent.name : null
    })
  );

  const onSelectedVariantChange = variant => setSelectedVariant(variant);

  const buy = async () => {
    const basketItemToAdd = {
      ...getVariantVATprops({ product, variant: selectedVariant }),
      ...selectedVariant,
      name: product.name
    };

    basket.actions.addItem(basketItemToAdd);
    await layout.actions.showRight();
    basket.actions.pulsateItemInBasket(basketItemToAdd);
  };

  const selectedVariantImg =
    (selectedVariant.image || {}).url || placeHolderImg;

  const summaryComponent = product.components.find(c => c.name === 'Summary');
  const description = product.components.find(c => c.name === 'Description');

  return (
    <Outer>
      <Sections>
        <Media>
          <MediaInner>
            <Img
              src={selectedVariantImg}
              onError={e => {
                e.target.onerror = null;
                e.target.src = placeHolderImg;
              }}
              sizes={`(max-width: ${screen.sm}px) 400px, 600px`}
              alt={product.name}
            />
          </MediaInner>
        </Media>
        <Info>
          <H1>{product.name}</H1>
          <Summary>
            {summaryComponent && (
              <ShapeComponents components={[summaryComponent]} />
            )}
          </Summary>

          {product.variants.length > 1 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onChange={onSelectedVariantChange}
            />
          )}

          <ProductFooter>
            <Price>
              <strong>
                <CurrencyValue value={selectedVariant.price} />
              </strong>
            </Price>
            <Button onClick={buy}>Add to basket</Button>
          </ProductFooter>
        </Info>
      </Sections>

      <Description>
        <ShapeComponents className="description" components={[description]} />
      </Description>

      {!!topics.length && (
        <RelatedTopics>
          <H2>Related Products</H2>

          {topicResults.map(result => {
            if (result.fetching || result.error || !result.data) {
              return null;
            }

            // We only want to show the first 4 products for a topic
            const topic = result.data.topics[0];
            const cells = topic.items
              .filter(item => item.id !== product.id)
              .slice(0, 4)
              .map(item => ({
                item: { ...item }
              }));

            if (!cells.length) {
              return null;
            }

            return (
              <>
                <H3>{topic.name}</H3>
                <Grid
                  cells={cells}
                  renderCellContent={cell => (
                    <CategoryItem key={cell.item.id} data={cell.item} />
                  )}
                />
              </>
            );
          })}
        </RelatedTopics>
      )}
    </Outer>
  );
};

const ProductPageDataLoader = ({ data }) => {
  const [product] = data.tree;
  const defaultVariant = product.variants.find(v => v.isDefault);

  if (!defaultVariant) {
    return <Layout title={product.name}>This product has no variants</Layout>;
  }

  return (
    <Layout title={product.name}>
      <ProductPage
        key={product.id}
        product={product}
        defaultVariant={defaultVariant}
      />
    </Layout>
  );
};

export default withRouter(ProductPageDataLoader);
