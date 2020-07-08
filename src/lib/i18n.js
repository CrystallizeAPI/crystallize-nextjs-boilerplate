import { createContext, useContext } from 'react';
import i18n from 'i18next';

const I18NextContext = createContext();

export const useT = () => {
  const c = useContext(I18NextContext);

  return (val, options) => c.t(val, options);
};

export function I18nextProvider({ locale, localeResource, children }) {
  const lng = locale.appLanguage;

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale.defaultCurrency
  });

  i18n.init({
    resources: {
      [lng]: localeResource
    },
    lng,

    interpolation: {
      escapeValue: false, // react already safe from xss
      format: function (value, format) {
        if (format === 'uppercase') {
          return value.toUpperCase();
        }

        if (format === 'currency') {
          return currencyFormatter.format(value);
        }

        return value;
      }
    }
  });

  return (
    <I18NextContext.Provider value={i18n}>{children}</I18NextContext.Provider>
  );
}
