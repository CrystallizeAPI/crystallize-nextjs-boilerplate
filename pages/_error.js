import React from 'react';
import styled from 'styled-components';

export const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    return (
      <Outer>
        {statusCode
          ? `Oh dear. An error (${statusCode}) occurred on server`
          : 'Huh? An error occurred on client'}
      </Outer>
    );
  }
}
