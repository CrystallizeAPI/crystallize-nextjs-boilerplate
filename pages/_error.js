import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 15px;
  }

  a {
    color: #8fdecb;
  }
`;

const errorMessages = {
  404: 'Oh dear. This page does not exist.'
};

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    if (res) {
      return { statusCode: res.statusCode };
    }
    if (err) {
      return { statusCode: err.statusCode };
    }

    return {};
  }

  render() {
    const { statusCode } = this.props;

    let message = 'Huh? An error occurred on client';

    if (statusCode && errorMessages[statusCode]) {
      message = errorMessages[statusCode];
    } else if (statusCode) {
      message = `Oh dear. An error (${statusCode}) occurred on server`;
    }

    return (
      <Outer>
        <p>{message}</p>
        <p>
          Click{' '}
          <Link href="/">
            <a>here</a>
          </Link>{' '}
          to go to the homepage.
        </p>
      </Outer>
    );
  }
}
