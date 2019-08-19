import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';
import { screen } from 'ui';
import { Outer, Inner, Figure, Img, Footer, Price, imageWidth } from './styles';

const placeHolderImg = '/static/placeholder.png';

class CategoryItem extends React.Component {
  render() {
    const { data, key } = this.props;
    const { name, path, variants } = data;

    if (!data) {
      return null;
    }

    const { type } = data;

    if (type === 'folder' || type === 'document') {
      return (
        <Link as={`/p${path}`} key={key} href="/catalog" passHref>
          <Outer>
            <Inner onlytext>{name}</Inner>
          </Outer>
        </Link>
      );
    }

    const { price, image } = variants
      ? variants.find(variant => variant.isDefault)
      : {};

    return (
      <Link as={`/p${path}`} key={key} href="/catalog" passHref>
        <Outer>
          <Inner>
            <Figure>
              <Img
                src={image && image.url ? image.url : placeHolderImg}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = placeHolderImg;
                }}
                alt={name}
                sizes={`(min-width ${screen.md}px) ${imageWidth.lg}, ${imageWidth.xs}`}
              />
            </Figure>
            <Footer>
              <div>
                <span>{name}</span>
                <Price>
                  <CurrencyValue value={price} />
                </Price>
              </div>
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }
}

export default CategoryItem;
