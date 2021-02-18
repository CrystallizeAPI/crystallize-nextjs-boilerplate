import { useState, useEffect, createContext, useContext } from 'react';
import i18n from 'i18next';

const I18NextContext = createContext();

export const useT = () => {
  const c = useContext(I18NextContext);

  return (val, options) => c.t(val, options);
};

export function I18nextProvider({ locale, localeResource, children }) {
  const lng = locale.appLanguage;
  const [instance, setInstance] = useState();

  useEffect(() => {
    i18n
      .init({
        resources: {
          [lng]: localeResource
        },
        lng,

        interpolation: {
          escapeValue: false, // react already safe from xss
          format: function (value, format, _, { currency }) {
            if (format === 'uppercase') {
              return value.toUpperCase();
            }

            if (format === 'currency') {
              if (typeof value === 'undefined' || !currency) {
                return 'N/A';
              }
              return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency
              }).format(value);
            }

            return value;
          }
        }
      })
      .then(() => setInstance(i18n));
  }, []);

  if (!instance) {
    return null;
  }

  return (
    <I18NextContext.Provider value={instance}>
      {children}
    </I18NextContext.Provider>
  );
}
