import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../header';

const H1 = styled.h1`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const UserProps = styled.ul`
  display: block;
  max-width: 500px;
  margin: 0 auto;

  > li {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default class FrontPage extends React.PureComponent {
  static propTypes = {
    shopName: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      username: PropTypes.string
    })
  };

  render() {
    const { shopName, user } = this.props;

    return (
      <Fragment>
        <Header shopName={shopName} />
        <main>
          <H1>User page</H1>
          <UserProps>
            <li>
              <span>Name:</span> <span>{user.name}</span>
            </li>
            <li>
              <span>Phone:</span> <span>{user.phone}</span>
            </li>
            <li>
              <span>Email:</span> <span>{user.email}</span>
            </li>
            <li>
              <span>Username:</span> <span>{user.username}</span>
            </li>
          </UserProps>
        </main>
      </Fragment>
    );
  }
}
