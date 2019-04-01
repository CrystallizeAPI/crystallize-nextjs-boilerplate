import React from 'react';
import Link from 'next/link';

import { translate } from 'react-i18next';

import { screen } from 'ui';
import { Outer, Inner, Figure, Img, Footer, Price, imageWidth } from './styles';

const placeHolderImg = '/static/placeholder.png';

class CategoryItem extends React.Component {
  render() {
    const { data, t, key } = this.props;
    const { name, path, variants } = data;

    if (!data) {
      return null;
    }

    const { price, image } = variants[0];

    return (
      <Link as={path} key={key} href="/product" passHref prefetch>
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
                sizes={`(min-width ${screen.md}px) ${imageWidth.lg}, ${
                  imageWidth.xs
                }`}
              />
            </Figure>
            <Footer>
              <div>
                <span>{name}</span>
                <Price>
                  {price
                    ? t('currency', { amount: price })
                    : t('currency', { amount: price })}
                </Price>
              </div>
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }
}

export default translate()(CategoryItem);
