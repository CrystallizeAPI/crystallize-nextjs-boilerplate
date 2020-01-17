import React from 'react';
import Head from 'next/head';
import CrystallizeLayout from '@crystallize/react-layout';
import { IntlProvider } from 'react-intl';
import { useQuery } from 'urql';

import AuthGate from 'components/auth-context';
import Aside from 'components/aside';
import Spinner from 'components/spinner';
import GlobalStyle from 'ui/global';
import { SettingsProvider } from 'components/settings-context';

import Header from '../header';
import {
  Main,
  LoadingWrapper,
  SpinnerWrapper,
  LoadingTextWrapper
} from './styles';

const Loader = ({ children }) => (
  <LoadingWrapper>
    <div>
      <SpinnerWrapper>
        <Spinner size="40" />
      </SpinnerWrapper>
      <LoadingTextWrapper>{children || 'Please wait...'}</LoadingTextWrapper>
    </div>
  </LoadingWrapper>
);

const Layout = ({ children, title, description, simple, loading, error }) => {
  /**
   * Set the default language.
   * You can also determine this any way you want.
   * For instance:
   *  - .com is "en"
   *  - .co.uk is "en"
   *  - .no is "no"
   */
  const language = 'en';

  const [queryResult] = useQuery({
    query: `
      query MENU_AND_TENANT($language: String!) {
        menu: tree(language: $language, path: "/") {
          type
          name
          path
        }
    
        tenant(language: $language) {
          name
          defaults {
            currency
            language
          }
        }
      }
    `,
    variables: {
      language
    }
  });

  if (queryResult.fetching) {
    return (
      <>
        <GlobalStyle />
        <Loader />
      </>
    );
  }

  if (queryResult.error || error) {
    return 'Oh no...';
  }

  const {
    data: { menu, tenant }
  } = queryResult;

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        {description && (
          <meta key="description" name="description" content={description} />
        )}
      </Head>
      <GlobalStyle />
      <SettingsProvider language={language} currency={tenant.defaults.currency}>
        <IntlProvider locale={language}>
          <AuthGate>
            <CrystallizeLayout right={simple ? null : Aside}>
              <Header simple={simple} menuItems={menu} />
              <Main>{loading ? <Loader /> : children}</Main>
            </CrystallizeLayout>
          </AuthGate>
        </IntlProvider>
      </SettingsProvider>
    </>
  );
};

export default Layout;
