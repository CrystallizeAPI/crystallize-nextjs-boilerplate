/* eslint react/no-multi-comp: 0 */
import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import { LayoutContext } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import { withRouter } from 'next/router';

import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import { withTranslation } from 'lib/i18n';
import { H1, Button, screen, Outer } from 'ui';
import { useBasket, getVariantVATprops } from 'components/basket';
import Layout from 'components/layout';
import VariantSelector from 'components/variant-selector';
import ShapeComponents from 'components/shape/components';

import {
  Sections,
  Media,
  MediaInner,
  Info,
  Price,
  ProductFooter,
  Description
} from './styles';

const placeHolderImg = '/static/placeholder.png';

const ProductPage = ({ t, product, defaultVariant }) => {
  const layout = useContext(LayoutContext);
  const basket = useBasket();

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

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
          <Description>
            <ShapeComponents components={product.components} />
          </Description>

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onChange={onSelectedVariantChange}
          />
          <ProductFooter>
            <Price>
              <strong>
                {t('currency', { amount: selectedVariant.price })}
              </strong>
            </Price>
            <Button onClick={buy}>Add to basket</Button>
          </ProductFooter>
        </Info>
      </Sections>
    </Outer>
  );
};

const ProductPageDataLoader = props => {
  const { asPath: path, t } = props;

  return (
    <Query
      variables={{ path, language: 'en' }}
      query={FETCH_TREE_NODE_AND_MENU}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Layout loading title={t('Loading')} />;
        }

        if (error || !data.tree) {
          return <Layout error />;
        }

        const [product] = data.tree;

        const defaultVariant = product.variants.find(v => v.isDefault);

        if (!defaultVariant) {
          return (
            <Layout title={product.name}>This product has no variants</Layout>
          );
        }

        return (
          <Layout title={product.name}>
            <ProductPage
              key={product.id}
              product={product}
              defaultVariant={defaultVariant}
              {...props}
            />
          </Layout>
        );
      }}
    </Query>
  );
};

ProductPageDataLoader.getInitialProps = ({ asPath }) => ({
  namespacesRequired: ['common', 'basket', 'product'],
  asPath
});

export default withRouter(
  withTranslation(['common', 'basket', 'product'])(ProductPageDataLoader)
);
