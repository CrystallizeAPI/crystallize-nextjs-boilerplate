import React, { useState, useEffect } from 'react';

import { useLocale } from 'lib/app-config';
import { useT } from 'lib/i18n';

export default function MollieWrapper({ paymentModel, onSuccess }) {
  const t = useT();
  const [state, setState] = useState('loading');
  const locale = useLocale();

  useEffect(() => {
    async function load() {
      setState('loading');

      const response = await fetch(
        '/api/payment-providers/mollie/create-payment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentModel })
        }
      ).then((res) => res.json());

      return onSuccess(response.href);
    }

    load();
  }, [locale, paymentModel, state]);

  if (state === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Mollie' })}</p>
    );
  }

  return <p>{t('checkout.loadingPaymentGateway')}</p>;
}
