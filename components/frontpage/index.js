import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../header';
import PostList from '../postlist';

import GraphData from './graph-data';
import { H1, Outer } from './styles';

class FrontPage extends PureComponent {
  static propTypes = {
    loadMorePosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.loadMorePosts = props.loadMorePosts.bind(this);
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <Header shopName="No shop name" />
        <main>
          <Outer>
            <H1>Welcome to your Crystallize shop!</H1>
            <PostList {...data} loadMorePosts={this.loadMorePosts} />
          </Outer>
        </main>
      </Fragment>
    );
  }
}

export default GraphData(FrontPage);
