import MetaTags from 'components/head/meta-tags';
import { AuthProvider } from 'components/auth-context';
import { SettingsProvider } from 'components/settings-context';
import { BasketProvider } from 'components/basket';
import { simplyFetchFromGraph } from 'lib/graph';
import { getLocaleFromContext, defaultLocale } from 'lib/app-config';
import { I18nextProvider } from 'lib/i18n';

function MyApp({ Component, pageProps, commonData }) {
  const { tenant, mainNavigation, locale, localeResource } = commonData;
  return (
    <>
      <MetaTags />
      <I18nextProvider locale={locale} localeResource={localeResource}>
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
      </I18nextProvider>
    </>
  );
}

MyApp.getInitialProps = async function ({ ctx }) {
  try {
    const locale = getLocaleFromContext(ctx);

    const localeResource = await import(`../locales/${locale.appLanguage}`);

    /**
     * Get shared data for all pages
     * - Tenant settings
     * - Main navigation
     */
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
        language: locale.crystallizeCatalogueLanguage
      }
    });

    return {
      commonData: {
        localeResource: localeResource.default,
        locale,
        tenant,
        mainNavigation: mainNavigation?.filter((i) => !i.name.startsWith('_'))
      }
    };
  } catch (error) {
    console.error(error);
    console.warn('Could not fetch common page data');

    // Fallback values
    return {
      commonData: {
        mainNavigation: [],
        locale: defaultLocale,
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
