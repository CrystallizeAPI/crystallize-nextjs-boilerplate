import { AuthProvider } from 'components/auth-context';
import { SettingsProvider } from 'components/settings-context';
import { BasketProvider } from 'components/basket';
import { simplyFetchFromGraph } from 'lib/graph';
import { getLanguage } from 'lib/language';

function MyApp({ Component, pageProps, commonData }) {
  const { tenant, mainNavigation } = commonData;

  return (
    <SettingsProvider
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
MyApp.getInitialProps = async function ({ ctx }) {
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
            }
          }
        }
      `,
      variables: {
        language: getLanguage(ctx)
      }
    });

    return {
      commonData: {
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
        mainNavigation: [],
        tenant: {
          defaults: {
            currency: 'usd'
          }
        }
      }
    };
  }
};

export default MyApp;
