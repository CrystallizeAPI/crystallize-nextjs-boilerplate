import { AuthProvider } from 'components/auth-context';
import { SettingsProvider } from 'components/settings-context';
import { BasketProvider } from 'components/basket';
import { simplyFetchFromGraph } from 'lib/graph';
import { getLanguage } from 'lib/language';

function MyApp({ Component, pageProps, commonData }) {
  const { language, tenant, mainNavigation } = commonData;

  return (
    <SettingsProvider
      language={language}
      currency={tenant.defaults.currency}
      mainNavigation={mainNavigation}
    >
      <AuthProvider>
        <BasketProvider>
          <Component {...pageProps} />
        </BasketProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

/**
 * Get shared data for all pages
 * - Tenant settings
 * - Main navigation
 */
MyApp.getInitialProps = async function ({ router: { asPath } }) {
  const language = getLanguage({ asPath });

  try {
    const {
      data: {
        tenant,
        mainNavigation: { children: mainNavigation }
      }
    } = await simplyFetchFromGraph({
      query: `
        query COMMON_DATA($language: String!) {
          mainNavigation: catalogue(language: $language, path: "/") {
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
        mainNavigation: mainNavigation.filter((i) => !i.name.startsWith('_'))
      }
    };
  } catch (error) {
    console.error(error);
    console.warn('Could not fetch common page data');

    // Fallback values
    return {
      commonData: {
        language,
        mainNavigation: [],
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
