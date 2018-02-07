import React from 'react';

import withData from 'lib/with-data';
import { getUserPageData } from 'lib/rest-api';
import UserPage from 'page-components/user-page';

class Page extends React.Component {
  static async getInitialProps({ req }) {
    const data = await getUserPageData(req);
    return data;
  }

  render() {
    return <UserPage {...this.props} />;
  }
}

export default withData(Page);
