import React from 'react';

import withData from 'lib/with-data';
import Api from 'lib/rest-api';
import UserPage from 'components/user-page';

class Page extends React.Component {
  static async getInitialProps({ req }) {
    const data = await Api.getUserPageData(req);
    return data;
  }

  render() {
    return <UserPage {...this.props} />;
  }
}

export default withData(Page);
