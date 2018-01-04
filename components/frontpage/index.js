import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';

import { Figure } from './styles';

export default class FrontPage extends React.Component {
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
