export { useTranslation } from 'next-i18next';

import { getLocaleFromName } from 'lib/app-config';

export const i18nextAdditionalConfig = {
  interpolation: {
    escapeValue: false, // react already safe from xss
    format(value, format, localeName, { currency }) {
      const locale = getLocaleFromName(localeName);

      if (format === 'currency') {
        if (typeof value === 'undefined' || !currency) {
          return 'N/A';
        }
        return new Intl.NumberFormat(locale.appLanguage, {
          style: 'currency',
          currency
        }).format(value);
      }

      return value;
    }
  }
};
