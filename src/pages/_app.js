import { IntlProvider } from 'react-intl';

import { AuthProvider } from 'components/auth-context';
import { SettingsProvider } from 'components/settings-context';
import { BasketProvider } from 'components/basket';
import { simplyFetchFromGraph } from 'lib/graph';
import { getLanguage } from 'lib/language';

function MyApp({ Component, pageProps, commonData }) {
  const { language, tenant, topNavigation } = commonData;

  return (
    <SettingsProvider
      language={language}
      currency={tenant.defaults.currency}
      topNavigation={topNavigation}
    >
      <IntlProvider locale={language}>
        <AuthProvider>
          <BasketProvider
            shippingCost={199}
            freeShippingMinimumPurchaseAmount={800}
          >
            <Component {...pageProps} />
          </BasketProvider>
        </AuthProvider>
      </IntlProvider>
    </SettingsProvider>
  );
}

/**
 * Get shared data for all pages
 * - Tenant settings
 * - Main naviation
 */
MyApp.getInitialProps = async function({ router: { asPath } }) {
  const language = getLanguage({ asPath });

  try {
    const {
      data: {
        tenant,
        topNavigation: { children: topNavigation }
      }
    } = await simplyFetchFromGraph({
      query: `
        query COMMON_DATA($language: String!) {
          topNavigation: catalogue(language: $language, path: "/") {
            children {
              type
              name
              path
            }
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

    return {
      commonData: {
        language,
        tenant,
        topNavigation
      }
    };
  } catch (error) {
    console.error(error);
    console.warn('Could not fetch common page data');

    // Fallback values
    return {
      commonData: {
        language,
        topNavigation: [],
        tenant: {
          defaults: {
            language: 'en',
            currency: 'usd'
          }
        }
      }
    };
  }
};

export default MyApp;
