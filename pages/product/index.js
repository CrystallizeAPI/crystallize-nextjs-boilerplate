/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { Query } from 'react-apollo';
import { BasketContext, createBasketItem } from '@crystallize/react-basket';
import { LayoutContext } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import Chunk from '@crystallize/content-chunk/reactChunk';
import { withRouter } from 'next/router';

import { H1, Button, screen, Outer } from 'ui';
import Layout from 'components/layout';
import VariantSelector from 'components/variant-selector';
import { FETCH_TREE_NODE_AND_MENU } from 'lib/graph';
import { withNamespaces } from 'lib/i18n';
import { normalizeContentFields } from 'lib/normalizers';

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

class ProductPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Determine the selected variant
    if (prevState && !prevState.selectedVariant) {
      const { masterProduct } = nextProps;
      if (masterProduct) {
        const product = masterProduct;

        let selectedVariant;
        if (product.variants && product.variants.length > 0) {
          selectedVariant = product.variants.find(p => p.isDefault === true);
          if (!selectedVariant) [selectedVariant] = product.variants;
        }

        const folder = masterProduct.components
          ? normalizeContentFields(masterProduct.components)
          : undefined;

        return {
          dimensions: product.variants,
          selectedVariant,
          folder
        };
      }
    }
    return {};
  }

  state = {
    selectedVariant: null,
    dimensions: null
  };

  onVariantValueChange = ({ dimensionId }) => {
    const { dimensions } = this.state;
    const selectedVariant = dimensions.find(p => p.id === dimensionId);
    if (selectedVariant) this.setState({ selectedVariant });
  };

  buy = async () => {
    const { selectedVariant } = this.state;
    const { layoutContext, basketContext, masterProduct } = this.props;

    const basketItemToAdd = createBasketItem({
      masterProduct,
      variant: {
        ...selectedVariant,
        image: ((selectedVariant || {}).image || {}).url || placeHolderImg,
        placeholder_image: placeHolderImg
      }
    });

    basketContext.actions.addItem(basketItemToAdd);
    await layoutContext.actions.showRight();
    basketContext.actions.animateItem(basketItemToAdd);
  };

  render() {
    const { t, masterProduct } = this.props;
    const { selectedVariant, dimensions, folder } = this.state;

    const selectedVariantImg =
      ((selectedVariant || {}).image || {}).url || placeHolderImg;
    const shortDescription =
      (((folder || {}).shortDescription || {}).content || {}).json || undefined;

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
                alt={masterProduct.name}
              />
            </MediaInner>
          </Media>
          <Info>
            <H1>{masterProduct.name}</H1>
            {!!shortDescription && (
              <Description>
                <Chunk {...shortDescription} />
              </Description>
            )}

            <VariantSelector
              dimensions={dimensions}
              selectedVariant={selectedVariant}
              onVariantValueChange={this.onVariantValueChange}
            />
            <ProductFooter>
              <Price>
                <strong>
                  {t('currency', { amount: selectedVariant.price })}
                </strong>
              </Price>
              <Button buy fullWidth type="button" onClick={this.buy}>
                Add to basket
              </Button>
            </ProductFooter>
          </Info>
        </Sections>
      </Outer>
    );
  }
}

class ProductPageDataLoader extends React.Component {
  static async getInitialProps({ asPath }) {
    return {
      namespacesRequired: ['common', 'basket', 'product'],
      asPath
    };
  }

  render() {
    const { asPath: path, t } = this.props;

    return (
      <Query
        variables={{ path, language: 'en' }}
        query={FETCH_TREE_NODE_AND_MENU}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Layout loading title={t('Loading')} />;
          }

          if (error) {
            return <Layout error />;
          }

          const [masterProduct] = data.tree;

          return (
            <Layout title={masterProduct.name}>
              <LayoutContext.Consumer>
                {layoutContext => (
                  <BasketContext.Consumer>
                    {basketContext => (
                      <ProductPage
                        layoutContext={layoutContext}
                        basketContext={basketContext}
                        masterProduct={masterProduct}
                        {...this.props}
                      />
                    )}
                  </BasketContext.Consumer>
                )}
              </LayoutContext.Consumer>
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(
  withNamespaces(['common', 'basket', 'product'])(ProductPageDataLoader)
);
