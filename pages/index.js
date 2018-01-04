import React from 'react';
import PropTypes from 'prop-types';

import Api from '../isomorphic/api';
import Header from '../components/header';

export default class FrontPage extends React.Component {
  static async getInitialProps() {
    const data = await Api.getFrontpageData();
    return data;
  }

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
          <figure>
            <img
              src={bannerImage.src}
              alt={bannerImage.alt}
              title={bannerImage.title}
            />
          </figure>
        )}
      </main>
    );
  }
}
