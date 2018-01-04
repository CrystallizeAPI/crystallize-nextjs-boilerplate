import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../header';

export const Figure = styled.figure`
  filter: grayscale(70%);

  img {
    display: block;
  }
`;

export default class FrontPage extends React.PureComponent {
  static propTypes = {
    shopName: PropTypes.string.isRequired,
    bannerImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      title: PropTypes.string
    })
  };

  render() {
    const { bannerImage, shopName } = this.props;
    return (
      <main>
        <Header shopName={shopName} />
        <h1>Welcome to your Crystallize shop!</h1>
        {bannerImage && (
          <Figure>
            <img
              src={bannerImage.src}
              alt={bannerImage.alt}
              title={bannerImage.title}
            />
          </Figure>
        )}
      </main>
    );
  }
}
