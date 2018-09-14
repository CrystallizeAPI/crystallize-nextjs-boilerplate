import React from 'react';
import styled from 'styled-components';

import Layout from 'components/layout';
import { H1 } from 'ui';
import { getUserPageData } from 'lib/rest-api';

const UserProps = styled.ul`
  display: block;
  max-width: 500px;
  margin: 0 auto;

  > li {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default class UserPage extends React.PureComponent {
  static async getInitialProps() {
    const data = await getUserPageData();
    return data;
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Layout {...this.props} title="User page">
        <H1>User page</H1>
        <UserProps>
          <li>
            <span>Name:</span>
            <span>{user.name}</span>
          </li>
          <li>
            <span>Phone:</span>
            <span>{user.phone}</span>
          </li>
          <li>
            <span>Email:</span>
            <span>{user.email}</span>
          </li>
          <li>
            <span>Username:</span>
            <span>{user.username}</span>
          </li>
        </UserProps>
      </Layout>
    );
  }
}
