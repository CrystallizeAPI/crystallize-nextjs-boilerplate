import React from 'react';
import ssrPrepass from 'react-ssr-prepass';

import initUrqlClient from './init-urql-client';

const withUrqlClient = App => {
  return class WithUrql extends React.Component {
    static async getInitialProps(ctx) {
      // Enable Now edge caching
      // if (ctx.ctx.res) {
      //   ctx.ctx.res.setHeader(
      //     'Cache-Control',
      //     's-maxage=1, stale-while-revalidate'
      //   );
      // }

      const { AppTree } = ctx;

      // Run the wrapped component's getInitialProps function
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // getInitialProps is universal, but we only want
      // to run server-side rendered suspense on the server
      const isBrowser = typeof window !== 'undefined';
      if (isBrowser) {
        return appProps;
      }

      const [urqlClient, ssrCache] = initUrqlClient(
        ctx.ctx.req.initialUrqlState,
        {
          url: global.__crystallizeConfig.GRAPH_URL
        }
      );

      // Run suspense and hence all urql queries
      await ssrPrepass(<AppTree {...appProps} urqlClient={urqlClient} />);

      // Extract the SSR query data from urql's SSR cache
      const urqlState = ssrCache.extractData();

      return {
        ...appProps,
        urqlState
      };
    }

    constructor(props) {
      super(props);

      if (props.urqlClient) {
        this.urqlClient = props.urqlClient;
      } else {
        // Create the urql client and rehydrate the prefetched data
        const [urqlClient] = initUrqlClient(props.urqlState, {
          url: global.__crystallizeConfig.GRAPH_URL
        });
        this.urqlClient = urqlClient;
      }
    }

    render() {
      return <App {...this.props} urqlClient={this.urqlClient} />;
    }
  };
};

export default withUrqlClient;
