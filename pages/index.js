import React from 'react';

import Api from '../api';
import Header from '../components/header';

export default class FrontPage extends React.Component {
  static async getInitialProps({ req }) {
    const data = await Api.getFrontpageData();
    return data;
  }

  render() {
    const { bannerImage, shopName } = this.props;
    return (
      <main>
        <Header shopName={shopName} />
        <h1>Welcome to your Crystallize shop!</h1>
        <figure>
          <img
            src={bannerImage.src}
            alt={bannerImage.alt}
            title={bannerImage.title}
          />
        </figure>
      </main>
    );
  }
}
