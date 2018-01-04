import React from 'react';

import Api from '../isomorphic/api';
import Header from '../components/header';

export default class Page2 extends React.Component {
  static async getInitialProps({ req }) {
    const data = await Api.getPage2Data(req);
    return data;
  }

  render() {
    const { text, shopName } = this.props;
    return (
      <main>
        <Header shopName={shopName} />
        <p>{text}</p>
      </main>
    );
  }
}
