import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';

import initApollo from './init-apollo';
import initRedux from './init-redux';
import { getTranslation } from './i18n/helpers';
import startI18n from './i18n/start';

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function determineStaticUrl({ req }) {
  if (req) {
    return `${req.protocol}://${req.get('host')}/static/locales/`;
  }
  const l = window.location;
  return `${l.protocol}//${l.host}/static/locales/`;
}

export default ComposedComponent => {
  const lang = 'en';

  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`;

    static propTypes = {
      stateApollo: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      // Initial stateApollo with apollo (empty)
      let stateApollo = {
        apollo: {
          data: {}
        }
      };
      // Initial stateRedux with apollo (empty)
      let stateRedux = {};

      // Get translations
      const translations = await getTranslation({
        lang,
        files: ['common', 'basket', ...(ComposedComponent.l18namespaces || [])],
        baseUrl: determineStaticUrl(ctx)
      });

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      const router = {
        asPath: ctx.asPath,
        pathname: ctx.pathname,
        query: ctx.query
      };

      // Pass the router down to the composed props
      if (!composedInitialProps.router) {
        composedInitialProps.router = router;
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux();

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <Provider store={redux}>
                <ComposedComponent {...composedInitialProps} />
              </Provider>
            </ApolloProvider>,
            {
              router
            }
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the Redux store
        stateRedux = redux.getState();

        // Extract query data from the Apollo store
        stateApollo = {
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }

      return {
        stateApollo,
        stateRedux,
        translations,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);

      this.apollo = initApollo(props.stateApollo.apollo.data);
      this.redux = initRedux(props.stateRedux);
      this.i18n = startI18n(props.translations, lang);
    }

    render() {
      const { translations } = this.props;

      return (
        <I18nextProvider
          i18n={this.i18n}
          initialLanguage={lang}
          initialI18nStore={translations}
        >
          <ApolloProvider client={this.apollo}>
            <Provider store={this.redux}>
              <ComposedComponent {...this.props} />
            </Provider>
          </ApolloProvider>
        </I18nextProvider>
      );
    }
  };
};
