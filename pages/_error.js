import React from 'react';

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
      <p>
        {statusCode
          ? `Oh dear. An error (${statusCode}) occurred on server`
          : 'Huh? An error occurred on client'}
      </p>
    );
  }
}
