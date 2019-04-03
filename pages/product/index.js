/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { BasketContext, createBasketItem } from '@crystallize/react-basket';
import { LayoutContext } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import Chunk from '@crystallize/content-chunk/reactChunk';
import { graphql } from 'react-apollo';
import { H1, Button, screen, Outer } from 'ui';
import Layout from 'components/layout';
import VariantSelector from 'components/variant-selector';
import { translate } from 'react-i18next';
import { withRouter } from 'next/router';
import { normalizeContentFields } from 'lib/normalizers';

import graphSettings from './graph-settings';
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
  static getInitialProps({ req, graphData }) {
    if (req) {
      // No category found. Show 404
      if (!graphData || !graphData.tree) {
        req.throw404();
      }
    }
    return {};
  }

  static graph = graphSettings;

  render() {
    const { data, t } = this.props;
    const { loading, error } = data;

    if (loading) {
      return <Layout {...this.props} loading />;
    }

    if (error) {
      return (
        <Layout {...this.props} error>
          Error getting product
        </Layout>
      );
    }

    let title = t('Loading');

    const {
      tree: {
        0: { children }
      }
    } = data;
    const {
      router: { asPath }
    } = this.props;
    const [masterProduct] = children.filter(p => p.path === asPath);

    if (masterProduct) title = masterProduct.name;

    return (
      <div>
        {!masterProduct ? (
          <div>Error, Product not found</div>
        ) : (
          <Layout {...this.props} title={title}>
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
        )}
      </div>
    );
  }
}

export default withRouter(
  graphql(ProductPageDataLoader.graph.query, ProductPageDataLoader.graph)(
    translate()(ProductPageDataLoader)
  )
);
